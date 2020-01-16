const MDB_USER          = require('../models/MDB_USER');
const MDB_USER_WALLET   = require('../models/MDB_USER_WALLET');
const MDB_USER_COMPUTE  = require('../models/MDB_USER_COMPUTE');
const MDB_USER_COUNT    = require('../models/MDB_USER_COUNT');
const MDB_USER_EARNING  = require('../models/MDB_USER_EARNING');
const MDB_ENLIST_KNIGHT = require('../models/MDB_ENLIST_KNIGHT');
const MDB_CURRENCY      = require('../models/MDB_CURRENCY');
const MDB_NOBILITY      = require('../models/MDB_NOBILITY');
const MDB_PROMOTION     = require('../models/MDB_PROMOTION');
const EARNING           = require('../globals/Earning');
const Bitcoin           = require('../globals/Bitaps/Bitcoin');
const Ethereum          = require('../globals/Bitaps/Ethereum');
const FieldValue        = require('firebase-admin').firestore.FieldValue;
const FORMAT            = require('../globals/FormatHelper');
const WALLET            = require('../globals/Wallet');

module.exports =
{
    //computation trigger
    async compute(change, context)
    {
        const compute_value  = change.after.data();
        //const previousValue = change.before.data();
        const uid       = context.params.uid;

        newValue    = await MDB_USER.get(uid);

        //unilevel computation triggers
        if(compute_value.hasOwnProperty('compute_unilevel'))
        {
            if(compute_value.compute_unilevel !== 0)
            {
                console.log("unilevel compute triggered", uid, newValue);
                await MDB_USER_COMPUTE.update(uid, "compute", { compute_unilevel: 0 });
                await EARNING.unilevel(newValue, compute_value.compute_unilevel);
                await EARNING.updateRank(newValue.upline_id);
            }
        }

        //binary computation triggers
        if(compute_value.hasOwnProperty('compute_binary'))
        {
            if(compute_value.compute_binary !== 0)
            {
                console.log("binary compute triggered", uid, newValue);
                await MDB_USER_COMPUTE.update(uid, "compute", { compute_binary: 0 });
                await EARNING.binary(newValue, compute_value.compute_binary);
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

        let upline_info = null;

        if(user_info.referred_by)
        {
            /* record user upline */
            upline_info = await MDB_USER.getUserByReferralCode(user_info.referred_by);
        }

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

        /* initialize count and points */
        await MDB_USER_COUNT.update(id, "compute", { group_count: 0, direct_count: 0, group_sale: 0, direct_sale: 0, binary_points_left: 0, binary_points_right: 0, binary_point_value: 0 });
        await MDB_USER_COMPUTE.update(id, "compute", { compute_binary: 0, compute_unilevel: 0 });

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

            /**/
            description                         = `You earned <b>${FORMAT.numberFormat(xau_equivalent, { decimal: 8, currency: 'UNIQ' })}</b> because you were enlisted.</b>.`;
            type                                = "enlisted";

            await WALLET.add(id, 'xau', xau_equivalent, type, description, id);
            await MDB_USER.update(id, enlist_update);
            await MDB_USER_COMPUTE.update(id, 'compute', {compute_unilevel: xau_equivalent});
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

    async update(change, context)
    {
        const newValue          = change.after.data();
        const previousValue     = change.before.data();
        let uid                 = context.params.uid;

        if(previousValue)
        {
            if(previousValue.nobility_info)
            {
                console.log(previousValue);
                console.log(previousValue.nobility_info);

                if(previousValue.nobility_info.rank_order === 1 && newValue.nobility_info.rank_order !== 1)
                {
                    console.log("LINE 224");
                    console.log(newValue.full_name + " is now a paid account");

                    //get info of user
                    let user_info           = newValue;
                    user_info.id            = uid;
                    let upline_info         = null;

                    //check if there is an upline
                    if(user_info)
                    {
                        if(user_info.upline_id)
                        {
                            upline_info     = await MDB_USER.get(user_info.upline_id);
                        }
                    }

                    if(user_info && upline_info)
                    {
                        await module.exports.updateGroup(upline_info, user_info, 1);
                    }
                }
            }
        }
    },

    async updateGroup(user_info, cause_info, level, options = {})
    {
        console.log(level, user_info.id);

        let update_count = {};

        update_count.group_count = FieldValue.increment(1);

        if(level === 1)
        {
            update_count.direct_count = FieldValue.increment(1);
        }

        MDB_USER_COUNT.update(user_info.id, "compute", update_count);

        let upline_info = null;

        if(user_info.upline_id)
        {
            upline_info = await MDB_USER.get(user_info.upline_id);
            await module.exports.updateGroup(upline_info, cause_info, level+1, options);
        }
    },


    async testCreate(data, context)
    {
        await module.exports.createInitializeParameters(data.uid);
        await module.exports.createInitializeWallet(data.uid).then((res) => 
        {
            return "done";
        });
    },

    async testIssueBitcoin()
    {
    },
};