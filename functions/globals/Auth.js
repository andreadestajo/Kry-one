const { HTTPS_ERROR } = require('../plugin/firebase');
const MDB_USER = require('../models/MDB_USER');
module.exports =
{
    async admin_only(context)
    {
        if(!context.auth)
        {
            HTTPS_ERROR('failed-precondition', 'No one is logged in');
        }

        let logged_in_user = await MDB_USER.get(context.auth.uid);

        if(!logged_in_user)
        {   
            HTTPS_ERROR('failed-precondition', 'User ID of logged in user not found');
        }
        else if(!logged_in_user.roles.includes('admin'))
        {
            HTTPS_ERROR('failed-precondition', 'You are not an admin.');
        }

        return logged_in_user;
    },
};