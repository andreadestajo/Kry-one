import {formatNumber} from '../utilities/NumberUtils';
import {formatDate}   from '../utilities/DateUtils';

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
        $_convertRate(amount, base, conversion)
        {
            base       = base === "UNIQ" ? "XRP" : base;
            conversion = conversion === "UNIQ" ? "XRP" : conversion;

            console.log(this.currency);
        }
    }
}
