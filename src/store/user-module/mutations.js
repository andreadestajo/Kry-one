export const MUTATION_SET_CURRENT_USER_DATA  = 'user/setCurrentUserData';
export const MUTATION_SET_CURRENT_AUTH_ID    = 'user/setUserId';

export default
{
    [MUTATION_SET_CURRENT_USER_DATA]: (state, payload) =>
    {
        state.currentUserData = Object.assign({}, payload);
    },
    [MUTATION_SET_CURRENT_AUTH_ID]: (state, payload) =>
    {
        state.userAuthId = payload;
    },
}
