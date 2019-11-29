const MDB_CURRENCY          = require('../models/MDB_CURRENCY');
const MDB_NOBILITY          = require('../models/MDB_NOBILITY');
const MDB_USER              = require('../models/MDB_USER');
const MDB_USER_EARNING      = require('../models/MDB_USER_EARNING');
const MDB_USER_NOTIFICATION = require('../models/MDB_USER_NOTIFICATION');
const MDB_PROMOTION         = require('../models/MDB_PROMOTION');
const WALLET                = require('../globals/Wallet');
const FORMAT                = require('../globals/FormatHelper');

module.exports =
{
    earning_currency: 'BTC',
    async updateRank(user_id)
    {
        let user_info       = MDB_USER.get(user_id);
        let downline_list   = MDB_USER.getDownline(user_id);
        
        await Promise.all([user_info, downline_list]).then((res) =>
        {
            user_info       = res[0];
            downline_list   = res[1];
        });

        if(!user_info)
        {
            console.log("no upline");
            return 0;
        }

        let next_nobility           = await MDB_NOBILITY.getNextTargetNobilityByRankOrder(user_info.nobility_info.rank_order);

        if(next_nobility.required_direct > 0)
        {
            let required_nobility_info  = await MDB_NOBILITY.get(next_nobility.required_rank_id);

            console.log("Target rank is ", next_nobility.title);
            console.log("Need ", next_nobility.required_direct, next_nobility.required_rank_title, required_nobility_info.rank_order)

            let downline_ranks = [];

            downline_list.forEach((downline) =>
            {
                if(downline_ranks[downline.nobility_info.rank_order])
                {
                    downline_ranks[downline.nobility_info.rank_order].count = downline_ranks[downline.nobility_info.rank_order].count + 1;
                }
                else
                {
                    downline_ranks[downline.nobility_info.rank_order]            = {};
                    downline_ranks[downline.nobility_info.rank_order].count      = 1;
                    downline_ranks[downline.nobility_info.rank_order].id         = downline.nobility_id;
                    downline_ranks[downline.nobility_info.rank_order].name       = downline.nobility_info.title;
                    downline_ranks[downline.nobility_info.rank_order].rank_order = downline.nobility_info.rank_order;
                }
            });

            let requirement_count = 0;

            downline_ranks.forEach((rank) =>
            {
               if(rank) 
               {
                   if(rank.rank_order >= required_nobility_info.rank_order)
                   {
                       requirement_count += rank.count;
                   }
               } 
            });

            console.log(`${requirement_count} direct met the requirement out of ${next_nobility.required_direct}.`);

            if(requirement_count >= next_nobility.required_direct)
            {
                let promise_list                    = [];

                /* ready record rank up promotions */
                let promotions                      = {};
                promotions.previous_nobility_id     = user_info.nobility_id;
                promotions.previous_nobility_title  = user_info.nobility_info.title;
                promotions.nobility_id              = next_nobility.id;
                promotions.nobility_title           = next_nobility.title;
                promotions.method                   = "Requirement Met";
                promotions.full_name                = user_info.full_name;
                promotions.user_id                  = user_info.id;
                promotions.payment_method           = "No Payment"
                promotions.amount                   = 0;
                promotions.required_price           = 0;  
                promotions.created_date             = new Date();

                promise_list.push(MDB_PROMOTION.add(promotions));

                /* update rank of user */
                let update_user                     =   {   nobility_id: next_nobility.id,
                                                            nobility_info:  {   badge_color: next_nobility.badge_color,
                                                                                id: next_nobility.id,
                                                                                rank_order: next_nobility.rank_order,
                                                                                title: next_nobility.title }
                                                        };

                promise_list.push(MDB_USER.update(user_info.id, update_user));

                await Promise.all(promise_list);  
                await this.updateRank(user_info.upline_id); //check upline if rank has gone up too
            }
        }


    },
    async unilevel(user_info, uniq_amount_purchase)
    {
        console.log("UNILEVEL METHOD");

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
            description                 = `You earned <b>${FORMAT.numberFormat(direct_referral_amount, { decimal: 8, currency: this.earning_currency })}</b> from direct referral because <b>${user_cause.full_name}</b> purchased UNIQ.`;
            type                        = "earned";
            promise_list.push(WALLET.add(user_info.id, this.earning_currency, direct_referral_amount, type, description, user_cause.id));
            promise_list.push(MDB_USER_EARNING.addEarning(user_info.id, 'direct', direct_referral_amount))
            promise_list.push(MDB_USER_NOTIFICATION.addNew(user_info.id, description, user_cause.photo_url));
            console.log(description);
        }

        /* STAIRSTEP OVERRIDE */
        if(nobility_info.override_bonus > stairstep.current_percentage)
        {
            let override_bonus          = nobility_info.override_bonus - stairstep.current_percentage;
            let stairstep_amount        = bitcoin_equivalent * (override_bonus / 100);
            description                 = `You earned <b>${override_bonus}% override bonus (${FORMAT.numberFormat(stairstep_amount, { decimal: 8, currency: this.earning_currency })})</b> because <b>${user_cause.full_name}</b> purchased UNIQ.`;
            type                        = "earned";
 
            promise_list.push(WALLET.add(user_info.id, this.earning_currency, stairstep_amount, type, description, user_cause.id));
            promise_list.push(MDB_USER_EARNING.addEarning(user_info.id, 'stairstep', stairstep_amount));
            promise_list.push(MDB_USER_NOTIFICATION.addNew(user_info.id, description, user_cause.photo_url));
            stairstep.current_percentage = nobility_info.override_bonus;
            console.log(description);
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