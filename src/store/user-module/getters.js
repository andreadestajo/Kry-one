export const GETTER_CURRENT_USER_DATA   = 'user/getCurrentUserData';
export const GETTER_CURRENT_USER_WALLET = 'user/getCurrentUserWallet';
export const GETTER_USER_AUTH_ID        = 'user/getUserAuthId';

export default
{
    [GETTER_USER_AUTH_ID]        : (state) => state.user_auth_id,
    [GETTER_CURRENT_USER_DATA]   : (state) => state.current_user_data,
    [GETTER_CURRENT_USER_WALLET] : (state) => state.current_user_wallet
}
