const axios = require('axios');
const MDB_BTC_ADDRESS = require('../../models/MDB_BTC_ADDRESS');
const MDB_ETH_ADDRESS = require('../../models/MDB_ETH_ADDRESS');

class Bitaps
{
    constructor(uid = null, wallet_id, wallet_id_hash, currency)
    {
        this.wallet_id = wallet_id;
        this.wallet_id_hash = wallet_id_hash;
        this.currency = currency;
        this.callback_url = `https://asia-northeast1-krypto-one-live.cloudfunctions.net/bitapsCallback`;

        /* Staging */
        this.api_url = `https://api.bitaps.com/${ this.currency }/testnet/v1`;

        /* Production */
        // this.api_url = `https://api.bitaps.com/${ this.currency }/v1`

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

            if (this.currency === 'btc')
            {
                await MDB_BTC_ADDRESS.update(response.data.address, 
                {
                    uid: this.uid
                });
            }
            else if (this.currency === 'eth')
            {
                await MDB_ETH_ADDRESS.update(response.data.address, 
                {
                    uid: this.uid
                });
            }
            
            return response.data;
        }
        catch (e)
        {
            console.log(e);
            return null;
        }
    }
}

module.exports = Bitaps;