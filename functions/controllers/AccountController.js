const moment   = require('moment-timezone');
const momentTZ = moment.tz('Asia/Manila');

const {ADMIN_AUTH, HTTPS_ERROR}   = require('../plugin/firebase');
const MDB_USER                    = require('../models/MDB_USER');
const MDB_STATS                   = require('../models/MDB_STATS');
const MDB_ENLIST_KNIGHT           = require('../models/MDB_ENLIST_KNIGHT');

const {sendMail}                  = require('../globals/EmailHelper');
const {generateHashedId}          = require('../globals/HashHelper');

const {
    emailVerificationTemplate,
    passwordResetTemplate
} = require('../references/ref_email_templates');

const sendEmailVerificationLink = async (email, fullname) =>
{
    const generate_link = await ADMIN_AUTH.generateEmailVerificationLink(email)
        .then((link) => {
            return {
                data : {link},
                error: false
            }
        })
        .catch((error) => {
            return {error}
        });

    if(generate_link.error)
    {
        return {error: generate_link.error}
    }

    const mail_options = {
        to      : email,
        from    : 'no-reply@kryptoone.com',
        subject : 'Email Verification',
        text    : emailVerificationTemplate(fullname, generate_link.data.link),
        html    : emailVerificationTemplate(fullname, generate_link.data.link)
    };

    return sendMail(mail_options);
};

const generateReferralCode = (email) =>
{
    return generateHashedId(email)
};

module.exports =
{
    login (data, context)
    {
        // Use this function to do something after the user has been authenticated
        return data;
    },

    async register (data, context)
    {
        const user_info       = JSON.parse(data.registration_form_data);

        // Check if sponsor is
        const is_eligible_sponsor = await MDB_USER.getUserByReferralCode(user_info.referral_code)
        .then(user =>
        {
            return user && user.nobility_info.rank_order > 1;
        });

        if(!is_eligible_sponsor)
        {
            HTTPS_ERROR('failed-precondition', 'Not eligible to be a sponsor.');
        }
        
        user_info.referred_by = user_info.referral_code;

        // Create new user and return result
        const create_user = await ADMIN_AUTH.createUser
        ({
            email         : user_info.email,
            password      : user_info.password,
            emailVerified : !!user_info.hasOwnProperty('knight_data') // false if not enlisted
        })
        .then(function(userRecord)
        {
            return {
                data : userRecord.toJSON(),
                error: null
            }
        })
        .catch(function (error)
        {
            HTTPS_ERROR('invalid-argument', error.errorInfo.message)
        });

        // Throw error and halt process
        if(create_user.error)
        {
            return {error: create_user.error}
        }

        // Generate short id as a referral code
        user_info.referral_code = generateReferralCode(user_info.email);

        // Initialize kyc status and add created_at
        user_info.kyc_status = '';
        user_info.created_at = momentTZ.toDate();
        user_info.filters    = [user_info.email, user_info.referral_code, user_info.full_name];

        // Add new user data to collection
        const user_record = create_user.data;
        delete user_info.password;

        const add_user_info = await MDB_USER.doc(user_record.uid).set
        ({
            email_verified : user_record.emailVerified ? user_record.emailVerified : null,
            photo_url      : user_record.photoURL      ? user_record.photoURL      : null,
            ...user_info
        })
        .then(async (res) =>
        {
            // update user statistics
            // increment total user and not submitted kyc
            let user_stat        = new MDB_STATS('users');
            await user_stat.incrementField('total');
            await user_stat.incrementField('kyc_not_submitted');
            return {error: false}
        })
        .catch((error) =>
        {
            return {error}
        });

        // Throw error and halt process
        if(add_user_info.error) {
            // You might want to delete created user if error occurs here
            return {error: add_user_info.error}
        }

        // Change enlistment status
        if(user_info.hasOwnProperty('knight_data')) {
            //STOPPED HERE
            // Change enlistment status
            MDB_ENLIST_KNIGHT.update(user_info.knight_data.id ,{
                status          : "registered",
                date_registered : new Date()
            });
        } else {
            await sendEmailVerificationLink(user_info.email, user_info.full_name);
        }

        return user_record.uid;
    },

    resendEmailVerification(data, context)
    {
        const user_data = JSON.parse(data);

        if(!user_data.hasOwnProperty('email') || !user_data.hasOwnProperty('full_name'))
        {
            HTTPS_ERROR('failed-precondition', 'Unable to resend verification link. Please try again');
        }

        return sendEmailVerificationLink(user_data.email, user_data.full_name)
    },

    async resetPassword(data, context)
    {
        // Generate the link for resetting password
        const generate_password_reset_link = await ADMIN_AUTH.generatePasswordResetLink(data.email)
        .then((link) => {
            return {
                data : {link},
                error: null
            }
        })
        .catch((error) => {
            return {error}
        });

        // Immediately halt if there's no generated link
        if(generate_password_reset_link.error)
        {
            return {error: generate_password_reset_link.error}
        }

        // Send the generated lin
        const mail_options = {
            to      : data.email,
            from    : 'no-reply@kryptoone.com',
            subject : 'Password Reset',
            text    : passwordResetTemplate(data.email, generate_password_reset_link.data.link),
            html    : passwordResetTemplate(data.email, generate_password_reset_link.data.link)
        };

        return sendMail(mail_options);
    }
};

