import {formatNumber} from '../utilities/NumberUtils';
import {formatDate}   from '../utilities/DateUtils';
import {convertRate}   from '../utilities/ConversionUtils';

export default {
    methods: {
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
        $_convertRate(amount, currency, options)
        {
            const conversionRate = convertRate(amount, currency, options);
            return conversionRate;
        }
    }
}
