const EARNING                = require('../globals/Earning');
const MDB_USER               = require('../models/MDB_USER');

module.exports =
{
    async testBinary (data, context)
    {
        let user_info = await MDB_USER.get(data.uid);
        await EARNING.binary(user_info, 0.001);
        return { status: "success", message: `Done!` };
    },
};

