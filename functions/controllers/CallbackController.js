const MDB_BTC_ADDRESS = require('../models/MDB_BTC_ADDRESS');
const MDB_ETH_ADDRESS = require('../models/MDB_ETH_ADDRESS');
const MDB_USER_NOTIFICATION = require('../models/MDB_USER_NOTIFICATION');
const MDB_USER = require('../models/MDB_USER');
const MDB_CRYPTO_REPORT = require('../models/MDB_CRYPTO_REPORT');
const Wallet = require('../globals/Wallet');

module.exports =
{
    async bitaps(req, res)
    {
        if (parseInt(req.body.confirmations) > 12)
        {
            return res.status(200).send(true);
        }
        
        const is_btc = req.body.currency === "tBTC" || req.body.currency === "BTC";
        const is_eth = req.body.currency === "tETH" || req.body.currency === "ETH";

        let address = null;
        let current_currency = null;
        let current_currency_name = null;
        let converted_amount = 0;
        let image_notification = null;
        let required_confirmation = null;

        if (is_btc)
        {
            address = await MDB_BTC_ADDRESS.get(req.body.address);
            current_currency = "BTC";
            current_currency_name = "Bitcoin";
            converted_amount = parseFloat(req.body.amount) / 100000000;
            image_notification = 'https://cdn2.iconfinder.com/data/icons/cryptocurrency-5/100/cryptocurrency_blockchain_crypto-01-512.png';
            required_confirmation = 6;
        }
        else if (is_eth)
        {
            address = await MDB_ETH_ADDRESS.get(req.body.address);
            current_currency = "ETH";
            current_currency_name = "Ethereum";
            converted_amount = parseFloat(req.body.amount) / 1000000000000000000;
            image_notification = 'https://cdn4.iconfinder.com/data/icons/cryptocoins/227/ETH-alt-512.png';
            required_confirmation = 12;
        }
        else
        {
            return res.status(200).send(true);
        }

        if (address)
        {
            let postback                        = {};

            postback.uid                        = address.uid;
            postback.event                      = req.body.event ? req.body.event : null;
            postback.address                    = req.body.address ? req.body.address : null;
            postback.tx_hash                    = req.body.tx_hash ? req.body.tx_hash : null;
            postback.tx_out                     = req.body.tx_out ? req.body.tx_out : null;
            postback.code                       = req.body.code ? req.body.code : null;
            postback.invoice                    = req.body.invoice ? req.body.invoice : null;
            postback.confirmations              = req.body.confirmations ? parseInt(req.body.confirmations) : null;
            postback.received_amount            = req.body.received_amount ? parseFloat(req.body.received_amount) : null;
            postback.pending_received_amount    = req.body.pending_received_amount ? parseFloat(req.body.pending_received_amount) : null;
            postback.pending_received_tx        = req.body.pending_received_tx ? req.body.pending_received_tx : null;
            postback.received_tx                = req.body.received_tx ? req.body.received_tx : null;
            postback.amount                     = req.body.amount ? parseFloat(req.body.amount) : null;
            postback.signature                  = req.body.signature ? req.body.signature : null;
            postback.currency                   = req.body.currency ? req.body.currency : null;

            if (is_btc)
            {
                postback.BTCUSD_HITBTC              = parseFloat(req.body.BTCUSD_HITBTC);
                postback.BTCUSD_BITTREX             = parseFloat(req.body.BTCUSD_BITTREX);
                postback.BTCUSD_BITFINEX            = parseFloat(req.body.BTCUSD_BITFINEX);
                postback.BTCUSD_BITSTAMP            = parseFloat(req.body.BTCUSD_BITFINEX);
                postback.BTCUSD_COINBASEPRO         = parseFloat(req.body.BTCUSD_COINBASEPRO);
                postback.BTCUSD_KRAKEN              = parseFloat(req.body.BTCUSD_KRAKEN);
                postback.BTCUSD_GEMINI              = parseFloat(req.body.BTCUSD_GEMINI);
                postback.BTCUSD_BITLISH             = parseFloat(req.body.BTCUSD_BITLISH);
                postback.BTCUSD_AVERAGE             = parseFloat(req.body.BTCUSD_AVERAGE);
            }

            postback.transaction_number         = Math.floor(Math.random() * 999999);
            postback.transaction_date           = new Date();
            
            let current_transaction = null;

            if (is_btc)
            {
                await MDB_BTC_ADDRESS.update(`${postback.address}/transactions/${postback.tx_hash}/confirmations/${postback.confirmations}`, postback);
                current_transaction = await MDB_BTC_ADDRESS.get(`${postback.address}/transactions/${postback.tx_hash}`);
            }
            else
            {
                await MDB_ETH_ADDRESS.update(`${postback.address}/transactions/${postback.tx_hash}/confirmations/${postback.confirmations}`, postback);
                current_transaction = await MDB_ETH_ADDRESS.get(`${postback.address}/transactions/${postback.tx_hash}`);
            }

            let current_confirmation = -1;

            if (current_transaction)
            {
                current_confirmation        = current_transaction.confirmations;
                postback.transaction_number = current_transaction.transaction_number;
            }

            //check transaction and give wallet if necesarry
            if(postback.confirmations === 0 && current_confirmation === -1)
            {
                let transaction_notification = `Pending ${ current_currency_name.toLowerCase() } transaction with an amount of <b>${converted_amount} ${ current_currency }</b> and a reference number of <b>${postback.transaction_number}</b> has been sent to you.`;
                postback.date_created   = new Date();
                postback.status         = "pending";
                
                await MDB_USER_NOTIFICATION.addNew(postback.uid, transaction_notification, image_notification, { tx_hash: postback.tx_hash, currency: current_currency });
            }
            else if(postback.confirmations === required_confirmation && current_transaction.status === "pending")
            {
                let transaction_notification = `Congratulations! Transaction number <b>${postback.transaction_number}</b> has been confirmed by the network. <b>${converted_amount} ${ current_currency }</b> has now been credited to your account.`;

                postback.date_confirmed = new Date();
                postback.status         = "confirmed";

                //insert wallet to customer
                let description = `${ current_currency_name } Received`;
                let transaction_detail = `You received <b>${ current_currency_name.toLowerCase() } (${ current_currency })</b> in your wallet.`;

                Wallet.add(postback.uid, current_currency, (converted_amount), 'received', description, "", transaction_detail);
                await MDB_USER_NOTIFICATION.addNew(postback.uid, transaction_notification, image_notification, { tx_hash: postback.tx_hash, currency: current_currency });
                
                // get user info
                const user = await MDB_USER.get(postback.uid);

                // insert logs for report (insert)
                let insert_crypto_report = {};
                
                insert_crypto_report.currency = current_currency;
                insert_crypto_report.amount = converted_amount;
                insert_crypto_report.address = address;
                insert_crypto_report.transaction_number = postback.transaction_number;
                insert_crypto_report.charge = 0;
                insert_crypto_report.action = 'received';
                insert_crypto_report.user_id = postback.uid;
                insert_crypto_report.user_name = user ? user.full_name : 'No User Found';
                insert_crypto_report.date_created = new Date();

                await MDB_CRYPTO_REPORT.add(insert_crypto_report);
            }

            if (is_btc)
            {
                await MDB_BTC_ADDRESS.update(`${postback.address}/transactions/${postback.tx_hash}`, postback);
            }
            else
            {
                await MDB_ETH_ADDRESS.update(`${postback.address}/transactions/${postback.tx_hash}`, postback);
            }
        }

        return res.status(200).send(true);
    }
};
