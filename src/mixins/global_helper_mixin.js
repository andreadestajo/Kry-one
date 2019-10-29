import {formatNumber} from '../utilities/NumberUtils';
import {formatDate}   from '../utilities/DateUtils';
import {isAuthorized} from "../globals/AuthenticationHelper";

import {mapGetters}      from 'vuex'
import {GETTER_CURRENCY} from "../store/currency-module/getters";

export default {
    computed:
    {
        ...mapGetters({
            currency: GETTER_CURRENCY
       })
    },
    methods:
    {
        /**
         * Some description here
         * @param number
         * @param options {pad: number}
         * @returns {number}
         */
        $_formatNumber(number, options)
        {
            const formatted_number = formatNumber(number, options);
            // Just in case you wanna add another condition or formatter
            return formatted_number;
        },

        /**
         *
         * @param date
         * @param options
         * @returns {string} formattedDate
         */
        $_formatDate(date, options)
        {
            const formatted_date = formatDate(date, options);
            // Just in case you wanna add another condition or formatter
            return formatted_date
        },

        /**
         *
         * @param amount
         * @param currency
         * @param options
         * @returns {string} conversionRate
         */
        $_convertRate(amount, base, conversion, options)
        {
            base       = base === "UNIQ" ? "XAU" : base;
            conversion = conversion === "UNIQ" ? "XAU" : conversion;
            return conversion + " " + this.$_formatNumber(this.currency[base][conversion] * amount, { decimal: 2 });
        },

        $_log(log, title)
        {
            console.log(title ? title : this.$route.name, log)
        },

        $_isAuthorize(allowed_roles = null)
        {
            return isAuthorized(allowed_roles)
        }
    }
}
