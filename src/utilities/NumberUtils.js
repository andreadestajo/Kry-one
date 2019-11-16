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
        if(options.hasOwnProperty('decimal') || options.hasOwnProperty('currency'))
        {
            const currency     = options.hasOwnProperty('currency') ? options.currency : null;

            const to_fixed_num = options.hasOwnProperty('decimal')
                ? options.decimal
                    : !currency
                ? null
                    : ['BTC','XAU'].includes(currency)
                ? 8
                    : ['PHP', 'USD', 'ETH'].includes(currency)
                ? 2
                    : null;

            formatted_number = to_fixed_num ? formatted_number.toFixed(to_fixed_num) : formatted_number
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
            const currency   = options.currency === 'XAU' ? 'UNIQ' : options.currency;
            formatted_number = formatted_number + " " + currency;
        }
    }

    return formatted_number;
};
