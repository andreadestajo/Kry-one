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
            console.log('onAuthStateChanged is invoked');
            // Set observable
            AUTH.onAuthStateChanged(async function(user)
            {
                if (user)
                {
                    console.log('user is logged in');
                    // Get user data
                    let current_user = await DB_USER.doc(user.uid).get();
                    current_user = Object.assign(current_user.data(), {id: current_user.id});

                    // commit here
                    Store().commit(MUTATION_SET_CURRENT_AUTH_ID, user.uid);
                    Store().commit(MUTATION_SET_CURRENT_USER_DATA, current_user);

                    // Set local storage
                    localStorage.setItem('auth_id', user.uid);

                    next();
                    return 0;
                }
                else
                {
                    console.log('user is logged out');
                    // Remove sessions
                    Store().commit(MUTATION_SET_CURRENT_AUTH_ID, null);
                    Store().commit(MUTATION_SET_CURRENT_USER_DATA, null);
                    localStorage.removeItem('auth_id');

                    next();
                    return 0;
                }
            });
        }
        else
        {
            console.log('used is logged out');
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
        if(!isAuthorized('admin'))
        {
            next('error404');
            return 0;
        }

        // Finally
        next();
    },

    beforeEnterLogin: (to, from, next) =>
    {
        if(isAuthorized())
        {
            // Check access
            if(isAuthorized('developer'))
            {
                next('developer');
                return 0;
            }
            else if (isAuthorized('admin'))
            {
                next('admin');
                return 0;
            }
            else
            {
                next('member');
                return 0;
            }
        }
        else
        {
            next();
        }
    }
}
