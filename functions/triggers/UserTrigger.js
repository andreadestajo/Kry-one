const MDB_USER          = require('../models/MDB_USER');
const MDB_USER_WALLET   = require('../models/MDB_USER_WALLET');
const MDB_USER_EARNING  = require('../models/MDB_USER_EARNING');
const MDB_CURRENCY      = require('../models/MDB_CURRENCY');
const MDB_NOBILITY      = require('../models/MDB_NOBILITY');
const Bitcoin           = require('../globals/Bitcoin');

module.exports =
{
    async create(snap, context)
    {
        await module.exports.createInitializeParameters(snap.id, snap.data());
        await module.exports.createInitializeWallet(snap.id);
    },
    async createInitializeParameters(id, user_info)
    {
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
        await MDB_USER_EARNING.initializeEarning(user_info.id);

        /* record user upline */
        let upline_info                 = await MDB_USER.getUserByReferralCode(user_info.referred_by);

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
        
        user_info.notification_count    = 0;

        await MDB_USER.update(id, user_info);
    },
    async createInitializeWallet(uid)
    {
        let currency_list = await MDB_CURRENCY.getMany();
        let promise_list  = [];

        if (uid)
        {
            for (let currency of currency_list)
            {
                let initial_data = { key: currency.id, address: '', wallet: 0, log_count: 0 };

                // generate btc wallet
                if (currency.id === "BTC")
                {
                    const bitcoin = new Bitcoin(uid);
                    const bitcoin_wallet = await bitcoin.createWallet();
                    initial_data.address = bitcoin_wallet.address;
                    initial_data.info = bitcoin_wallet;
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