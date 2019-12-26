export const MUTATION_SET_CURRENT_USER_DATA    = 'user/setCurrentUserData';
export const MUTATION_SET_CURRENT_USER_WALLET  = 'user/setCurrentUserWallet';
export const MUTATION_SET_CURRENT_AUTH_ID      = 'user/setUserId';
export const MUTATION_SET_CURRENT_ADMIN_ACCESS = 'user/setAdminAccess';

export default
{
    [MUTATION_SET_CURRENT_USER_DATA]: (state, payload) =>
    {
        state.current_user_data = payload ? Object.assign({}, payload) : null;
    },
    [MUTATION_SET_CURRENT_AUTH_ID]: (state, payload) =>
    {
        state.user_auth_id = payload;
    },
    [MUTATION_SET_CURRENT_ADMIN_ACCESS]: (state, payload) =>
    {
        state.current_admin_access = payload;
    },
    [MUTATION_SET_CURRENT_USER_WALLET]: (state, payload) =>
    {
        if(payload && payload.length)
        {
            const wallet = {};

            // Get object keys
            payload.forEach(c => {
                wallet[c.id] = c
            });

            state.current_user_wallet = wallet;
        }
    }
}
