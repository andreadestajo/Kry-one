// Register global mixins here
import GlobalHelper from '../mixins/global_helper_mixin'
import Loading      from '../mixins/loading_mixin'

// leave the export, even if you don't use it
export default ({ Vue }) => {
    Vue.mixin(Loading);
    Vue.mixin(GlobalHelper);
}
