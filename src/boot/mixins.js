// Register global mixins here
import AuthUser      from '../mixins/auth_user_mixin'
import ConfirmDialog from '../mixins/confirm_dialog_mixin'
import GlobalHelper  from '../mixins/global_helper_mixin'
import Loading       from '../mixins/loading_mixin'

// leave the export, even if you don't use it
export default ({ Vue }) => {
    Vue.mixin(AuthUser);
    Vue.mixin(ConfirmDialog);
    Vue.mixin(GlobalHelper);
    Vue.mixin(Loading);
}
