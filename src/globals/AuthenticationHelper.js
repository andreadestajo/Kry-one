import Store from '../store'

import {
    GETTER_CURRENT_ADMIN_ACCESS,
    GETTER_CURRENT_USER_DATA
} from "../store/user-module/getters";


/**
 *
 * @param role {string || array}
 */
export const isAuthorized = (allowed_roles = null) =>
{
    const user_data = Store().getters[GETTER_CURRENT_USER_DATA];

    // User not logged in
    if(!user_data) {return}

    // User only
        if(!allowed_roles) {return true}

    let user_roles = [];

    // Check user roles
    if(user_data.hasOwnProperty('roles') && user_data)
    {
        user_roles = user_data.roles;
    }

    // Format allowed roles
    if(typeof allowed_roles === "string")
    {
        allowed_roles = [allowed_roles]
    }

    // Check access here
    return user_roles.some((role) => {
        return allowed_roles.includes(role)
    })
};


export const hasAccessTo = (access_key) => {
    if(!access_key)
    {
        return true;
    }

    const user_data = Store().getters[GETTER_CURRENT_USER_DATA];

    let user_roles = [];

    // Check user roles
    if(user_data.hasOwnProperty('roles') && user_data)
    {
        user_roles = user_data.roles;
    }

    if(user_roles.includes("developer"))
    {
        return true;
    }

    const admin_access = Store().getters[GETTER_CURRENT_ADMIN_ACCESS];
    return admin_access.includes(access_key)
};



