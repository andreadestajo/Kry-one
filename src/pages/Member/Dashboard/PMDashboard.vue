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
            <div class="action">
                <q-btn @click="$router.push({ name: 'member_nobilities' })" flat class="action-button"><q-icon name="info"></q-icon> &nbsp; Nobility</q-btn>
                <q-btn @click="$router.push({ name: 'member_buy' })" flat class="action-button"><q-icon name="fa fa-arrow-up"></q-icon> &nbsp; Accelerate</q-btn>
            </div>
        </k-card>

        <!-- WARNNING -->
        <div @click="$router.push({ name: 'member_verification' })" class="dashboard__warning q-mt-md">
            <div class="icon"><q-icon name="warning"></q-icon></div>
            <div class="message">
                <div class="message-title">Please verify your account</div>
                <div class="message-detail">This warning is shown because your account is not yet verified.</div>
            </div>
        </div>

        <!-- BITCOIN -->
        <k-card class="dashboard__wallet member__card q-mt-md">
            <div class="value">{{$_formatNumber(btcWallet.BTC.wallet, {currency: 'BTC'})}}</div>
            <div class="conversion">
                PHP {{ $_convertRate(btcWallet.BTC.wallet, 'BTC', 'PHP', { decimal: 2 })}}
                <q-icon name="fa fa-exchange-alt"></q-icon>
                USD {{ $_convertRate(btcWallet.BTC.wallet, 'BTC', 'USD', { decimal: 2 })}}
            </div>            <div class="label">Bitcoin Wallet</div>
            <div class="action">
                <q-btn @click="$router.push({ name: 'member_send', params: { currency: 'btc' }})" flat class="action-button"><q-icon name="send"></q-icon> &nbsp; Send</q-btn>
                <q-btn @click="$router.push({ name: 'member_receive', params: { currency: 'btc' }})" flat class="action-button"><q-icon name="fa fa-qrcode"></q-icon> &nbsp; Receive</q-btn>
            </div>
        </k-card>

        <!-- UNIQ -->
        <k-card class="dashboard__wallet member__card q-mt-md">
            <div class="value">{{$_formatNumber(btcWallet.XAU.wallet, {currency: 'XAU'})}}</div>
            <div class="conversion">
                PHP {{ $_convertRate(btcWallet.XAU.wallet, 'XAU', 'PHP', { decimal: 2 })}}
                <q-icon name="fa fa-exchange-alt"></q-icon>
                USD {{ $_convertRate(btcWallet.XAU.wallet, 'XAU', 'USD', { decimal: 2 })}}
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
                <div v-for="earning in earning_breakdown" :key="earning.label" class="breakdown-list">
                    <div class="breakdown-icon"><q-icon :name="earning.icon"></q-icon></div>
                    <div class="breakdown-label">{{ earning.label }} </div>
                    <div class="breakdown-value">
                        <div class="amount">{{ earning.amount }}</div>
                        <div class="conversion">{{ earning.conversion }}</div>
                    </div>
                </div>  
            </div>
        </k-card>
    </div>
</template>

<script>
import styles   from './PMDashboard.scss';
import KCard    from '../../../components/Member/KCard';

import DB_NOBILITY     from "../../../models/DB_NOBILITY"
import DB_USER_WALLET  from '../../../models/DB_USER_WALLET'
import {arrayToObject} from "../../../utilities/ObjectUtils";

export default
{
    name: "PMDashboard",
    components: { KCard },
    computed:
    {
        btcWallet()
        {
            return !!this.user_wallet.length
                ? arrayToObject(this.user_wallet, 'key')
                : {BTC: {wallet: 0}, XAU: {wallet: 0}}
        }
    },
    data: () =>
    ({
        earning_breakdown:
        [
            { label: 'Direct Referral', icon: 'fa fa-users', amount: '0.0000003 BTC', conversion: 'USD 24.85' },
            { label: 'Knight Match', icon: 'fa fa-hands-helping', amount: '0.0000003 BTC', conversion: 'USD 24.85' },
            { label: 'Team Override', icon: 'fa fa-layer-group', amount: '0.0000003 BTC', conversion: 'USD 24.85' },
        ],
        target_nobility : '',
        user_wallet     : []
    }),
    methods:
    {
        async initializeData()
        {
            // Get next target nobility
            const nobility = await DB_NOBILITY.getNextTargetNobilityByRankOrder(this.$_current_user_data.nobility_info.rank_order);
            this.target_nobility = nobility ? nobility.title.toUpperCase() : '';

            // Get user wallet
            this.user_wallet = await DB_USER_WALLET.getMany(this.$_current_user_data.id);
        }
    },
    mounted()
    {
        this.initializeData();
    }
}
</script>

<style scoped>

</style>
