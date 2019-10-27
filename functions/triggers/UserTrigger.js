const MDB_USER          = require('../models/MDB_USER');
const MDB_USER_WALLET   = require('../models/MDB_USER_WALLET');
const MDB_CURRENCY      = require('../models/MDB_CURRENCY');

module.exports =
{
    async create(snap, context)
    {
        const newValue = snap.data();
        await module.exports.createInitializeWallet(snap.id);
    },
    async testCreate(data, context)
    {
        console.log(data.uid)
        await module.exports.createInitializeWallet(data.uid).then((res) => 
        {
            console.log(res);
            return "done";
        });
        
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