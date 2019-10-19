export const GETTER_CURRENT_USER_DATA = 'user/getCurrentUserData';
export const GETTER_USER_AUTH_ID      = 'user/getUserAuthId';

export default
{
    [GETTER_USER_AUTH_ID]      : (state) => state.userAuthId,
    [GETTER_CURRENT_USER_DATA] : (state) => state.currentUserData,
}
