import { format } from 'quasar'
const { pad } = format;

/**
 * Do the ff: add padding
 * @param number
 * @param options {pad: number}
 * @returns {number}
 */
export const formatNumber = (number, options = {}) =>
{
    let formatted_number = parseFloat(number);

    if(options && options instanceof Object)
    {

        // Format with decimal
        if(options.hasOwnProperty('decimal'))
        {
            formatted_number = formatted_number.toFixed(options.decimal);
        }

        formatted_number = formatted_number.toString().replace(/[^\d.,]/g, '');

        // Format with padding
        if(options.hasOwnProperty('pad'))
        {
            formatted_number = pad(formatted_number , options.pad);
        }

        // Format with padding
        if(options.hasOwnProperty('currency'))
        {
            formatted_number = formatted_number + " " + options.currency;
        }
    }

    return formatted_number;
};
