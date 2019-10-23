const axios             = require('axios');
const MDB_CURRENCY      = require('../models/MDB_CURRENCY');
module.exports =
{
	async updateCurrency (request, response)
	{
        let based_currency          = ['BTC', 'ETH', 'XRP'];

        for(let key=0;key<based_currency.length;key++)
        {
            let currency = based_currency[key];
            let conversion = await module.exports.getConversion(currency);
            await MDB_CURRENCY.update(currency, conversion);
        }

        response.end("END");
	},
    async getConversion(currency)
    {
        let conversion_currency     = ['USD', 'PHP', 'BTC', 'ETH', 'XRP'];
        let res;

        let conversion_api_key = process.env.CONVERSION_KEY;
        let url = `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=${conversion_currency.join()}&api_key=${conversion_api_key}`;
        console.log(url);

        await axios.get(url).then(function (response)
        {
            res = response.data;
        })
        .catch(function (error)
        {
        });
        
        return res;
    }
};