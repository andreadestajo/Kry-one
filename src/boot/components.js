// Register global componentS here
import KAmountConversion from '../components/Global/KAmountConversion'

// leave the export, even if you don't use it
export default ({ Vue }) => {
    Vue.component('k-amount-conversion', KAmountConversion);
}
