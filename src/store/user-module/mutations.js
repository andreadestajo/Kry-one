export const MUTATION_SET_CURRENT_USER_DATA   = 'user/setCurrentUserData';

export default
{
    [MUTATION_SET_CURRENT_USER_DATA]: (state, payload) =>
    {
        state.currentUserData = Object.assign({}, payload);
    },
}
