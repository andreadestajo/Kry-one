<template>
    <div class="dashboard">
        <!-- <div class="dashboard__header"></div> -->

        <div class="responsive">

         <!-- BITCOIN -->
        <k-card class="dashboard__wallet member__card q-mt-md" id="responsiveee">
            <div class="value">{{$_formatNumber(checkWallet('BTC'), {currency: 'BTC'})}}</div>
            <div class="conversion">
                <k-amount-conversion :amount="checkWallet('BTC')" coin="BTC"/>
            </div>
            <div class="label">Bitcoin Wallet</div>
            <div class="action">
                <q-btn @click="$router.push({ name: 'member_receive', params: { currency: 'btc', address: $_current_user_wallet.BTC.address }})" flat class="action-button"><q-icon name="fa fa-qrcode"></q-icon> &nbsp; Receive</q-btn>
                <q-btn @click="$router.push({ name: 'member_send', params: { currency: 'btc' }})" flat class="action-button"><q-icon name="send"></q-icon> &nbsp; Send</q-btn>
            </div>
        </k-card>


        <!-- UNIQ -->
        <k-card class="dashboard__wallet  member__card q-mt-md" id="responsiveee">
            <div class="value">{{$_formatNumber(checkWallet('XAU'), {currency: 'XAU'})}}</div>
            <div class="conversion">
                <k-amount-conversion :amount="checkWallet('XAU')" coin="XAU"/>
            </div>
            <div class="label">Uniq Wallet</div>
            <div class="action">
                <q-btn @click="$router.push({ name: 'member_buy' })" flat class="action-button"><q-icon name="fa fa-shopping-cart"></q-icon> &nbsp; Buy Uniq</q-btn>
                <q-btn @click="$router.push({ name: 'member_send', params: { currency: 'uniq' }})" flat class="action-button"><q-icon name="send"></q-icon> &nbsp; Send</q-btn>
            </div>
        </k-card>


         <!-- EARNING BREAKDOWN -->
            <k-card class="dashboard__breakdown  member__card q-mt-md" id="responsiveee">
                <div class="subtitle">Earning Breakdown</div>
                <div class="text-center q-pa-lg" v-if="!earning_breakdown">
                    <q-spinner color="primary" size="2em"/>
                </div>
                <div class="breakdown" v-if="earning_breakdown">
                    <div v-for="earning in $options.earning_breakdown" :key="earning.label" class="breakdown-list">
                        <div class="breakdown-icon"><q-icon :name="earning.icon"></q-icon></div>
                        <div class="breakdown-label">{{ earning.label }} </div>
                        <div class="breakdown-value">
                            <div class="amount">{{ $_formatNumber(earning_breakdown[earning.key].total, {currency: 'BTC'}) }}</div>
                            <div class="conversion">
                                <k-amount-conversion :amount="earning_breakdown[earning.key].total" coin="BTC"/>
                            </div>
                        </div>
                    </div>  
                </div>
            </k-card>


                   <!-- BINARY POINTS -->
        <k-card class="dashboard__breakdown member__card q-mt-md" id="responsiveee">
            <div class="subtitle">Group Status</div>
            <div class="text-center q-pa-lg" v-if="!earning_breakdown">
                <q-spinner color="primary" size="2em"/>
            </div>
            <div class="breakdown" v-if="earning_breakdown">
                <div class="breakdown-list">
                    <div class="breakdown-icon"><q-icon name="fa fa-street-view"></q-icon></div>
                    <div class="breakdown-label">Direct Count </div>
                    <div class="breakdown-value">
                        <div class="amount">{{ compute_options.direct_count }}</div>
                    </div>
                </div>  
            </div>
            <div class="breakdown" v-if="earning_breakdown">
                <div class="breakdown-list">
                    <div class="breakdown-icon"><q-icon name="fa fa-sitemap"></q-icon></div>
                    <div class="breakdown-label">Group Count</div>
                    <div class="breakdown-value">
                        <div class="amount">{{ compute_options.group_count }}</div>
                    </div>
                </div>  
            </div>
            <div class="breakdown" v-if="earning_breakdown">
                <div class="breakdown-list">
                    <div class="breakdown-icon"><q-icon name="fa fa-dollar-sign"></q-icon></div>
                    <div class="breakdown-label">Direct Sale </div>
                    <div class="breakdown-value">
                        <div class="amount">{{ $_formatNumber(compute_options.direct_sale, {currency: 'BTC'}) }}</div>
                        <div class="conversion">
                            <k-amount-conversion :amount="compute_options.direct_sale" coin="BTC"/>
                        </div>
                    </div>
                </div>  
            </div>
            <div class="breakdown" v-if="earning_breakdown">
                <div class="breakdown-list">
                    <div class="breakdown-icon"><q-icon name="fa fa-hand-holding-usd"></q-icon></div>
                    <div class="breakdown-label">Group Sale</div>
                    <div class="breakdown-value">
                        <div class="amount">{{ $_formatNumber(compute_options.group_sale, {currency: 'BTC'}) }}</div>
                        <div class="conversion">
                            <k-amount-conversion :amount="compute_options.group_sale" coin="BTC"/>
                        </div>
                    </div>
                </div>  
            </div>
        </k-card>
        </div>

        <div class="responsivee">
        <!-- NOBILITY -->
        <k-card class="dashboard__nobility" id="nobility">
            <div class="group">
                <div class="group-label">Your current nobility</div>
                <div class="group-value current">
                    <q-spinner v-if="!$_current_user_data.hasOwnProperty('nobility_info')" color="primary" size="1em"/>
                    <span v-if="$_current_user_data.hasOwnProperty('nobility_info')">
                        {{$_current_user_data.nobility_info.title.toUpperCase()}}
                    </span>
                </div>
            </div>
            <div class="group q-pa-sm" v-if="$_current_user_data.nobility_info.rank_order < 12 && !Object.keys(target_nobility_info).length">
                <q-spinner color="primary" size="2em"/>
            </div>
            <template v-if="$_current_user_data.nobility_info.rank_order == 12">
                <div class="group q-pb-lg">
                    <div class="group-label">Congratulations! You reach the highest RANK in NOBILITIES</div>
                </div>
            </template>
            <template v-if="$_current_user_data.nobility_info.rank_order < 12 && Object.keys(target_nobility_info).length" >
                <div class="group">
                    <div class="group-label">Your next target</div>
                    <div class="group-value next">{{target_nobility}}</div>
                </div>
                <div v-if="target_nobility_info.required_direct !== 0" class="detail">
                    <div class="detail-requirements">You need <b>{{ target_nobility_info.required_direct }} {{ target_nobility_info.required_rank_title }}</b><br></div>
                    <div class="detail-target">In order for you to become a <b>{{ target_nobility }}</b></div>
                </div>
                <div v-if="target_nobility_info.required_direct == 0" class="detail">
                    <div class="detail-requirements">The only way to become a pledger is to accelerate.</div>
                </div>
                <div class="action">
                    <q-btn @click="$router.push({ name: 'member_nobilities' })" flat class="action-button"><q-icon name="info"></q-icon> &nbsp; Nobility</q-btn>
                    <q-btn @click="$router.push({ name: 'member_buy' })" flat class="action-button"><q-icon name="fa fa-arrow-up"></q-icon> &nbsp; Accelerate</q-btn>
                </div>
            </template>
        </k-card>

        <!-- WARNING -->
        <div @click="$router.push({ name: 'member_verification' })"
             v-if="!$_current_user_data.kyc_status"
             class="dashboard__warning q-mt-md" style="margin-left: 200px">
            <div class="icon"><q-icon name="warning"></q-icon></div>
            <div class="message">
                <div class="message-title">Please verify your account</div>
                <div class="message-detail">This warning is shown because you have not yet submitted the requirements for verification.</div>
            </div>
        </div>


        <!-- NOT YET PLACED -->
        <div v-if="placement_message == true" class="dashboard__warning q-mt-md" style="margin-left: 200px">
            <div class="message">
                <div class="message-title">You are not yet placed.</div>
                <div class="message-detail">You need to ask your LORD and SPONSOR to place you.</div>
            </div>
        </div>

        <!-- PLACE YOUR DOWNLINE -->
        <div @click="$router.push({ name: 'member_monarchy', query: { tab: 'binary_tree' } })" v-if="this.unplaced_downline.length > 0" class="dashboard__warning q-mt-md" style="margin-left: 200px">
            <div class="icon"><q-icon name="warning"></q-icon></div>
            <div class="message">
                <div class="message-title">Place your knight mate!</div>
                <div class="message-detail">There {{ this.unplaced_downline.length == 1 ? 'is' : 'are' }} <b>{{ this.unplaced_downline.length }} {{ this.unplaced_downline.length == 1 ? 'person' : 'people' }}</b> you need to place! Click here in order to place {{ this.unplaced_downline.length == 1 ? 'that' : 'those' }} {{ this.unplaced_downline.length == 1 ? 'knight mate' : 'knight mates' }}.</div>
            </div>
        </div>

        <!-- IF KYC PENDING -->
        <div @click="$router.push({ name: 'member_verification'})" v-if="$_current_user_data.kyc_status === 'pending'"
             class="dashboard__warning q-mt-md"
             style="background-color: #26A69A; margin-left: 200px">
            <div class="icon"><q-icon name="info"></q-icon></div>
            <div class="message">
                <div class="message-title">KYC Verification is being processed.</div>
                <div class="message-detail">KYC Verification is being processed. Your account verification is under review. This process usually takes an average of around 2-3 business days. Thank you for your patience.</div>
            </div>
        </div>
        
        <!-- IF KYC REJECTED -->
        <div @click="$router.push({ name: 'member_verification'})" v-if="$_current_user_data.kyc_status === 'rejected'"
             class="dashboard__warning q-mt-md"
             style="background-color: #FF7043; margin-left: 200px">
            <div class="icon"><q-icon name="info"></q-icon></div>
            <div class="message">
                <div class="message-title">KYC has been rejected.</div>
                <div class="message-detail">We're sorry! Your KYC Verification has been rejected.</div>
                <div v-if="reason_detail != ''" class="message-detail">{{reason_detail}}</div>
                <div v-if="reason_detail != ''" class="message-detail">
                    <font style="font-weight: bolder">Click here</font> to submit again
                </div>
            </div>
        </div>

        <!-- IF KYC ACCEPTED -->
        <div @click="$router.push({ name: 'member_verification'})" v-if="$_current_user_data.kyc_status === 'accepted'"
             class="dashboard__warning q-mt-md"
             style="background-color: #66BB6A; margin-left: 200px">
            <div class="icon"><q-icon name="info"></q-icon></div>
            <div class="message">
                <div class="message-title">KYC Verification has been accepted.</div>
                <div class="message-detail">Congrats! Your KYC Verification has been accepted.</div>
            </div>
        </div>

          <div class="q-pa-md">
            <q-carousel
                animated
                v-model="slide"
                infinite
                :autoplay="autoplay"
                arrows
                transition-prev="slide-right"
                transition-next="slide-left"
                @mouseenter="autoplay = false"
                @mouseleave="autoplay = true"
                style="margin-left: 170px; 
              
                box-shadow: 3px 3px 3px #e6e6e6;"
                class="carouselll dashboard__breakdown member__card">
                <q-carousel-slide :name="1" img-src="../statics/1.png">
                 <a target="_blank" href="https://bit.ly/get10dollarsofUNIQ"><q-img class="full-height" src="../statics/1.png" /></a>
                </q-carousel-slide>
                <q-carousel-slide :name="2" img-src="../statics/2.jpg">
                <a target="_blank" href="https://bit.ly/get10dollarsofUNIQ"><q-img class="full-height" src="../statics/2.png" /></a>
                </q-carousel-slide>
                <q-carousel-slide :name="3" img-src="../statics/3.jpg">
                <a target="_blank" href="https://bit.ly/get10dollarsofUNIQ"><q-img class="full-height" src="../statics/3.png" /></a>
                </q-carousel-slide>
                <q-carousel-slide :name="4" img-src="../statics/4.jpg">
                <a target="_blank" href="https://bit.ly/get10dollarsofUNIQ"><q-img class="full-height" src="../statics/4.png" /></a>
                </q-carousel-slide>
            </q-carousel>
            </div>


        <!-- BINARY POINTS -->
        <k-card class="dashboard__breakdown member__card q-mt-md" style="margin-left: 185px;">
            <div class="subtitle">Knight Match</div>
            <div class="text-center q-pa-lg" v-if="!earning_breakdown">
                <q-spinner color="primary" size="2em"/>
            </div>
            <div class="breakdown" v-if="earning_breakdown">
                <div class="breakdown-list">
                    <div class="breakdown-icon"><q-icon name="fa fa-caret-left"></q-icon></div>
                    <div class="breakdown-label">Points on Left </div>
                    <div class="breakdown-value">
                        <div class="amount">{{ compute_options.binary_points_left.toFixed(8) }}</div>
                    </div>
                </div>
            </div>
            <div class="breakdown" v-if="earning_breakdown">
                <div class="breakdown-list">
                    <div class="breakdown-icon"><q-icon name="fa fa-caret-right"></q-icon></div>
                    <div class="breakdown-label">Points on Right </div>
                    <div class="breakdown-value">
                        <div class="amount">{{ compute_options.binary_points_right.toFixed(8) }}</div>
                    </div>
                </div>  
            </div>
            <div class="breakdown" v-if="$_current_user_data.nobility_info.rank_order > 1">
                <div v-if="current_nobility" class="breakdown-maxincome">
                    <div class="title">Daily Maximum Knight Match</div>
                    <div class="value"><b>{{ $_formatNumber(current_nobility.max_income, {currency: 'BTC'})  }}</b></div>
                    <div class="value"><k-amount-conversion :amount="current_nobility.max_income" coin="BTC"/></div>

                    <div class="label">Today's Knight Match</div>
                    <div class="value">Daily limit will reset in <b class="primary">{{ remaining_time }}</b></div>
                    <div class="progress">
                        <div :style="`width: ${ max_income.knight_match/current_nobility.max_income*100 }%`" class="progress-bar"></div>
                    </div>
                    <div class="value main"><b>{{ $_formatNumber(max_income.knight_match, {currency: 'BTC'})  }}</b></div>
                    <div class="value"><k-amount-conversion :amount="max_income.knight_match" coin="BTC"/></div>
                </div>
            </div>
        </k-card>
      </div>

    </div>
