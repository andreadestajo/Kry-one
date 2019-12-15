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

            const user_data = this.$store.getters[GETTER_CURRENT_USER_DATA];

            if(!user_data.hasOwnProperty("binary_points_left"))
            {
                user_data.binary_points_left = 0;
            }

            if(!user_data.hasOwnProperty("binary_points_right"))
            {
                user_data.binary_points_right = 0;
            }

            return user_data ? user_data : default_data;
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
