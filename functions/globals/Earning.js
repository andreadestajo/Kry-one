const MDB_CURRENCY          = require('../models/MDB_CURRENCY');
const MDB_USER              = require('../models/MDB_USER');
const WALLET                = require('../globals/Wallet');
const FORMAT                = require('../globals/FormatHelper');

module.exports =
{
    earning_currency: 'BTC',
    async unilevel(user_info, uniq_amount_purchase)
    {
        let promise_list        = [];
        let conversion_rates    = await MDB_CURRENCY.get('XAU');
        let bitcoin_equivalent  = conversion_rates[this.earning_currency] * uniq_amount_purchase;

        let upline_info = await MDB_USER.get(user_info.upline_id);

        await this.unilevelGoToUpline(upline_info, 1, bitcoin_equivalent, promise_list);
        await Promise.all(promise_list);     
        console.log(bitcoin_equivalent);
    },
    async unilevelGoToUpline(user_info, level, bitcoin_equivalent, promise_list)
    {
        console.log(level, user_info.id);

        if(level === 1)
        {
            /* give user corresponding UNIQ equivalent of purchase */
            description     = `You earned <b>${FORMAT.numberFormat(bitcoin_equivalent, { decimal: 8, currency: this.earning_currency })}<b> from direct referral because ${user_info.full_name} purchased UNIQ.</b>.`;
            type            = "earned";
            promise_list.push(WALLET.add(user_info.id, this.earning_currency, bitcoin_equivalent, type, description, user_info.id));
            console.log(description);
        }

        let upline_info = await MDB_USER.get(user_info.upline_id);

        if(upline_info)
        {
            await this.unilevelGoToUpline(upline_info, level+1, bitcoin_equivalent, promise_list);
        }

        return "done";
    },
    async binary()
    {
    },
};