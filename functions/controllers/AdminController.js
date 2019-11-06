const moment   = require('moment-timezone');
const momentTZ = moment.tz('Asia/Manila');

const MDB_PROMOTION = require('../models/MDB_PROMOTION');
const {HTTPS_ERROR} = require('../plugin/firebase');

module.exports =
{
    async promoteUser(data, context)
    {
        const promotion_info = Object.assign(data.promotion_info,
 {
            promoted_by_user_id: context.auth.uid,
            created_at         : momentTZ.toDate()
        });

        const add_promotion = await MDB_PROMOTION.add(promotion_info);


        if(!add_promotion)
        {
            HTTPS_ERROR('failed-precondition', error.errorInfo.message)
        }

        return {message: 'Success'}
    }
};
