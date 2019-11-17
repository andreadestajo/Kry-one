const moment                    = require('moment-timezone');
const momentTZ                  = moment.tz('Asia/Manila');
const MDB_PROMOTION             = require('../models/MDB_PROMOTION');
const MDB_USER                  = require('../models/MDB_USER');
const MDB_ISSUE_WALLET          = require('../models/MDB_ISSUE_WALLET');
const MDB_USER_NOTIFICATION     = require('../models/MDB_USER_NOTIFICATION');
const { HTTPS_ERROR }           = require('../plugin/firebase');
const AUTH                      = require('../globals/Auth');
const WALLET                    = require('../globals/Wallet');

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

        return { message: 'Success' }
    },
    
    async issueWallet(data, context) 
    {
        let promise_list            = [];
        let logged_in_user          = await AUTH.admin_only(context);
        let recipient               = await MDB_USER.get(data.issue_to || "none");

        if(!recipient)
        {
            HTTPS_ERROR('failed-precondition', `The recipient ID you entered doesn't exist.`)
        }
        else
        {
            /* record issue wallet transaction for admin recordings for list of issued wallet */
            let issue_wallet            = {};
            issue_wallet.amount         = data.amount;
            issue_wallet.issue_by_id    = logged_in_user.id;
            issue_wallet.issue_by       = logged_in_user.full_name;
            issue_wallet.issue_to_id    = recipient.id;      
            issue_wallet.issue_to       = recipient.full_name;
            issue_wallet.currency       = data.currency;
            issue_wallet.status         = "pending";

            promise_list.push(MDB_ISSUE_WALLET.add(issue_wallet));

            /* record transaction log for user view history of his/her transactions */
            let description             = `<b>${issue_wallet.amount} ${data.currency}</b> has been issued to your account by <b>${logged_in_user.full_name}</b>.`;
            let type                    = "issued";
            promise_list.push(WALLET.add(recipient.id, issue_wallet.currency, issue_wallet.amount, type, description, logged_in_user.id));
            promise_list.push(MDB_USER_NOTIFICATION.addNew(recipient.id, description, logged_in_user.photo_url));

            await Promise.all(promise_list);

            return { status: 'success', message: `${issue_wallet.amount} ${data.currency} has been issued to the account of ${recipient.full_name} (${recipient.id}).` };
        }
    }
};
