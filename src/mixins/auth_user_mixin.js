import {mapGetters}               from 'vuex'
import {GETTER_CURRENT_USER_DATA} from "../store/user-module/getters";

export default
{
    computed:
    {
        ...mapGetters({$_current_user_data
            : [GETTER_CURRENT_USER_DATA]
        })
    }
}
