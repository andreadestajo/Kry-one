const MDB_CURRENCY          = require('../models/MDB_CURRENCY');
const MDB_NOBILITY          = require('../models/MDB_NOBILITY');
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
        let upline_info         = await MDB_USER.get(user_info.upline_id);
        let nobilities          = await MDB_NOBILITY.getMany();

        if(upline_info)
        {
            await this.unilevelGoToUpline(upline_info, 1, bitcoin_equivalent, promise_list, user_info, { current_percentage: 0, nobilities: nobilities });
        }
        
        await Promise.all(promise_list);
    },
    async unilevelGoToUpline(user_info, level, bitcoin_equivalent, promise_list, user_cause, stairstep)
    {
        let nobility_info = this.getNobilityByID(stairstep.nobilities, user_info.nobility_id);

        console.log(level, user_info.id, nobility_info.title, nobility_info.override_bonus);

        /* DIRECT REFERRAL */
        if(level === 1)
        {
            
            let direct_referral_amount  = bitcoin_equivalent * 0.01;
            description                 = `You earned <b>${FORMAT.numberFormat(direct_referral_amount, { decimal: 8, currency: this.earning_currency })}</b> from direct referral because <b>${user_info.full_name}</b> purchased UNIQ.</b>.`;
            type                        = "earned";
            console.log(description);
            promise_list.push(WALLET.add(user_info.id, this.earning_currency, direct_referral_amount, type, description, user_cause.id));
        }

        /* STAIRSTEP OVERRIDE */
        if(nobility_info.override_bonus > stairstep.current_percentage)
        {
            let override_bonus          = nobility_info.override_bonus - stairstep.current_percentage;
            let stairstep_amount        = bitcoin_equivalent * (override_bonus / 100);
            description                 = `You earned <b>${override_bonus}% override bonus (${FORMAT.numberFormat(stairstep_amount, { decimal: 8, currency: this.earning_currency })})</b> because <b>${user_info.full_name}</b> purchased UNIQ.</b>.`;
            type                        = "earned";
            console.log(description);
            promise_list.push(WALLET.add(user_info.id, this.earning_currency, stairstep_amount, type, description, user_cause.id));

            stairstep.current_percentage = nobility_info.override_bonus;
        }

        let upline_info = await MDB_USER.get(user_info.upline_id);

        if(upline_info)
        {
            await this.unilevelGoToUpline(upline_info, level+1, bitcoin_equivalent, promise_list, user_cause, stairstep);
        }

        return "done";
    },
    getNobilityByID(nobilities, id)
    {
        let res = null
        nobilities.forEach((data) =>
        {
            if(data.id === id)
            {
                res = data;
            }
        });

        return res;
    },
    async binary()
    {
    },
};