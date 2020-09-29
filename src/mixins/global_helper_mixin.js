import {formatNumber} from '../utilities/NumberUtils';
import {formatDate}   from '../utilities/DateUtils';
import {isAuthorized} from "../globals/AuthenticationHelper";

import {mapGetters}      from 'vuex'
import {GETTER_CURRENCY} from "../store/currency-module/getters";

import DB_CURRENCY from "../models/DB_CURRENCY";
import { DB } from '../boot/firebase';

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

        async $convertRate (amount, base, conversion ) {
            base        = base === "UNIQ" ? "XAU" : base;
            conversion  = conversion === "UNIQ" ? "XAU" : conversion;

            // console.log(amount)
            // console.log(base)
            // console.log(conversion)

            const rates = await DB_CURRENCY.get(base);

            // const usd = rates["USD"] * amount

            // console.log("DOLLAR: ", usd);
            // console.log("BTC: ", usd / rates["USD"]);

            return rates[conversion] * amount;
        },
        $_convertRate(amount, base, conversion, options = {})
        {
            base       = base === "UNIQ" ? "XAU" : base;
            conversion = conversion === "UNIQ" ? "XAU" : conversion;
            console.log(this.currency)
            console.log(this.currency[base][conversion])
            let converted_rate = this.currency[base][conversion] * amount;

            // Default format number is true
            if(options.hasOwnProperty('format_number') && !options.format_number)
            {
                // autoset decimal point
                const to_fixed_num = options.hasOwnProperty('decimal')
                    ? options.decimal
                        : ['BTC','XAU', 'UNIQ'].includes(conversion)
                    ? 8
                        : ['PHP', 'USD', 'ETH'].includes(conversion)
                    ? 2
                        : null;

                converted_rate = to_fixed_num ? converted_rate.toFixed(to_fixed_num) : converted_rate;

                return converted_rate;
            }


            return this.$_formatNumber(converted_rate, options);
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
