import DB_USER  from '../models/DB_USER'
import {AUTH}   from "../boot/firebase";

import {isAuthorized}  from '../globals/AuthenticationHelper'
import Store from '../store/index'
import {
    MUTATION_SET_CURRENT_AUTH_ID,
    MUTATION_SET_CURRENT_USER_DATA
} from "../store/user-module/mutations";

export default
{
    // Function before each route
    beforeEachCallback: async (to, from, next) =>
    {
        // Check if there's an observer
        const user = DB_USER.getCurrentUser();

        if(!user)
        {
            // Set observable
            AUTH.onAuthStateChanged(async function(user)
            {
                if (user)
                {
                    // Get user data
                    let currentUser = await DB_USER.doc(user.uid).get();
                    currentUser = Object.assign(currentUser.data(), {id: currentUser.id});

                    // commit here
                    Store().commit(MUTATION_SET_CURRENT_AUTH_ID, user.uid);
                    Store().commit(MUTATION_SET_CURRENT_USER_DATA, currentUser);
                    next()
                }
                else
                {
                    next()
                }
            });
        }
        else
        {
            next();
        }
    },

    beforeEnterMember: (to, from, next) =>
    {
        // Get current user info
        const user = DB_USER.getCurrentUser();

        // If not authenticated redirect to login page
        if(!user)
        {
            next('login');
            return 0;
        }

        if(!user.emailVerified)
        {
            next('unverified');
            return 0;
        }

        // Check if verified user
        console.log('okay naman dito');
        next();
    },

    beforeEnterAdmin: (to, from, next) =>
    {
        // Get current user info
        const user = DB_USER.getCurrentUser();

        // If not authenticated redirect to login page
        if(!user)
        {
            next('login');
            return 0;
        }

        if(!user.emailVerified)
        {
            next('unverified');
            return 0;
        }

        // Check if role
        if(isAuthorized('admin'))
        {

        }
    },

    beforeEnterLogin: (to, from, next) =>
    {
        console.log(DB_USER.getCurrentUser());
        console.log('before login enter');
        next();
    }
}
