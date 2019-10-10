const {ADMIN_AUTH} = require('../plugin/firebase');
const user         = require('../models/MDB_USER');

module.exports =
{
    login (request, response)
    {
        return "login";
    },

    async register (data, context)
    {
        const user_info = data.userData;
        let user_record = {
            emailVerified : false,
            photoURL      : null,
            phoneNumber   : null
        };

        // Create new user and return result
        const create_user_result = await ADMIN_AUTH.createUser
        ({
            email   : user_info.email,
            password: user_info.password,
        })
            .then(function(userRecord)
            {
                user_record = Object.assign(userRecord, userRecord.toJSON());
                return {error: null};
            })
            .catch(function (error)
            {
                return {error}
            });

        // Throw error and halt process
        if(create_user_result.error) {
            return {error: create_user_result.error}
        }

        // Add new user data to collection
        return user.doc(user_record.uid)
        ({
            emailVerified : user_record.emailVerified ,
            photoURL      : user_record.photoURL      ,
            phoneNumber   : user_record.phoneNumber   ,
            ...user_info,
        })
    },

    verifyEmail(request, response) {

    },

    resetPassword (request, response) {

    }
};

