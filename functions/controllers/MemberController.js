const moment                 = require('moment-timezone');
const momentTZ               = moment.tz('Asia/Manila');
const AUTH                   = require('../globals/Auth');
const WALLET                 = require('../globals/Wallet');
const EARNING                = require('../globals/Earning');
const FORMAT                 = require('../globals/FormatHelper');

const MDB_USER_WALLET        = require('../models/MDB_USER_WALLET');
const MDB_USER               = require('../models/MDB_USER');
const MDB_NOBILITY           = require('../models/MDB_NOBILITY');
const MDB_CURRENCY           = require('../models/MDB_CURRENCY');
const MDB_PROMOTION          = require('../models/MDB_PROMOTION');
const MDB_TRANSFER_WALLET    = require('../models/MDB_TRANSFER_WALLET');
const MDB_KYC_VERIFICATION   = require('../models/MDB_KYC_VERIFICATION');
const MDB_USER_NOTIFICATION  = require('../models/MDB_USER_NOTIFICATION');
const MDB_ENLIST_KNIGHT      = require('../models/MDB_ENLIST_KNIGHT');
const MDB_TRANSFER_CRYPTO    = require('../models/MDB_TRANSFER_CRYPTO');

const {HTTPS_ERROR} = require('../plugin/firebase');
const {knightRegistrationTemplate} = require('../references/ref_enlist_knight_email_template');
const {generateAccessCode}           = require('../globals/HashHelper');
const {sendMail}                   = require('../globals/EmailHelper');

const sendRegistrationLink = async (email, name, link) =>
{
    const mail_options = {
            to      : email,
            from    : 'no-reply@kryptoone.com',
            subject : 'Invitation',
            text    : knightRegistrationTemplate(name, link),
            html    : knightRegistrationTemplate(name, link)
        };

    return sendMail(mail_options);
};


