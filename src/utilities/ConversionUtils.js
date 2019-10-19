import {formatNumber} from '../utilities/NumberUtils';

export const convertRate = (amount, currency, options = {}) =>
{
    let conversion_amount   = amount;
    let conversion_rates    = { USD: 1530, PHP: 81090 }; //this is just a sample (this must come from a database)
    conversion_amount       = conversion_amount * conversion_rates[currency];

    // Format with decimal
    if(options.hasOwnProperty('raw'))
    {
        return conversion_amount;
    }
    else 
    {
        return currency + " " + formatNumber(conversion_amount || 0, { decimal: 2 });
    }
};