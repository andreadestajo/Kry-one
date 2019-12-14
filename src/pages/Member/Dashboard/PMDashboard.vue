<template>
    <div class="dashboard">
        <div class="dashboard__header"></div>

        <!-- NOBILITY -->
        <k-card class="dashboard__nobility q-mt-md">
            <div class="group">
                <div class="group-label">Your current nobility</div>
                <div class="group-value current">
                    <q-spinner v-if="!$_current_user_data.hasOwnProperty('nobility_info')" color="primary" size="1em"/>
                    <span v-if="$_current_user_data.hasOwnProperty('nobility_info')">
                        {{$_current_user_data.nobility_info.title.toUpperCase()}}
                    </span>
                </div>
            </div>
            <div class="group q-pa-sm" v-if="!Object.keys(target_nobility_info).length">
                <q-spinner color="primary" size="2em"/>
            </div>
            <template v-if="Object.keys(target_nobility_info).length" >
                <div class="group">
                    <div class="group-label">Your next target</div>
                    <div class="group-value next">{{target_nobility}}</div>
                </div>
                <div class="detail">
                    <div class="detail-requirements">You need <b>{{ target_nobility_info.required_direct }} {{ target_nobility_info.required_rank_title }}</b><br></div>
                    <div class="detail-target">In order for you to become a <b>{{ target_nobility }}</b></div>
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
             class="dashboard__warning q-mt-md">
            <div class="icon"><q-icon name="warning"></q-icon></div>
            <div class="message">
                <div class="message-title">Please verify your account</div>
                <div class="message-detail">This warning is shown because your account is not yet verified.</div>
            </div>
        </div>


        <!-- NOT YET PLACED -->
        <div v-if="placement_message == true" class="dashboard__warning q-mt-md">
            <div class="message">
                <div class="message-title">You are not yet placed.</div>
                <div class="message-detail">You need to ask your LORD and SPONSOR to place you.</div>
            </div>
        </div>

        <!-- PLACE YOUR DOWNLINE -->
        <div @click="$router.push({ name: 'member_monarchy', query: { tab: 'binary_tree' } })" v-if="this.unplaced_downline.length > 0" class="dashboard__warning q-mt-md">
            <div class="icon"><q-icon name="warning"></q-icon></div>
            <div class="message">
                <div class="message-title">Place your downline!</div>
                <div class="message-detail">There {{ this.unplaced_downline.length == 1 ? 'is' : 'are' }} <b>{{ this.unplaced_downline.length }} {{ this.unplaced_downline.length == 1 ? 'person' : 'people' }}</b> you need to place! Click here in order to place {{ this.unplaced_downline.length == 1 ? 'that' : 'those' }} {{ this.unplaced_downline.length == 1 ? 'downline' : 'downlines' }}.</div>
            </div>
        </div>

        <!--INFO-->
        <div v-if="$_current_user_data.kyc_status === 'pending'"
             class="dashboard__warning q-mt-md"
             style="background-color: #26A69A">
            <div class="icon"><q-icon name="info"></q-icon></div>
            <div class="message">
                <div class="message-title">KYC Verification is being processed.</div>
                <div class="message-detail">KYC Verification is being processed. Your account verification is under review. This process usually takes an average of around 2-3 business days. Thank you for your patience.</div>
            </div>
        </div>

        <!-- BITCOIN -->
        <k-card class="dashboard__wallet member__card q-mt-md">
            <div class="value">{{$_formatNumber($_current_user_wallet.BTC.wallet, {currency: 'BTC'})}}</div>
            <div class="conversion">
                <k-amount-conversion :amount="$_current_user_wallet.BTC.wallet" coin="BTC"/>
            </div>
            <div class="label">Bitcoin Wallet</div>
            <div class="action">
                <q-btn @click="$router.push({ name: 'member_send', params: { currency: 'btc' }})" flat class="action-button"><q-icon name="send"></q-icon> &nbsp; Send</q-btn>
                <q-btn @click="$router.push({ name: 'member_receive', params: { currency: 'btc', address: $_current_user_wallet.BTC.address }})" flat class="action-button"><q-icon name="fa fa-qrcode"></q-icon> &nbsp; Receive</q-btn>
            </div>
        </k-card>

        <!-- UNIQ -->
        <k-card class="dashboard__wallet member__card q-mt-md">
            <div class="value">{{$_formatNumber($_current_user_wallet.XAU.wallet, {currency: 'XAU'})}}</div>
            <div class="conversion">
                <k-amount-conversion :amount="$_current_user_wallet.XAU.wallet" coin="XAU"/>
            </div>
            <div class="label">Uniq Wallet</div>
            <div class="action">
                <q-btn @click="$router.push({ name: 'member_send', params: { currency: 'uniq' }})" flat class="action-button"><q-icon name="send"></q-icon> &nbsp; Send</q-btn>
                <q-btn @click="$router.push({ name: 'member_buy' })" flat class="action-button"><q-icon name="fa fa-shopping-cart"></q-icon> &nbsp; Buy Uniq</q-btn>
            </div>
        </k-card>

        <!-- EARNING BREAKDOWN -->
        <k-card class="dashboard__breakdown member__card q-mt-md">
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
    </div>
</template>

<script>
import './PMDashboard.scss';

import KCard    from '../../../components/Member/KCard';
import DB_NOBILITY      from "../../../models/DB_NOBILITY";
import DB_USER_WALLET   from '../../../models/DB_USER_WALLET';
import DB_USER          from '../../../models/DB_USER';
import DB_USER_EARNING  from '../../../models/DB_USER_EARNING';
import {arrayToObject} from "../../../utilities/ObjectUtils";

export default
{
    name: "PMDashboard",
    components: { KCard },
    data: () =>
    ({
        target_nobility      : '',
        target_nobility_info : {},
        user_wallet          : [],
        user_earning         : null,
        placement_message    : false,
        paid_downline        : [],
        earning_breakdown    : {binary: {total: 0}, direct: {total: 0}, stairstep: {total: 0}}
    }),
    computed:
    {
        unplaced_downline()
        {
            return this.paid_downline.filter(n => !n.hasOwnProperty('placement'));
        }
    },
    methods:
    {
        async initializeData()
        {
            // Get people to place
            this.$bind('paid_downline', DB_USER.collection().where('upline_id', '==', this.$_current_user_data.id).where('nobility_info.rank_order', '>', 1));

            // Get next target nobility
            const nobility = await DB_NOBILITY.getNextTargetNobilityByRankOrder(this.$_current_user_data.nobility_info.rank_order);
            this.target_nobility = nobility ? nobility.title.toUpperCase() : '';
            this.target_nobility_info = nobility ? nobility : {};

            // Bind earnings
            await this.$bind('user_earning', DB_USER_EARNING.collection(this.$_current_user_data.id));
        }
    },
    earning_breakdown:
    [
        { label: 'Direct Referral' , key: 'direct'    , icon: 'fa fa-users'         },
        { label: 'Knight Match'    , key: 'binary'    , icon: 'fa fa-hands-helping' },
        { label: 'Team Override'   , key: 'stairstep' , icon: 'fa fa-layer-group'   },
    ],
    mounted()
    {
        // Check Placement
        if(this.$_current_user_data.nobility_info.rank_order != 1)
        {
            if(!this.$_current_user_data.hasOwnProperty('placement'))
            {
                this.placement_message = true;
            }
        }

        this.initializeData();
    },
    watch:
    {
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

</style>