module.exports =
{
    async submitKyc(data, context)
    {
        // Variable declations
        const PENDING = 'pending';
        const USER_ID = context.auth.uid;

        // Fetch data
        const kyc_info = JSON.parse(data.kyc_form_data);

        // Set dates
        kyc_info.id_expiration_date  = new Date(kyc_info.id_expiration_date);
        kyc_info.birthdate           = new Date(kyc_info.birthdate);
        kyc_info.date_time_submitted = new Date(kyc_info.date_time_submitted);

        // Other Info
        kyc_info.status              = PENDING;

        await MDB_KYC_VERIFICATION.doc(USER_ID).set(kyc_info)
        .catch(error =>
        {
            HTTPS_ERROR('failed-precondition', error.errorInfo.message);
        });

        console.log('okay naman ba ?' + USER_ID + {kyc_status: PENDING} )
        return MDB_USER.update(USER_ID, {kyc_status: PENDING})
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
        data.amount                     = parseFloat(data.amount);
        let promise_list                = [];
        let logged_in_user              = await AUTH.member_only(context);

        if(logged_in_user.roles.includes('admin'))
        {
            if(data.uid)
            {
                context.auth.uid = data.uid;
            }

            logged_in_user = await AUTH.member_only(context);
        }

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
        });

        let xau_equivalent              = payment_conversions['XAU'] * data.amount;
        let required_price              = conversion_rates[data.payment_method.toUpperCase()] * target_nobility.price;

        if(logged_in_user_wallet.wallet < data.amount)
        {
            HTTPS_ERROR('failed-precondition', `You don't have enough ${data.payment_method.toUpperCase()} balance to proceed on this transaction.`);
        }
        else if(data.amount < required_price.toFixed(8))
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

                promise_list.push(MDB_USER.update(logged_in_user.id, update_user));
            }

            /* give user corresponding UNIQ equivalent of purchase */
            description                         = `You earned <b>${FORMAT.numberFormat(xau_equivalent, { decimal: 8, currency: 'UNIQ' })}</b> by purchasing using <b>${FORMAT.numberFormat(data.amount, { decimal: 8, currency: data.payment_method.toUpperCase() })}</b>.`;
            type                                = "purchased";
            
            promise_list.push(WALLET.add(logged_in_user.id, 'xau', xau_equivalent, type, description, logged_in_user.id));

            /* UNILEVEL EARNING UPON UNIQ PURCHASE */
            await EARNING.unilevel(logged_in_user, data.amount);
            await Promise.all(promise_list);     
            await EARNING.updateRank(logged_in_user.upline_id);
        }


        return { status: "success", message: `I can do this!`};
    },
    async readNewNotifications(data, context)
    {
        const uid       = context.auth.uid;
        const notif_ids = JSON.parse(data.notif_ids);

        // start updating notifications here
        notif_ids.forEach(notif_id => {
            MDB_USER_NOTIFICATION.update(uid, notif_id, {new: false})
        });

        return Promise.resolve(1)
    },
    async enlistKnight(data, context)
    {
        const knight_data = JSON.parse(data);

        // Prepare other data to be stored
        knight_data.created_at  = new Date(knight_data.created_at);
        knight_data.enlisted_by = context.auth.uid;
        knight_data.status      = 'pending';

        // Check value
        const logged_in_user       = await AUTH.member_only(context);
        let logged_in_user_wallet  = await MDB_USER_WALLET.get(logged_in_user.id, knight_data.payment_method.toUpperCase());
        let target_nobility        = await MDB_NOBILITY.get(knight_data.nobility);
        let conversion_rates       = await MDB_CURRENCY.get('XAU');
        let required_price         = await conversion_rates[knight_data.payment_method.toUpperCase()] * target_nobility.price;

        if(logged_in_user_wallet.wallet < knight_data.amount)
        {
            HTTPS_ERROR('failed-precondition', `You don't have enough ${knight_data.payment_method.toUpperCase()} balance to proceed on this transaction.`);
        }
        else if(data.amount < required_price.toFixed(8))
        {
            HTTPS_ERROR('failed-precondition', `The amount of ${knight_data.payment_method.toUpperCase()} you are trying to use is not enough to enlist a ${target_nobility.title}.`);
        }

        // generate enlistment id based on email
        knight_data.eid = generateAccessCode(knight_data.email);

        const add_new_knight = await MDB_ENLIST_KNIGHT.add(knight_data)
            .then(data => ({error: null, data}))
            .catch(error => ({error}));

        if(add_new_knight.error)
        {
            HTTPS_ERROR('failed-precondition', add_new_knight.error.errorInfo.message);
            return 0;
        }

        // deduct wallet to account of user who is enlisting
        const description = `You have spent <b>${FORMAT.numberFormat(knight_data.amount, { decimal: 8, currency: knight_data.payment_method.toUpperCase() })}</b> in order to enlist <b>${knight_data.full_name}</b>.`;
        const type        = "purchased";
        WALLET.deduct(context.auth.uid, knight_data.payment_method.toLowerCase(), knight_data.amount, type, description, context.auth.uid);

        // structure link
        const registration_link = `${process.env.APP_DOMAIN}register?id=${add_new_knight.data}&&eid=${knight_data.eid}`;

        return sendRegistrationLink(knight_data.email, knight_data.full_name, registration_link);
    },
    async placeDownline(data, context)
    {
        let downline_to_place = await MDB_USER.get(data.user_id);
        let check_position    = await MDB_USER.getBinaryDownline(data.upline_id, data.position);

        //todo: do now allow to place account that are already placed

        let upline_info       = await MDB_USER.get(data.upline_id);

        if(downline_to_place.upline_id !== context.auth.uid)
        {
            HTTPS_ERROR('failed-precondition', `You can only place downline if you are the sponsor of that account.`);
        }
        else if(downline_to_place.hasOwnProperty('placement'))
        {
            HTTPS_ERROR('failed-precondition', `${downline_to_place.full_name} was already placed.`);
        }
        else if(check_position)
        {
            HTTPS_ERROR('failed-precondition', `Someone's already on the ${data.position} of ${upline_info.full_name}`);
        }
        else
        {
            let update_user                      = {};
            update_user.placement_id             = upline_info.id;
            update_user.placement_position       = data.position;
            update_user.placement                = {};
            update_user.placement.position       = data.position;
            update_user.placement.upline_id      = upline_info.id;
            update_user.placement.upline_name    = upline_info.full_name;
            update_user.placement.date_placed    = new Date();

            await MDB_USER.update(downline_to_place.id, update_user);
        }

        return {status: 'success', message: `${downline_to_place.full_name} has been successfully placed to ${data.position} of ${upline_info.full_name}`};
    },
    async transferCrypto(data, context)
    {
        function scientificToDecimal(num) {
            const sign = Math.sign(num);
            //if the number is in scientific notation remove it
            if(/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
                const zero = '0';
                const parts = String(num).toLowerCase().split('e'); //split into coeff and exponent
                const e = parts.pop(); //store the exponential part
                let l = Math.abs(e); //get the number of zeros
                const direction = e/l; // use to determine the zeroes on the left or right
                const coeff_array = parts[0].split('.');
                
                if (direction === -1) {
                    coeff_array[0] = Math.abs(coeff_array[0]);
                    num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
                }
                else {
                    const dec = coeff_array[1];
                    if (dec) l = l - dec.length;
                    num = coeff_array.join('') + new Array(l+1).join(zero);
                }
            }
            
            if (sign < 0) {
                num = -num;
            }
    
            return num;
        }
        
        data.amount                     = parseFloat(data.amount);

        if (data.amount < 0.0001)
        {
            HTTPS_ERROR('failed-precondition', `Minimum amount is 0.0001.`);
        }

        data.currency                   = data.currency.toLowerCase();
        let description, type           = "";
        let promise_list                = [];
        let logged_in_user              = await AUTH.member_only(context);
        let logged_in_user_wallet       = await MDB_USER_WALLET.get(logged_in_user.id, data.currency.toUpperCase());
        let transfer_wallet             = {};

        if(logged_in_user_wallet.wallet < data.amount)
        {
            HTTPS_ERROR('failed-precondition', `You don't have enough balance to proceed on this transaction.`);
        }
        else if(logged_in_user_wallet.address == data.address)
        {
            HTTPS_ERROR('failed-precondition', `Sending money to self is not allowed.`);
        }
        else
        {
            /* list of request to admin */
            transfer_wallet                 = {};
            transfer_wallet.amount          = Number(data.amount);
            transfer_wallet.issue_by_id     = logged_in_user.id;
            transfer_wallet.issue_by        = logged_in_user.full_name;
            transfer_wallet.currency        = data.currency;
            transfer_wallet.remarks         = data.remarks;
            transfer_wallet.address         = data.address;
            transfer_wallet.status          = "pending";
            transfer_wallet.date_created    = new Date();

            promise_list.push(MDB_TRANSFER_CRYPTO.add(transfer_wallet));

            /* deduct wallet to sender */
            description                     = `You have requested to transfer <b>${scientificToDecimal(transfer_wallet.amount)} ${data.currency}</b> to <b>${data.address}</b>.`;
            type                            = "sent";

            promise_list.push(WALLET.deduct(logged_in_user.id, transfer_wallet.currency, transfer_wallet.amount, type, description));

            await Promise.all(promise_list);
        }

        return { status: "success", message: `Your request to transfer ${scientificToDecimal(transfer_wallet.amount)} ${transfer_wallet.currency.toUpperCase()} to ${data.address} has been submitted.` };
    }
};
