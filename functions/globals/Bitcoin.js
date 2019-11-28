const axios = require('axios');
const MDB_BTC_ADDRESS = require('../models/MDB_BTC_ADDRESS');

class Bitcoin
{
    constructor(uid = null)
    {
        // creds

        // this.wallet_id = "BTCuwLB2aUMaWUq9SBwuazTtydDvgyjg8XLakgdkKHNRyfpXqjwz1";
        this.wallet_id = "BTCuXxpZioeP1c73aefw5qVrzLzfn5yn2GPbNSYrRWa8XLHMbpAGg";
        // this.wallet_id_hash = "412c1ece26658a67e4a91e3afa757a4773ea1f5fe41a6ee1088fbffb2ef89d37";
        this.wallet_id_hash = "f57995ab520e7e75b676f1c1fe5c71851eb8fc0ae9be2ac5396124a0ec4e8146";

        this.currency = "btc";
        this.callback_url = `https://asia-northeast1-krypto-one-live.cloudfunctions.net/bitcoinCallback${ uid ? ('?uid=' + uid) : '' }`;

        // url
        // this.api_url = `https://api.bitaps.com/${ this.currency }/v1`
        this.api_url = `https://api.bitaps.com/${ this.currency }/testnet/v1`
        this.api_create_wallet_url = `${ this.api_url }/create/wallet/payment/address`;

        this.uid = uid;
    }

    async createWallet()
    {
        try
        {
            const response = await axios.post(this.api_create_wallet_url, 
            {
                wallet_id: this.wallet_id,
                callback_url: this.callback_url,
                confirmation: 3
            });

            await MDB_BTC_ADDRESS.update(response.data.address, {
                uid: this.uid
            });
            
            return response.data;
        }
        catch (e)
        {
            return {};
        }
    }
}

module.exports = Bitcoin;