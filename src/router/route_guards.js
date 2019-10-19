import DB_USER         from '../models/DB_USER'
import {isAuthorized}  from '../globals/AuthenticationHelper'

export default
{
    // Function before each route
    beforeEachCallback: (to, from, next) =>
    {
        next()
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

    beforeEnterFront: (to, from, next) =>
    {

    }
}
