export const GETTER_CURRENT_USER_DATA = 'user/getCurrentUserData';
export const GETTER_USER_AUTH_ID      = 'user/getUserAuthId';

export default
{
    [GETTER_USER_AUTH_ID]      : (state) => state.user_auth_id,
    [GETTER_CURRENT_USER_DATA] : (state) => state.current_user_data,
}
