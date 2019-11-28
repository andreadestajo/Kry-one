const MDB_BTC_ADDRESS = require('../models/MDB_BTC_ADDRESS');
const MDB_USER_NOTIFICATION = require('../models/MDB_USER_NOTIFICATION');
const required_confirmation = 3;
const btc_image = 'https://cdn2.iconfinder.com/data/icons/cryptocurrency-5/100/cryptocurrency_blockchain_crypto-01-512.png';
const Wallet = require('../globals/Wallet');

module.exports =
{
    async bitcoin(req, res)
    {
        const btcAddress = await MDB_BTC_ADDRESS.get(req.body.address)

        if (btcAddress)
        {
            let postback                        = {};

            postback.uid                        = btcAddress.uid;
            postback.event                      = req.body.event;
            postback.address                    = req.body.address;
            postback.tx_hash                    = req.body.tx_hash;
            postback.tx_out                     = req.body.tx_out;
            postback.code                       = req.body.code;
            postback.invoice                    = req.body.invoice;
            postback.confirmations              = parseInt(req.body.confirmations);
            postback.received_amount            = parseFloat(req.body.received_amount);
            postback.pending_received_amount    = parseFloat(req.body.pending_received_amount);
            postback.pending_received_tx        = req.body.pending_received_tx;
            postback.received_tx                = req.body.received_tx;
            postback.amount                     = parseFloat(req.body.amount);
            postback.signature                  = req.body.signature;
            postback.currency                   = req.body.currency;
            postback.BTCUSD_HITBTC              = parseFloat(req.body.BTCUSD_HITBTC);
            postback.BTCUSD_BITTREX             = parseFloat(req.body.BTCUSD_BITTREX);
            postback.BTCUSD_BITFINEX            = parseFloat(req.body.BTCUSD_BITFINEX);
            postback.BTCUSD_BITSTAMP            = parseFloat(req.body.BTCUSD_BITFINEX);
            postback.BTCUSD_COINBASEPRO         = parseFloat(req.body.BTCUSD_COINBASEPRO);
            postback.BTCUSD_KRAKEN              = parseFloat(req.body.BTCUSD_KRAKEN);
            postback.BTCUSD_GEMINI              = parseFloat(req.body.BTCUSD_GEMINI);
            postback.BTCUSD_BITLISH             = parseFloat(req.body.BTCUSD_BITLISH);
            postback.BTCUSD_AVERAGE             = parseFloat(req.body.BTCUSD_AVERAGE);
            postback.transaction_number         = Math.floor(Math.random() * 999999);
            
            postback.transaction_date           = new Date();

            console.log(`${postback.confirmations} confirmations for transaction hash (${postback.tx_hash}) on BTC Address (${postback.address})`);

            await MDB_BTC_ADDRESS.update(`${postback.address}/transactions/${postback.tx_hash}/confirmations/${postback.confirmations}`, postback);
            
            let current_transaction             = await MDB_BTC_ADDRESS.get(`${postback.address}/transactions/${postback.tx_hash}`);
            let current_confirmation            = -1;

            if (current_transaction)
            {
                current_confirmation        = current_transaction.confirmations;
                postback.transaction_number = current_transaction.transaction_number;
            }

            //check transaction and give wallet if necesarry
            if(postback.confirmations === 0 && current_confirmation === -1)
            {
                let transaction_notification = `Pending bitcoin transaction with an amount of <b>${postback.amount/100000000} BTC</b> and a reference number of <b>${postback.transaction_number}</b> has been sent to you.`;
                postback.date_created   = new Date();
                postback.status         = "pending";
                
                MDB_USER_NOTIFICATION.addNew(postback.uid, transaction_notification, btc_image, { tx_hash: postback.tx_hash });
                
            }
            else if(postback.confirmations === required_confirmation && current_transaction.status === "pending")
            {
                let transaction_notification = `Congratulations! Transaction number <b>${postback.transaction_number}</b> has been confirmed by the network. <b>${postback.amount/100000000} BTC</b> has now been credited to your account.`;

                postback.date_confirmed = new Date();
                postback.status         = "confirmed";

                //insert wallet to customer
                let description = "Bitcoin Received";
                let transaction_detail = "You received <b>bitcoin (BTC)</b> in your wallet.";

                Wallet.add(postback.uid, 'BTC', postback.amount, 'received', description, "", transaction_detail);
                MDB_USER_NOTIFICATION.addNew(postback.uid, transaction_notification, btc_image, { tx_hash: postback.tx_hash });
            }

            await MDB_BTC_ADDRESS.update(`${postback.address}/transactions/${postback.tx_hash}`, postback);
        }

        res.status(200).send(true);
    }
};
