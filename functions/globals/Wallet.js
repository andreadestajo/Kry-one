const { HTTPS_ERROR }           = require('../plugin/firebase');
const MDB_USER_WALLET           = require('../models/MDB_USER_WALLET');
const MDB_USER_WALLET_LOG       = require('../models/MDB_USER_WALLET_LOG');

module.exports =
{
    allowed_currency: ['btc', 'eth', 'xau'],

    /**
     * @param {string} uid              user_id of member to update 
     * @param {string} currency         (php, usd, or yuan)
     * @param {number} amount           amount to topup
     * @param {string} type             (received, issued, earned) type of transaction
     * @param {string} description      (optional) details about the transaction
     * @param {string} triggerred_by    user_id of member who cause the wallet change
     * @param {string} remark           (optional) this is a remark that the user entered for the transaction
     */
    async add(uid, currency, amount, type, description, triggered_by = "", remark)
    {
        let currency     = currency.toLowerCase();
        let allowed_type = ['received', 'issued', 'earned', 'purchased'];
        let add_promise  = [];

        amount = parseFloat(amount);

        if(!remark)
        {
            remark = "No Remarks";
        }

        if(amount <= 0)
        {
            HTTPS_ERROR('failed-precondition', 'Invalid amount has been detected.');
        }
        else if(!allowed_type.includes(type))
        {
            HTTPS_ERROR('failed-precondition', 'Invalid type');
        }
        else if(!this.allowed_currency.includes(currency))
        {
            HTTPS_ERROR('failed-precondition', 'Invalid currency');
        }
        else if(uid === "" || description === "")
        {
            HTTPS_ERROR('failed-precondition', 'Incomplete details');
        }
        else
        {
            let wallet     = await MDB_USER_WALLET.get(uid, currency.toUpperCase());

            let log_detail = {  amount: amount,
                                date_created: new Date(),
                                type: type, description:
                                description,
                                remark: remark,
                                method: "add",
                                triggered_by: triggered_by,
                                balance_before: wallet.wallet,
                                balance_after: wallet.wallet + amount };

            add_promise.push(MDB_USER_WALLET_LOG.add(uid, currency.toUpperCase(), log_detail));
            add_promise.push(MDB_USER_WALLET.adjustWallet(uid, currency.toUpperCase(), amount));

            await Promise.all(add_promise);
        }

        return true;
    },
    async deduct(uid, currency, amount, type, description, triggered_by = "", remark)
    {
        let currency        = currency.toLowerCase();
        let allowed_type    = ['sent', 'upgrade', 'purchased'];
        let deduct_promise  = [];

        amount = parseFloat(amount);

        if(!remark)
        {
            remark = "No Remarks";
        }

        if(amount <= 0)
        {
            HTTPS_ERROR('failed-precondition', 'Invalid amount has been detected.');
        }
        else if(!allowed_type.includes(type))
        {
            HTTPS_ERROR('failed-precondition', 'Invalid type');
        }
        else if(!this.allowed_currency.includes(currency))
        {
            HTTPS_ERROR('failed-precondition', 'Invalid currency');
        }
        else if(uid === "" || description === "")
        {
            HTTPS_ERROR('failed-precondition', 'Incomplete details');
        }
        else
        {
            let wallet     = await MDB_USER_WALLET.get(uid, currency.toUpperCase());

            let log_detail = {  amount: amount,
                                date_created: new Date(),
                                type: type, description:
                                description,
                                remark: remark,
                                method: "add",
                                triggered_by: triggered_by,
                                balance_before: wallet.wallet,
                                balance_after: wallet.wallet - amount };

            deduct_promise.push(MDB_USER_WALLET_LOG.add(uid, currency.toUpperCase(), log_detail));
            deduct_promise.push(MDB_USER_WALLET.adjustWallet(uid, currency.toUpperCase(), amount *-1));

            await Promise.all(deduct_promise);
        }

        return true;
    },
};