const axios = require('axios');
const MDB_BTC_ADDRESS = require('../../models/MDB_BTC_ADDRESS');
const MDB_ETH_ADDRESS = require('../../models/MDB_ETH_ADDRESS');
const MDB_TRANSFER_CRYPTO = require('../../models/MDB_TRANSFER_CRYPTO');
const MDB_TRANSFER_CRYPTO_LOG = require('../../models/MDB_TRANSFER_CRYPTO_LOG');

class Bitaps
{
    constructor(uid = null, wallet_id, wallet_id_hash, currency, confirmation)
    {
        this.confirmation = confirmation;
        this.wallet_id = wallet_id;
        this.wallet_id_hash = wallet_id_hash;
        this.currency = currency;
        this.callback_url = `https://asia-northeast1-krypto-one-live.cloudfunctions.net/bitapsCallback`;

        /* Staging */
        // this.api_url = `https://api.bitaps.com/${ this.currency }/testnet/v1`;

        /* Production */
        this.api_url = `https://api.bitaps.com/${ this.currency }/v1`

        this.api_create_wallet_url = `${ this.api_url }/create/wallet/payment/address`;
        this.api_send_wallet_url = `${ this.api_url }/wallet/send/payment/${ this.wallet_id }`;
        this.api_check_wallet = `${ this.api_url }/wallet/state/${ this.wallet_id }`;
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
                confirmation: this.confirmation
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

    async sendPayment(id) 
    {
        try {
            const transfer  = await MDB_TRANSFER_CRYPTO.get(id);
            if (transfer.status != 'pending')
            {
                return {
                    status: 'success',
                    message: 'Already processed.'
                };
            }

        
            const admin_fees_percentage        = 0.05;
            const vat_percentage               = 0.125;
            const marketing_pool_percentage    = 0.10;
    
            if(transfer.status == 'pending')
            {
                const address   = transfer.address;
                const id        = transfer.id;
                let amount;

                if (transfer.currency == 'btc')
                {
                    amount = (transfer.amount * 100000000);
                }else
                if (transfer.currency == 'etc')
                {
                    amount = (transfer.amount * 1000000000000000000);
                }

                let receivers_list = [];
                
                receivers_list.push({
                    address: address, 
                    amount: amount
                })

                const admin_fees        = (amount * admin_fees_percentage);
                const vat               = (amount * vat_percentage);
                const marketing_pool    = (amount * marketing_pool_percentage);

                const total_deduction   = (admin_fees + vat + marketing_pool);

                amount = (amount - total_deduction);

                const response  = await axios.post(this.api_send_wallet_url,
                {
                    receivers_list
                });

                const statusRes = await MDB_TRANSFER_CRYPTO.update(id, {
                    status: 'approved'
                });

                response.data.tx_list.forEach(async tx => await MDB_TRANSFER_CRYPTO_LOG.update(tx.tx_hash, tx));
                
                return {
                    status: 'success',
                    message: response.data
                };
            }
        } catch (error) {
            return {
                status: 'error',
                message: error.response.data.message
            };
        }
    }

    async sendAllPayment()
    {
        const transfers = await MDB_TRANSFER_CRYPTO.getMany(null, this.currency);

        if (transfers.length === 0)
        {
            return {
                status: 'success',
                message: 'Already processed.'
            };
        }

        let receivers_list = [];

        transfers.forEach(transfer =>
        {
            const address = transfer.address;
            
            let amount = transfer.amount * 100000000;

            if (transfer.currency === 'eth')
            {
                amount = transfer.amount * 1000000000000000000;
            }

            receivers_list.push({
                address,
                amount 
            });
        });

        try
        {
            const response = await axios.post(this.api_send_wallet_url,
            {
                receivers_list
            });

            let promise_list = [];

            transfers.forEach(transfer =>
            {
                promise_list.push(MDB_TRANSFER_CRYPTO.update(transfer.id, {
                    status: 'approved'
                }));
            });

            response.data.tx_list.forEach(tx => promise_list.push(MDB_TRANSFER_CRYPTO_LOG.update(tx.tx_hash, tx)));

            await Promise.all(promise_list);

            return {
                status: 'success',
                message: response.data
            };
        }
        catch (e)
        {
            return {
                status: 'error',
                message: e.response.data.message
            };
        }
    }

    async checkWallet()
    {
        try
        {
            const response = await axios.get(this.api_check_wallet, 
            {
                params:
                {
                    wallet_id: this.wallet_id
                }
            });

            return response.data;
        }
        catch (e)
        {
            console.log(e.response.data);
            return null;
        }
    }

    async checkAddress(address)
    {
        try
        {
            await axios.get(`${ this.api_url }/blockchain/address/state/${ address }`);
            return true;
        }
        catch (e)
        {
            console.log(e.response.data);
            return false;
        }
    }
}

module.exports = Bitaps;