</template>

<script>
import './PMDashboard.scss';

import KCard                from '../../../components/Member/KCard';
import DB_NOBILITY          from "../../../models/DB_NOBILITY";
import DB_USER_WALLET       from '../../../models/DB_USER_WALLET';
import DB_USER              from '../../../models/DB_USER';
import DB_USER_EARNING      from '../../../models/DB_USER_EARNING';
import DB_USER_COUNT        from '../../../models/DB_USER_COUNT';
import DB_USER_MAX          from '../../../models/DB_USER_MAX';
import DB_KYC_VERIFICATION  from '../../../models/DB_KYC_VERIFICATION';
import { arrayToObject }    from "../../../utilities/ObjectUtils";
import { fbCall }           from "../../../utilities/Callables";
import { FN_GET_TIME }      from "../../../references/refs_functions";

export default
{
    name: "PMDashboard",
    components: { KCard },
    data: () =>
    ({
        current_nobility     : { max_income: 0 },
        target_nobility      : '',
        target_nobility_info : {},
        user_wallet          : [],
        user_earning         : null,
        placement_message    : false,
        paid_downline        : [],
        earning_breakdown    : { binary: { total: 0 }, direct: { total: 0 }, stairstep: { total: 0 } },
        compute_options      : { group_count: 0, direct_count: 0, group_sale: 0, direct_sale: 0, binary_points_left: 0, binary_points_right: 0 },
        group_status         : {},
        max_income           : { knight_match: 0 },
        remaining_seconds    : 0,
        remaining_time       : "CALCULATING",
        interval             : 0,
        project              : "krypto-one-live",
        reason_detail        : '',
         slide               : 1,
      autoplay               : true
    }),
    computed:
    {
        unplaced_downline()
        {
            return this.paid_downline.filter(n => !n.hasOwnProperty('placement'));
        }
    },
    beforeRouteLeave(to, from, next)
    {
        clearInterval(this.interval);
        setTimeout(() =>
        {
            next();
        });
    },
    methods:
    {
        async initializeData()
        {
            this.project = env('FIREBASE_PROJECTID');

            // Get people to place
            this.$bind('current_nobility', DB_NOBILITY.doc(this.$_current_user_data.nobility_id));
            this.$bind('paid_downline', DB_USER.collection().where('upline_id', '==', this.$_current_user_data.id).where('nobility_info.rank_order', '>', 1));
            this.$bind('group_status', DB_USER_COUNT.doc(this.$_current_user_data.id, "compute"));

            // Bind earnings
            this.$bind('user_earning', DB_USER_EARNING.collection(this.$_current_user_data.id));

            // Get next target nobility
            const nobility = await DB_NOBILITY.getNextTargetNobilityByRankOrder(this.$_current_user_data.nobility_info.rank_order);
            this.target_nobility = nobility ? nobility.title.toUpperCase() : '';
            this.target_nobility_info = nobility ? nobility : {};

            // Get Max Income
            let system_time         = await fbCall(FN_GET_TIME);
            const moment            = require('moment');
            let current_date        = moment(system_time.data.time).format('YYYY-MM-DD');
            this.remaining_seconds  = system_time.data.remaining_time; 

            this.interval = setInterval(() =>
            {
                this.remaining_seconds = this.remaining_seconds - 1;
            }, 1000);

            this.$bind('max_income', DB_USER_MAX.doc(this.$_current_user_data.id, current_date));
        },
        checkWallet(currency, prop = "wallet") {
            // returns 0 if wallet is not available yet
            const _default = prop === "wallet" ? 0 : '';

            if(!this.$_current_user_wallet) {return _default}
            if(!this.$_current_user_wallet.hasOwnProperty(currency)) {return _default}

            return this.$_current_user_wallet[currency][prop];
        },
        secToTimer(sec)
        {
            var measuredTime = new Date(null);
            measuredTime.setSeconds(sec); // specify value of SECONDS
            var MHSTime = measuredTime.toISOString().substr(11, 8);

            return MHSTime;
        },
        async getUserKycVerification()
        {
            let user            = {};
            user.kyc_status     = this.$_current_user_data.kyc_status;
            
            if(user.kyc_status == 'rejected')
            {
                user.id                     = this.$_current_user_data.id;

                const kyc_verification      = await DB_KYC_VERIFICATION.get(user.id);
                this.reason_detail          = kyc_verification.reason != "" ? kyc_verification.reason : "";
            }
        }
    },
    earning_breakdown:
    [
        // { label: 'Direct Referral' , key: 'direct'    , icon: 'fa fa-users'         },
        { label: 'Knight Match'    , key: 'binary'    , icon: 'fa fa-hands-helping' },
        { label: 'Team Override'   , key: 'stairstep' , icon: 'fa fa-layer-group'   },
    ],
    mounted()
    {
        // window.location.reload();
        // Check Placement
        if(this.$_current_user_data.nobility_info.rank_order != 1)
        {
            if(!this.$_current_user_data.hasOwnProperty('placement'))
            {
                this.placement_message = true;
            }
        }

        this.initializeData();
        this.getUserKycVerification();
    },
    watch:
    {
        remaining_seconds() {
            
            this.remaining_time = this.secToTimer(this.remaining_seconds);
        }, 
        group_status()
        {
            this.compute_options =  { 
                                        group_count: this.group_status.group_count || 0,
                                        direct_count: this.group_status.direct_count || 0,
                                        group_sale: this.group_status.group_sale || 0,
                                        direct_sale: this.group_status.direct_sale || 0,
                                        binary_points_left: this.group_status.binary_points_left || 0,
                                        binary_points_right: this.group_status.binary_points_right || 0,
                                    };
        },
        user_earning(user_earning)
        {
            const default_data = {binary: {total: 0}, direct: {total: 0}, stairstep: {total: 0}};

            if(!user_earning.length)
            {
                return default_data;
            }

            const earning = {};

            // Get object keys
            user_earning.forEach(e => {
                earning[e.id] = Object.assign(e)
            });

            this.earning_breakdown = Object.assign(default_data, earning)
        },
    }
}
</script>

