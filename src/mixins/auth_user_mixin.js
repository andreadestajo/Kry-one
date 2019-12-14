import {mapGetters}               from 'vuex'
import {
    GETTER_CURRENT_USER_DATA,
    GETTER_CURRENT_USER_WALLET
} from "../store/user-module/getters";

export default
{
    computed:
    {
        $_current_user_data()
        {
            const default_data =
            {
                notification_count: 0,
                nobility_info :
                {
                    title: ''
                },
                kyc_status: ''
            };
            return this.$store.getters[GETTER_CURRENT_USER_DATA] ? this.$store.getters[GETTER_CURRENT_USER_DATA] : default_data;
        },
        $_current_user_wallet()
        {
            const currency = this.$store.getters[GETTER_CURRENT_USER_WALLET];

            if(currency.hasOwnProperty("XAU"))
            {
                currency.UNIQ = Object.assign({}, currency.XAU)
            }
            
            return currency;
        },
    }
}
