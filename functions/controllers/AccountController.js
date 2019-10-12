const {ADMIN_AUTH} = require('../plugin/firebase');
const user         = require('../models/MDB_USER');
const {sendMail}   = require('../globals/EmailHelper');

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


        return {email: user_record.email}
    },

    async sendEmailVerificationLink(email)
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

        // Send verification email
        const send_email = sendMail({
            to      : 'samps@getnada.com', // required
            from    : 'no-reply@getnada.com', // required
            subject : 'Test Mail', // required
            text    : 'This is a text mail',
            html    : '<b>this is a bold text <i>and this</i></b>'
        });

        if(send_email.error) {
            return {error: send_email.error}
        }

        // Last step of registration
        return {
            data: {message: 'Successfully Created Email'}
        }

    }
};

