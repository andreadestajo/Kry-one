const moment                = require('moment-timezone');
const momentTZ              = moment.tz('Asia/Manila');
const AUTH                  = require('../globals/Auth');
const WALLET                = require('../globals/Wallet');
const EARNING               = require('../globals/Earning');
const FORMAT                = require('../globals/FormatHelper');
const MDB_USER_WALLET       = require('../models/MDB_USER_WALLET');
const MDB_USER              = require('../models/MDB_USER');
const MDB_NOBILITY          = require('../models/MDB_NOBILITY');
const MDB_CURRENCY          = require('../models/MDB_CURRENCY');
const MDB_PROMOTION         = require('../models/MDB_PROMOTION');
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
        data.currency                   = data.currency.toLowerCase();
        data.currency                   = data.currency === 'uniq' ? 'xau' : data.currency;

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
                transfer_wallet                 = {};
                transfer_wallet.amount          = data.amount;
                transfer_wallet.issue_by_id     = logged_in_user.id;
                transfer_wallet.issue_by        = logged_in_user.full_name;
                transfer_wallet.issue_to_id     = recipient.id;      
                transfer_wallet.issue_to        = recipient.full_name;
                transfer_wallet.currency        = data.currency;
                transfer_wallet.status          = "pending";

                promise_list.push(MDB_TRANSFER_WALLET.add(transfer_wallet));

                /* deduct wallet to sender */
                description                     = `You have sent <b>${transfer_wallet.amount} ${data.currency}</b> to the account of <b>${recipient.full_name}</b>.`;
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
    },
    async upgradeAccount(data, context)
    {
        context.auth.uid                = 'RQZnnBRxX7fisDKn3c4HZPxaOUK2'; //temporary for testing
        data.amount                     = parseFloat(data.amount);
        let promise_list                = [];
        let logged_in_user              = await AUTH.member_only(context);
        let logged_in_user_wallet       = MDB_USER_WALLET.get(logged_in_user.id, data.payment_method.toUpperCase());
        let target_nobility             = MDB_NOBILITY.get(data.target_nobility);
        let current_nobility            = MDB_NOBILITY.get(logged_in_user.nobility_id);
        let conversion_rates            = MDB_CURRENCY.get('XAU');
        let payment_conversions         = MDB_CURRENCY.get(data.payment_method.toUpperCase());

        await Promise.all([logged_in_user_wallet, target_nobility, current_nobility, conversion_rates, payment_conversions]).then(async (res) =>
        {
            logged_in_user_wallet       = res[0];
            target_nobility             = res[1];
            current_nobility            = res[2];
            conversion_rates            = res[3];
            payment_conversions         = res[4];
        })

        let xau_equivalent              = payment_conversions['XAU'] * data.amount;
        let required_price              = conversion_rates[data.payment_method.toUpperCase()] * target_nobility.price;
        
        if(logged_in_user_wallet.wallet < data.amount)
        {
            HTTPS_ERROR('failed-precondition', `You don't have enough ${data.payment_method.toUpperCase()} balance to proceed on this transaction.`);
        }
        else if(data.amount < required_price)
        {
            HTTPS_ERROR('failed-precondition', `The amount of ${data.payment_method.toUpperCase()} you are trying to use is not enough to reach ${target_nobility.title}.`);
        }
        else
        {
            /* ready record rank up promotions */
            let promotions                      = {};
            promotions.previous_nobility_id     = current_nobility.id;
            promotions.previous_nobility_title  = current_nobility.title;
            promotions.nobility_id              = target_nobility.id;
            promotions.nobility_title           = target_nobility.title;
            promotions.method                   = "Accelerate";
            promotions.full_name                = logged_in_user.full_name;
            promotions.user_id                  = logged_in_user.id;
            promotions.payment_method           = data.payment_method.toUpperCase();
            promotions.amount                   = data.amount;
            promotions.required_price           = required_price;  
            promotions.created_date             = new Date();

            /* deduct wallet to account of user who is upgrading */
            description                         = `You have spent <b>${FORMAT.numberFormat(data.amount, { decimal: 8, currency: data.payment_method.toUpperCase() })}</b> in order to purchase <b>${FORMAT.numberFormat(xau_equivalent, { decimal: 8, currency: 'UNIQ' })}</b>.`;
            type                                = "purchased";
            promise_list.push(WALLET.deduct(logged_in_user.id, data.payment_method.toLowerCase(), data.amount, type, description, logged_in_user.id));
            
            if(current_nobility.rank_order < target_nobility.rank_order) //only update rank if rank will be higher
            {
                /* record promotions */
                promise_list.push(MDB_PROMOTION.add(promotions));

                /* update rank of user */
                let update_user                     =   {   nobility_id: target_nobility.id,
                                                            nobility_info:  {   badge_color: target_nobility.badge_color,
                                                                                id: target_nobility.id,
                                                                                rank_order: target_nobility.rank_order,
                                                                                title: target_nobility.title }
                                                        };

                MDB_USER.update(logged_in_user.id, update_user);
            }

            /* give user corresponding UNIQ equivalent of purchase */
            description                         = `You earned <b>${FORMAT.numberFormat(xau_equivalent, { decimal: 8, currency: 'UNIQ' })}</b> by purchasing using <b>${FORMAT.numberFormat(data.amount, { decimal: 8, currency: data.payment_method.toUpperCase() })}</b>.`;
            type                                = "purchased";
            
            promise_list.push(WALLET.add(logged_in_user.id, 'xau', xau_equivalent, type, description, logged_in_user.id));

            /* UNILEVEL EARNING UPON UNIQ PURCHASE */
            await EARNING.unilevel(logged_in_user, data.amount);

            await Promise.all(promise_list);     
        }


        return { status: "success", message: `I can do this!`};
    }
};