const MDB_USER          = require('../models/MDB_USER');
const MDB_USER_WALLET   = require('../models/MDB_USER_WALLET');
const MDB_USER_EARNING  = require('../models/MDB_USER_EARNING');
const MDB_ENLIST_KNIGHT = require('../models/MDB_ENLIST_KNIGHT');
const MDB_CURRENCY      = require('../models/MDB_CURRENCY');
const MDB_NOBILITY      = require('../models/MDB_NOBILITY');
const MDB_PROMOTION     = require('../models/MDB_PROMOTION');
const EARNING           = require('../globals/Earning');
const Bitcoin           = require('../globals/Bitaps/Bitcoin');
const Ethereum          = require('../globals/Bitaps/Ethereum');
const FieldValue        = require('firebase-admin').firestore.FieldValue;

module.exports =
{
    async update(change, context)
    {
        const newValue  = change.after.data();
        //const previousValue = change.before.data();
        const uid       = context.params.uid;
        newValue.id     = uid;

        //unilevel computation triggers
        if(newValue.hasOwnProperty('compute_unilevel'))
        {
            if(newValue.compute_unilevel !== 0)
            {
                console.log("unilevel compute triggered", uid, newValue);
                await MDB_USER.update(uid, { compute_unilevel: 0 });
                await EARNING.unilevel(newValue, newValue.compute_unilevel);
                await EARNING.updateRank(newValue.upline_id);
            }
        }

        //binary computation triggers
        if(newValue.hasOwnProperty('compute_binary'))
        {
            if(newValue.compute_binary !== 0)
            {
                console.log("binary compute triggered", uid, newValue);
                await MDB_USER.update(uid, { compute_binary: 0 });
                await EARNING.binary(newValue, newValue.compute_binary);
            }
        }
    },
    async create(snap, context)
    {
        await module.exports.createInitializeWallet(snap.id);
        await module.exports.createInitializeParameters(snap.id);
    },
    async createInitializeParameters(id)
    {
        /* get user info */
        let user_info = await MDB_USER.get(id);

        /* initial nobility */
        const nobility_list = await MDB_NOBILITY.getMany({ order_by: 'rank' });

        user_info.nobility_id       =   nobility_list[0].id;
        user_info.nobility_info     =   {
                                            id:             nobility_list[0].id,
                                            title:          nobility_list[0].title,
                                            rank_order:     nobility_list[0].rank_order,
                                            badge_color:    nobility_list[0].badge_color,
                                        };
        
        /* initialize earning */
        await MDB_USER_EARNING.initializeEarning(id);

        /* record user upline */
        let upline_info                     = await MDB_USER.getUserByReferralCode(user_info.referred_by);

        console.log("upline _info", upline_info);

        if(upline_info)
        {
            user_info.upline_id             = upline_info.id;
            user_info.upline_info           = { full_name: upline_info.full_name, id: upline_info.id, country: upline_info.country, }
        }
        else
        {
            user_info.upline_id             = "noupline";
            user_info.upline_info           = { full_name: "No Upline", id: "noupline", }
        }
        
        user_info.notification_count        = 0;

        await MDB_USER.update(id, user_info);

        /* CHECK IF ENLISTED */
        if(user_info.hasOwnProperty('knight_data'))
        {
            let enlist                          = await MDB_ENLIST_KNIGHT.get(user_info.knight_data.id);
            let target_nobility                 = await MDB_NOBILITY.get(enlist.nobility);

            /* ready record rank up promotions */
            let promotions                      = {};
            let current_nobility                = nobility_list[0];
            promotions.previous_nobility_id     = current_nobility.id;
            promotions.previous_nobility_title  = current_nobility.title;
            promotions.nobility_id              = target_nobility.id;
            promotions.nobility_title           = target_nobility.title;
            promotions.method                   = "Enlisted";
            promotions.enlisted_by              = enlist.enlisted_by;
            promotions.eid                      = enlist.eid;
            promotions.full_name                = user_info.full_name;
            promotions.user_id                  = id;
            promotions.payment_method           = enlist.payment_method.toUpperCase();
            promotions.amount                   = enlist.amount;
            promotions.required_price           = 0;
            promotions.created_date             = new Date();

            await MDB_PROMOTION.add(promotions);

            /* update rank of user */
            let enlist_update                   = {};
            enlist_update.nobility_id           = target_nobility.id;
            enlist_update.nobility_info         = {     badge_color: target_nobility.badge_color,
                                                        id: target_nobility.id,
                                                        rank_order: target_nobility.rank_order,
                                                        title: target_nobility.title };
            /* compute unilevel */
            let payment_conversions             = await MDB_CURRENCY.get(enlist.payment_method.toUpperCase());
            let xau_equivalent                  = payment_conversions['XAU'] * enlist.amount;
            enlist_update.compute_unilevel      = xau_equivalent;


            console.log("enlist_update", enlist_update);

            await MDB_USER.update(id, enlist_update);
        }
    },
    async createInitializeWallet(uid)
    {
        let currency_list = await MDB_CURRENCY.getMany();
        let promise_list  = [];

        if (uid)
        {
            const bitcoin = new Bitcoin(uid);
            const ethereum = new Ethereum(uid);

            for (let currency of currency_list)
            {
                const wallet = await MDB_USER_WALLET.get(uid, currency.id);
                
                if (wallet)
                {
                    continue;
                }
                
                let initial_data = { key: currency.id, address: '', wallet: 0, log_count: 0 };

                // generate btc wallet
                if (currency.id === "BTC")
                {
                    const bitcoin_wallet = await bitcoin.createWallet();

                    if (bitcoin_wallet)
                    {
                        initial_data.address = bitcoin_wallet.address;
                        initial_data.info = bitcoin_wallet;
                    }
                }
                // generate eth wallet
                else if (currency.id === "ETH")
                {
                    const ethereum_wallet = await ethereum.createWallet();

                    if (ethereum_wallet)
                    {
                        initial_data.address = ethereum_wallet.address;
                        initial_data.info = ethereum_wallet;
                    }
                }

                if (initial_data.address)
                {
                    let update_user_data = {};
                    update_user_data.filters = FieldValue.arrayUnion(initial_data.address);
                    promise_list.push(MDB_USER.update(uid, update_user_data));
                }

                promise_list.push(MDB_USER_WALLET.update(uid, currency.id, initial_data));
            }
        }

        await Promise.all(promise_list).then((res) =>
        {
            return "done!";
        });
    },


    async testCreate(data, context)
    {
        let snap        = {};
        let u_info      = await MDB_USER.get(data.uid);

        await module.exports.createInitializeParameters(data.uid, u_info);
        await module.exports.createInitializeWallet(data.uid).then((res) => 
        {
            return "done";
        });
        
    },

    async testIssueBitcoin()
    {
    },
};