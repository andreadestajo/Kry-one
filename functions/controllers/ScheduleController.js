const axios             = require('axios');
const rp                = require('request-promise');
const MDB_CURRENCY      = require('../models/MDB_CURRENCY');

module.exports =
{
    async updateCurrency(request, response)
    {
        let based_currency          = ['BTC', 'ETH', 'XAU'];

        for(let key=0;key<based_currency.length;key++)
        {
            let currency            = based_currency[key];
            let conversion          = await module.exports.getConversion(currency);

            console.log(currency)
            console.log(conversion)
            
            await MDB_CURRENCY.update(currency, conversion);
        }
    },
	async updateCurrencyBackup (request, response)
	{
        let based_currency          = ['BTC', 'ETH', 'XAU'];

        for(let key=0;key<based_currency.length;key++)
        {
            let currency            = based_currency[key];
            let conversion          = await module.exports.getConversion(currency);
            
            await MDB_CURRENCY.update(currency, conversion);
        }

        console.log("Conversion Rate Update Done");
        return "Conversion Rate Update Done";
	},
    async getConversion2(currency)
    {
        let conversion_currency     = ['USD', 'PHP', 'BTC', 'ETH', 'XAU', 'JPY', 'GBP'];
        let res;
        let save_data               = {};
        let conversion_rate;

        for(let i=0;i<conversion_currency.length;i++)
        {
            target_currency = conversion_currency[i];
            console.log("GETTING CONVERSION", currency, target_currency);

            if(currency === 'XAU')
            {
                const requestOptions =
                {
                    method: 'GET',
                    uri: 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion',
                    qs:
                    {
                        'amount': '1',
                        'symbol': target_currency,
                        'convert': 'XAU',
                    },
                    headers:
                    {
                        'X-CMC_PRO_API_KEY': '3d4aec6e-3060-42dc-adda-bbc801fbdd66'
                    },
                    json: true,
                    gzip: true
                };

                await rp(requestOptions).then(response =>
                {
                    res = response;
                }).catch((err) =>
                {
                    console.log('API call error:', err.message);
                });


                conversion_rate = 1 / res.data.quote['XAU'].price;
            }
            else
            {
                const requestOptions =
                {
                    method: 'GET',
                    uri: 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion',
                    qs:
                    {
                        'amount': '1',
                        'symbol': currency,
                        'convert': target_currency,
                    },
                    headers:
                    {
                        'X-CMC_PRO_API_KEY': '3d4aec6e-3060-42dc-adda-bbc801fbdd66'
                    },
                    json: true,
                    gzip: true
                };

                await rp(requestOptions).then(response =>
                {
                    res = response;
                    //console.log('API call response:', response);
                    
                }).catch((err) =>
                {
                    console.log('API call error:', err.message);
                });

                conversion_rate = res.data.quote[target_currency].price;
            }
            
            save_data[target_currency] = conversion_rate;
        }

        console.log(save_data);

        return save_data;
    },
    // async getConversion(currency)
    // {
    //     let conversion_currency     = ['USD', 'PHP', 'BTC', 'ETH', 'XAU', 'JPY', 'GBP'];
    //     let res;

    //     let conversion_api_key = process.env.CONVERSION_KEY;
        
    //     let url = `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=${conversion_currency.join()}&api_key=${conversion_api_key}`;

    //     await axios.get(url).then(function (response)
    //     {
    //         res = response.data;
    //     });
        
    //     return res;
    // }

    async getConversion(currency)
    {
        let conversion_currency = ['USD', 'PHP', 'BTC', 'ETH', 'XAU', 'JPY', 'GBP'];
        let conversion_api_key  = `a782d3329daa2f2404b1bcc94c35cfef`;
        
        let url = `https://api.nomics.com/v1/exchange-rates?key=${conversion_api_key}`;

        let rates = await axios({method: 'GET', url: url});

        let based_currency = rates.data.find((item) =>
        {
            delete item.timestamp;
            return item.currency == currency;
        })

        let filtered_rates_conversion = rates.data.filter((item) =>
        {
            delete item.timestamp;
            return conversion_currency.includes(item.currency);
        })

        let conversions = {}

        filtered_rates_conversion.forEach(item => 
        {
            conversions[item.currency] = based_currency.rate / item.rate
        })
        
        return conversions;
    }
};