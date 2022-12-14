const MDB_CURRENCY          = require('../models/MDB_CURRENCY');
const MDB_NOBILITY          = require('../models/MDB_NOBILITY');
const MDB_USER              = require('../models/MDB_USER');
const MDB_USER_EARNING      = require('../models/MDB_USER_EARNING');
const MDB_USER_COUNT        = require('../models/MDB_USER_COUNT');
const MDB_USER_MAX          = require('../models/MDB_USER_MAX');
const MDB_USER_NOTIFICATION = require('../models/MDB_USER_NOTIFICATION');
const MDB_PROMOTION         = require('../models/MDB_PROMOTION');
const WALLET                = require('../globals/Wallet');
const FORMAT                = require('../globals/FormatHelper');
const FieldValue            = require("firebase-admin").firestore.FieldValue;
const moment                = require('moment');

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
            return 0;
        }

        let next_nobility           = await MDB_NOBILITY.getNextTargetNobilityByRankOrder(user_info.nobility_info.rank_order);


        if(next_nobility.required_direct > 0)
        {
            let required_nobility_info  = await MDB_NOBILITY.get(next_nobility.required_rank_id);

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
                // filters
                // lower case the filters for search accuracy
                promotions.filters                  = [
                                                        promotions.full_name.toLowerCase(),
                                                        promotions.previous_nobility_title.toLowerCase(),
                                                        promotions.nobility_title.toLowerCase(),
                                                        promotions.created_date.toLowerCase(),
                                                        user_info.email.toLowerCase()
                                                      ]

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

        let promise_list        = [];
        let conversion_rates    = await MDB_CURRENCY.get('XAU');
        let bitcoin_equivalent  = conversion_rates[this.earning_currency] * uniq_amount_purchase;
        let upline_info         = await MDB_USER.get(user_info.upline_id);
        let nobilities          = await MDB_NOBILITY.getMany();

        promise_list.push(MDB_USER_COUNT.addBinaryPointValue(user_info.id, "compute", bitcoin_equivalent));

        if(upline_info)
        {
            await this.unilevelGoToUpline(upline_info, 1, bitcoin_equivalent, promise_list, user_info, { current_percentage: 0, nobilities: nobilities });
        }
        
        await Promise.all(promise_list);
    },
    async unilevelGoToUpline(user_info, level, bitcoin_equivalent, promise_list, user_cause, stairstep)
    {
        let nobility_info           = this.getNobilityByID(stairstep.nobilities, user_info.nobility_id);
        let compute_info            = await MDB_USER_COUNT.get(user_info.id, "compute");
        let update_compute          = {};
        update_compute.group_sale   = FieldValue.increment(bitcoin_equivalent);

        /* DIRECT REFERRAL */
        if(level === 1)
        {
            update_compute.direct_sale = FieldValue.increment(bitcoin_equivalent);
        }

        await MDB_USER_COUNT.update(user_info.id, "compute", update_compute);

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
        }

        let upline_info = await MDB_USER.get(user_info.upline_id);

        /* NOTIFY AS NEW PART OF GROUP */
        let group_description = `<b>${user_cause.full_name}</b> purchased UNIQ worth <b>${FORMAT.numberFormat(bitcoin_equivalent, { decimal: 8, currency: this.earning_currency })}</b> from <b>level ${level}</b> of your group.`;
        promise_list.push(MDB_USER_NOTIFICATION.addNew(user_info.id, group_description, user_cause.photo_url));

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
    async binary(user_info, points)
    {
        let promise_list        = [];
        let upline_info         = await MDB_USER.get(user_info.placement_id);

        await this.binaryGoToUpline(upline_info, 1, points, promise_list, user_info, user_info.placement_position);
        await Promise.all(promise_list);
    },
    async binaryGoToUpline(user_info, level, points, promise_list, user_cause, downline_position)
    {
        let current_date    = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
        let last_update     = moment().tz('Asia/Singapore').format('YYYY-MM-DD hh:mm:ss');
        let max_income      = false;

        await MDB_USER_COUNT.addBinaryPointLeftRight(user_info.id, "compute", downline_position, points);

        let user_count          = await MDB_USER_COUNT.get(user_info.id, "compute");

        if(!user_count)
        {
            user_count.binary_points_left   = 0;
            user_count.binary_points_right  = 0;
        }

        user_info               = await MDB_USER.get(user_info.id);

        let point_deduction     = 0;
        let point_left          = user_count.binary_points_left || 0;
        let point_right         = user_count.binary_points_right || 0;

        //check points that will be deducted in left and right
        if(point_left !== 0 && point_right !== 0)
        {
            if(point_left <= point_right)
            {
                point_deduction = point_left;
            }
            else
            {
                point_deduction = point_right;
            }
        }

        point_deduction = parseFloat(point_deduction.toFixed(8));

        //check if points deduction is not zero
        if(point_deduction !== 0)
        {
            //get current date limit
            let nobility_info   = await MDB_NOBILITY.get(user_info.nobility_id);
            let daily_limit     = await MDB_USER_MAX.get(user_info.id, current_date);

            console.log("current daily limit", daily_limit);

            if(!daily_limit)
            {
                daily_limit     = { knight_match: (point_deduction * 0.1), last_update: last_update };
            }
            else
            {
                daily_limit     = { knight_match: daily_limit.knight_match + (point_deduction * 0.1), last_update: last_update };
            }

            console.log(daily_limit.knight_match, nobility_info.max_income);



            if(daily_limit.knight_match > nobility_info.max_income)
            {
                point_deduction = point_deduction - (daily_limit.knight_match - nobility_info.max_income);
                daily_limit.knight_match = daily_limit.knight_match - (daily_limit.knight_match - nobility_info.max_income);

                console.log(`point_deduction = ${point_deduction} - (${daily_limit.knight_match} - ${nobility_info.max_income});`);
                console.log("max income reached", point_deduction, daily_limit.knight_match);

                //no more earnings if daily limit is maxed out
                if(daily_limit.knight_match === nobility_info.max_income)
                {
                    point_deduction = 0;
                }
                
                //make sure 8 decimal only is saved
                point_deduction = parseFloat(point_deduction.toFixed(8));
                daily_limit.knight_match = parseFloat(daily_limit.knight_match.toFixed(8));

                if(point_deduction < 0)
                {
                    point_deduction = 0;
                }

                if(daily_limit.knight_match < 0)
                {
                    daily_limit.knight_match = 0;
                }

                console.log("You have exceeded the maximum income");
                max_income = true;
            }

            await MDB_USER_MAX.update(user_info.id, current_date, daily_limit);

            if(max_income === true)
            {
                console.log("clearBinaryPointsLeftRight");
                await MDB_USER_COUNT.clearBinaryPointLeftRight(user_info.id, "compute");
            }
            else
            {
                console.log("deductBinaryPointLeftRight", point_deduction);
                await MDB_USER_COUNT.deductBinaryPointLeftRight(user_info.id, "compute", point_deduction);
            }

            if(point_deduction > 0)
            {     
                let binary_amount           = point_deduction * 0.1;
                description                 = `You earned <b>${FORMAT.numberFormat(binary_amount, { decimal: 8, currency: this.earning_currency })}</b> from knight match because <b>${user_cause.full_name}</b> has been placed.`;
                type                        = "earned";

                promise_list.push(WALLET.add(user_info.id, this.earning_currency, binary_amount, type, description, user_cause.id));
                promise_list.push(MDB_USER_EARNING.addEarning(user_info.id, 'binary', binary_amount))
                promise_list.push(MDB_USER_NOTIFICATION.addNew(user_info.id, description, user_cause.photo_url));
            }
        }

        let upline_info = await MDB_USER.get(user_info.placement_id || 0);

        if(upline_info)
        {
            await this.binaryGoToUpline(upline_info, level+1, points, promise_list, user_cause, user_info.placement_position);
        }
    }
};