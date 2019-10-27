const MDB_USER          = require('../models/MDB_USER');
const MDB_USER_WALLET   = require('../models/MDB_USER_WALLET');
const MDB_CURRENCY      = require('../models/MDB_CURRENCY');
const MDB_NOBILITY      = require('../models/MDB_NOBILITY');

module.exports =
{
    async create(snap, context)
    {
        await module.exports.createInitializeParameters(snap.id, snap.data());
        await module.exports.createInitializeWallet(snap.id);
    },
    async testCreate(data, context)
    {
        let snap        = {};
        let u_info   = await MDB_USER.get(data.uid);

        await module.exports.createInitializeParameters(data.uid, u_info);
        await module.exports.createInitializeWallet(data.uid).then((res) => 
        {
            return "done";
        });
        
    },
    async createInitializeParameters(id, user_info)
    {
        const nobility_list = await MDB_NOBILITY.getMany({ order_by: 'rank' });

        user_info.nobility_id       =   nobility_list[0].id;
        user_info.nobility_info     =   {
                                            id:             nobility_list[0].id,
                                            title:          nobility_list[0].title,
                                            rank_order:     nobility_list[0].rank_order,
                                            badge_color:    nobility_list[0].badge_color,
                                        };


        MDB_USER.update(id, user_info);
    },
    async createInitializeWallet(uid)
    {
        let currency_list = await MDB_CURRENCY.getMany();
        let promise_list  = [];

        if(uid)
        {
            currency_list.forEach((currency, i) =>
            {
                let initial_data = { key: currency.id, address: '', wallet: 0, log_count: 0 };
                promise_list.push(MDB_USER_WALLET.update(uid, currency.id, initial_data));
            });
        }

        await Promise.all(promise_list).then((res) =>
        {
            return "done!";
        });
    }
};