export const MUTATION_SET_CURRENT_USER_DATA  = 'user/setCurrentUserData';
export const MUTATION_SET_CURRENT_AUTH_ID    = 'user/setUserId';

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
}
