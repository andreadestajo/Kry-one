
const moment                    = require('moment-timezone');
const momentTZ                  = moment.tz('Asia/Manila');
const MDB_PROMOTION             = require('../models/MDB_PROMOTION');
const MDB_USER                  = require('../models/MDB_USER');
const MDB_ISSUE_WALLET          = require('../models/MDB_ISSUE_WALLET');
const MDB_USER_NOTIFICATION     = require('../models/MDB_USER_NOTIFICATION');
const MDB_KYC_VERIFICATION      = require('../models/MDB_KYC_VERIFICATION');
const MDB_TRANSFER_CRYPTO       = require('../models/MDB_TRANSFER_CRYPTO');
const MDB_STATS                 = require('../models/MDB_STATS');
const { HTTPS_ERROR }           = require('../plugin/firebase');
const AUTH                      = require('../globals/Auth');
const WALLET                    = require('../globals/Wallet');
const Bitcoin                   = require('../globals/Bitaps/Bitcoin');
const Ethereum                  = require('../globals/Bitaps/Ethereum');
 
module.exports =
{
    async kyc(data, context)
    {   
        let logged_in_user = await AUTH.admin_only(context);
        let description    = "";


        data.modified_date = new Date();

        if(data.status === "approved")
        {
            description = "Your KYC has been approved.";
        }
        else
        {
            description = "Your KYC has been rejected.";
        }

        console.log(data);

        let user_data       = await MDB_USER.get(data.user_id);

        await MDB_USER_NOTIFICATION.addNew(data.user_id, description, logged_in_user.photo_url)
        await MDB_KYC_VERIFICATION.update(data.user_id, data);
        await MDB_USER.update(data.user_id, {
            kyc_status: data.status,
            previous_kyc_status: user_data.kyc_status && user_data.kyc_status != '' ? user_data.kyc_status : 'not submitted'
        });

        let mdb_stats   = new MDB_STATS('users');

        // update statistics
        if(user_data.kyc_status == '')
        {
            // if kyc status is empty string, decrement kyc_not_submitted
            await mdb.decrementField('kyc_not_submitted');
        }else{
            await mdb_stats.decrementField('kyc_' + user_data.kyc_status);
        }
        await mdb_stats.incrementField('kyc_' + data.status);
        console.log(data);
    },
    async promoteUser(data, context)
    {
        await AUTH.admin_only(context);

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
    },

    async rejectTransfer(data, context)
    {
        await AUTH.admin_only(context);
        
        const transfer_info = await MDB_TRANSFER_CRYPTO.get(data.id);
        const transfer_update = MDB_TRANSFER_CRYPTO.update(data.id, 
        {
            status: 'rejected'
        });

        const promise = await Promise.all([transfer_info, transfer_update]);

        await WALLET.add(promise[0].issue_by_id, promise[0].currency, (promise[0].amount + promise[0].charge), 'received', 'Wallet transfer rejected');

        return { status: 'success', message: 'Successfully rejected the transfer.' };
    },

    async processTransfer(data, context)
    {
        await AUTH.admin_only(context);

        const bitcoin = new Bitcoin();
        const bitcoin_result = bitcoin.sendAllPayment();

        const ethereum = new Ethereum();
        const ethereum_result = ethereum.sendAllPayment();
        
        const response = await Promise.all([bitcoin_result, ethereum_result]);

        if (response[0].status === 'success' && response[1].status === 'success')
        {
            return { status: 'success', message: 'Successfully transfered all requests.' };
        }
        else
        {
            if (response[0].status === 'error')
            {
                return { status: 'error', message: response[0].message };
            }
            else if (response[1].status === 'error')
            {
                return { status: 'error', message: response[1].message };
            }
            else
            {
                return { status: 'error', message: 'Some error occured. Please try again later.' }; 
            }
        }
    },

    async checkCentralWallet(data, context)
    {
        await AUTH.admin_only(context);

        if (data.currency === 'btc')
        {
            const bitcoin = new Bitcoin();
            return bitcoin.checkWallet();
        }
        else if (data.currency === 'eth')
        {
            const ethereum = new Ethereum();
            return ethereum.checkWallet();
        }
        else
        {
            return null;
        }
    },

    async updateUserDetails(data, context)
    {
        let logged_in_user = await AUTH.admin_only(context);

        // start updating profile
        const user_details = JSON.parse(data);
        user_details.modified_by = logged_in_user.id;

        const update_data = await MDB_USER.update(context.auth.uid, user_details)
            .then(data => ({error: null, data}))
            .catch(error => ({error}));

        if(update_data.error)
        {
            HTTPS_ERROR('failed-precondition', update_data.error.errorInfo.message);
            return 0;
        }

        return update_data;
    }
};
