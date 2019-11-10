const moment                = require('moment-timezone');
const momentTZ              = moment.tz('Asia/Manila');
const AUTH                  = require('../globals/Auth');
const WALLET                = require('../globals/Wallet');
const MDB_USER_WALLET       = require('../models/MDB_USER_WALLET');
const MDB_USER              = require('../models/MDB_USER');
const MDB_TRANSFER_WALLET   = require('../models/MDB_TRANSFER_WALLET');
const DB_KYC_VERIFICATION   = require('../models/MDB_KYC_VERIFICATION');
const { HTTPS_ERROR }       = require('../plugin/firebase');

module.exports =
{
    submitKyc(data, context)
    {
        // Fetch data
        const kyc_info = JSON.parse(data.kyc_form_data);

        // Set dates
        kyc_info.id_expiration_date = new Date(kyc_info.id_expiration_date);
        kyc_info.birthdate          = new Date(kyc_info.birthdate);

        // Other Info
        kyc_info.date_time_submitted = momentTZ.toDate();
        kyc_info.status              = 'pending'; //

        return DB_KYC_VERIFICATION.doc(context.auth.uid).set(kyc_info);
    },
    async transferWallet(data, context)
    {
        data.amount                     = parseFloat(data.amount);
        let description, type           = "";
        let promise_list                = [];
        let logged_in_user              = await AUTH.member_only(context);
        let recipient                   = MDB_USER.get(data.send_to || "none");
        let logged_in_user_wallet       = MDB_USER_WALLET.get(logged_in_user.id, data.currency.toUpperCase());
        let transfer_wallet             = {};

        await Promise.all([recipient, logged_in_user_wallet]).then(async (res) =>
        {
            recipient               = res[0];
            logged_in_user_wallet   = res[1];

            if(logged_in_user_wallet.wallet < data.amount)
            {
                HTTPS_ERROR('failed-precondition', `You don't have enough balance to proceed on this transaction.`);
            }
            else if(logged_in_user.id == recipient.id)
            {
                HTTPS_ERROR('failed-precondition', `Sending money to self is not allowed.`);
            }
            else
            {
                /* record transfer wallet transaction for admin recordings for list of issued wallet */
                transfer_wallet             = {};
                transfer_wallet.amount          = data.amount;
                transfer_wallet.issue_by_id     = logged_in_user.id;
                transfer_wallet.issue_by        = logged_in_user.full_name;
                transfer_wallet.issue_to_id     = recipient.id;      
                transfer_wallet.issue_to        = recipient.full_name;
                transfer_wallet.currency        = data.currency;
                transfer_wallet.status          = "pending";

                promise_list.push(MDB_TRANSFER_WALLET.add(transfer_wallet));

                /* deduct wallet to sender */
                description                     = `You have sent <b>${transfer_wallet.amount} ${data.currency}</b> to the account of <b>${logged_in_user.full_name}</b>.`;
                type                            = "sent";
                promise_list.push(WALLET.deduct(logged_in_user.id, transfer_wallet.currency, transfer_wallet.amount, type, description, recipient.id));

                /* add wallet to recipient */
                description                     = `<b>${transfer_wallet.amount} ${data.currency}</b> has been sent to your account by <b>${logged_in_user.full_name}</b>.`;
                type                            = "received";
                promise_list.push(WALLET.add(recipient.id, transfer_wallet.currency, transfer_wallet.amount, type, description, logged_in_user.id));

                await Promise.all(promise_list);
            }
        });

        return { status: "success", message: `${logged_in_user.full_name} transferred ${transfer_wallet.amount} ${transfer_wallet.currency.toUpperCase()} to the account of ${recipient.full_name}.` };
    }
};