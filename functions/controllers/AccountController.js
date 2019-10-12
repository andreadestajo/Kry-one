const {HTTPS_ERROR} = require("../plugin/firebase");

const {ADMIN_AUTH} = require('../plugin/firebase');
const user         = require('../models/MDB_USER');

module.exports =
{
    login (data, context)
    {
        // Use this function to do something after the user has been authenticated
        return data;
    },

    async register (data, context)
    {
        const user_info     = data.registration_form_data;

        // Create new user and return result
        const create_user = await ADMIN_AUTH.createUser
        ({
            email   : user_info.email,
            password: user_info.password,
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
            return {error}
        });

        // Throw error and halt process
        if(create_user.error)
        {
            return {error: create_user.error}
        }

        // Add new user data to collection
        const user_record   = create_user.data;
        const add_user_info = user.doc(user_record.uid).set
        ({
            emailVerified : user_record.emailVerified ? user_record.emailVerified : null,
            photoURL      : user_record.photoURL      ? user_record.photoURL      : null,
            phoneNumber   : user_record.phoneNumber   ? user_record.phoneNumber   : null,
            ...user_info,
        })
        .then(() =>
        {
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

        // Send email verification link
        await ADMIN_AUTH.sendEmailVerification(user_record.email)
        .then((link) => {
            // Construct email verification template, embed the link and send
            // using custom SMTP server.
            console.log('oksna')
        })
        .catch((error) => {
            console.log({error})
        });
        return {email: user_record.email}
    },

    verifyEmail(request, response) {

    },

    resetPassword (request, response) {

    }
};

