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
    let formatted_number = number;

    if(options && options instanceof Object)
    {
        // Format with padding
        if(options.hasOwnProperty('pad'))
        {
            formatted_number = pad(formatted_number , options.pad);
        }
    }

    return formatted_number;
};
