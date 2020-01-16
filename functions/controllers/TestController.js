const EARNING                = require('../globals/Earning');
const MDB_USER               = require('../models/MDB_USER');

module.exports =
{
    async testBinary (data, context)
    {
        let user_info = await MDB_USER.get(data.uid);
        let binary_points = 0.003;
        console.log("binary points", binary_points)
        await EARNING.binary(user_info, binary_points);
        return { status: "success", message: `Done!` };
    },
};

