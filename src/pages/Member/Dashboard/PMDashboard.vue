<template>
    <div class="dashboard">
        <div class="dashboard__header"></div>

        <!-- NOBILITY -->
        <k-card class="dashboard__nobility q-mt-md">
            <div class="group">
                <div class="group-label">Your current nobility</div>
                <div class="group-value current">{{$_current_user_data.nobility_info.title.toUpperCase()}}</div>
            </div>
            <div class="group">
                <div class="group-label">Your next target</div>
                <div class="group-value next">{{target_nobility}}</div>
            </div>
                <div v-if="target_nobility_info" class="detail">
                    <div class="detail-requirements">You need <b>{{ target_nobility_info.required_direct }} {{ target_nobility_info.required_rank_title }}</b><br></div>
                    <div class="detail-target">In order for you to become a <b>{{ target_nobility }}</b></div>
                </div>
            <div class="action">
                <q-btn @click="$router.push({ name: 'member_nobilities' })" flat class="action-button"><q-icon name="info"></q-icon> &nbsp; Nobility</q-btn>
                <q-btn @click="$router.push({ name: 'member_buy' })" flat class="action-button"><q-icon name="fa fa-arrow-up"></q-icon> &nbsp; Accelerate</q-btn>
            </div>
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

        <!--INFO-->
        <div v-if="$_current_user_data.kyc_status === 'pending'"
             class="dashboard__warning q-mt-md"
             style="background-color: #26A69A">
            <div class="icon"><q-icon name="info"></q-icon></div>
            <div class="message">
                <div class="message-title">KYC Verification is being processed.</div>
                <div class="message-detail">Your account verification is under confirmation, this usually takes around 2-3 business days. Thank you for your patience..</div>
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
                <q-btn @click="$router.push({ name: 'member_receive', params: { currency: 'btc', address: userWallet.BTC.address }})" flat class="action-button"><q-icon name="fa fa-qrcode"></q-icon> &nbsp; Receive</q-btn>
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
            <div class="breakdown">
                <div v-for="earning in $options.earning_breakdown" :key="earning.label" class="breakdown-list">
                    <div class="breakdown-icon"><q-icon :name="earning.icon"></q-icon></div>
                    <div class="breakdown-label">{{ earning.label }} </div>
                    <div class="breakdown-value">
                        <div class="amount">{{ $_formatNumber(userEarning[earning.key].total || 0, {currency: 'BTC'}) }}</div>
                        <div class="conversion">
                            <k-amount-conversion :amount="userEarning[earning.key].total" coin="BTC"/>
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

import DB_NOBILITY      from "../../../models/DB_NOBILITY"
import DB_USER_WALLET   from '../../../models/DB_USER_WALLET'
import DB_USER_EARNING  from '../../../models/DB_USER_EARNING'

import {arrayToObject} from "../../../utilities/ObjectUtils";

export default
{
    name: "PMDashboard",
    components: { KCard },
    data: () =>
    ({
        target_nobility : '',
        target_nobility_info : {},
        user_wallet     : [],
        user_earning    : []
    }),
    computed:
    {
        userEarning()
        {
            return !!this.user_earning.length
                ? arrayToObject(this.user_earning, 'id')
                : {binary: {amount: 0}, direct: {amount: 0}, stairstep: {amount: 0}}
        }
    },
    methods:
    {
        async initializeData()
        {
            // Get next target nobility
            const nobility = await DB_NOBILITY.getNextTargetNobilityByRankOrder(this.$_current_user_data.nobility_info.rank_order);
            this.target_nobility = nobility ? nobility.title.toUpperCase() : '';
            this.target_nobility_info = nobility ? nobility : {};

            // Get earnings breakdown TODO should I bind this one ?
            this.user_earning = await DB_USER_EARNING.getMany(this.$_current_user_data.id);
        }
    },
    earning_breakdown:
    [
        { label: 'Direct Referral' , key: 'binary'    , icon: 'fa fa-users'         },
        { label: 'Knight Match'    , key: 'direct'    , icon: 'fa fa-hands-helping' },
        { label: 'Team Override'   , key: 'stairstep' , icon: 'fa fa-layer-group'   },
    ],
    mounted()
    {
        this.initializeData();
    }
}
</script>

<style scoped>

</style>