<style scoped>
        #responsiveee
        {
            width: 50%;
            margin-left: -135px;
        }
        #nobility
        {
            margin-top: -965px; 
            margin-left: 185px;
        }
        @media (min-width: 894px)
        {
            .carouselll
            {
                width: 540px; 
                height: 300px;
            }
        }
            @media (max-width: 895px)
            {
                 .responsive
                {
                    margin-left: 50px;
                }
                .responsivee
                {
                    margin-top: 1000px;
                    margin-left: -280px;
                }
                #responsiveee
                {
                    width: 140%;
                }
                .carouselll
                {
                width: 780px; 
                height: 400px;
                }
            }
            @media (max-width: 819px)
            {
                #responsiveee
                {
                    width: 130%;
                    margin-left: -110px;
                }
                .responsivee
                {
                    width: 130%;
                    margin-left: -240px;
                }
                .carouselll
                {
                width: 690px; 
                height: 400px;
                }
            }
            @media (max-width: 771px)
            {
                 #responsiveee
                {
                    width: 120%;
                    margin-left: -83px;
                }
                .responsivee
                {
                    width: 120%;
                    margin-left: -215px;
                }
                .carouselll
                {
                width: 640px; 
                height: 400px;
                }
            }
             @media (max-width: 689px)
            {
                 #responsiveee
                {
                    width: 110%;
                    margin-left: -54px;
                }
                .responsivee
                {
                    width: 110%;
                    margin-left: -185px;
                }
                .carouselll
                {
                width: 590px; 
                height: 300px;
                }
            }
             @media (max-width: 635px)
            {
                 #responsiveee
                {
                    width: 100%;
                    margin-left: -28px;
                }
                .responsivee
                {
                    width: 100%;
                    margin-left: -160px;
                }
                .carouselll
                {
                width: 540px; 
                height: 300px;
                }
            }
             @media (max-width: 595px)
             {
                 .carouselll
                {
                width: 530px; 
                height: 300px;
                }
             }
             @media (max-width: 580px)
             {
                 .carouselll
                {
                width: 520px; 
                height: 300px;
                }
             }
             @media (max-width: 575px)
             {
                 .carouselll
                {
                width: 510px; 
                height: 300px;
                }
             }
             @media (max-width: 560px)
             {
                 .carouselll
                {
                width: 500px; 
                height: 300px;
                }
             }
             @media (max-width: 547px)
             {
                 .carouselll
                {
                width: 490px; 
                height: 300px;
                }
             }
             @media (max-width: 525px)
             {
                 .carouselll
                {
                width: 470px; 
                height: 260px;
                }
             }
              @media (max-width: 503px)
             {
                 .carouselll
                {
                width: 450px; 
                height: 260px;
                }
             }
             @media (max-width: 487px)
             {
                 .carouselll
                {
                width: 435px; 
                height: 260px;
                }
             }
             @media (max-width: 466px)
             {
                 .carouselll
                {
                width: 415px; 
                height: 260px;
                }
             }
            @media (max-width: 447px)
             {
                 .carouselll
                {
                width: 395px; 
                height: 210px;
                }
             }
             @media (max-width: 426px)
             {
                 .carouselll
                {
                width: 385px; 
                height: 210px;
                }
             }
             @media (max-width: 405px)
             {
                 .carouselll
                {
                width: 365px; 
                height: 210px;
                }
             }
              @media (max-width: 382px)
             {
                 .carouselll
                {
                width: 100%; 
                height: 150px;
                }
             }
             @media (max-width: 413px)
             {
                 .responsivee
                 {
                 margin-left: -170px;
                 }
             }
</style>