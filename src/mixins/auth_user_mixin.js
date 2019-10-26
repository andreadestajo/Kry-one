import {mapGetters}               from 'vuex'
import {GETTER_CURRENT_USER_DATA} from "../store/user-module/getters";

export default
{
    computed:
    {
        $_current_user_data()
        {
            return this.$store.getters[GETTER_CURRENT_USER_DATA];
        }
    }
}
