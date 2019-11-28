import {mapGetters}               from 'vuex'
import {GETTER_CURRENT_USER_DATA} from "../store/user-module/getters";

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
        }
    }
}
