<template>
    <div class="dashboard">
        <div class="dashboard__header"></div>

        <!-- NOBILITY -->
        <k-card class="dashboard__nobility q-mt-md">
            <div class="group">
                <div class="group-label">Your current nobility</div>
                <div class="group-value current">PLEDGER</div>
            </div>
            <div class="group">
                <div class="group-label">Your next target</div>
                <div class="group-value next">KNIGHT</div>
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
            <div class="value">0.00000028 BTC</div>
            <div class="conversion">PHP 1,500.00 <q-icon name="fa fa-exchange-alt"></q-icon> USD 24.30 </div>
            <div class="label">Bitcoin Wallet</div>
            <div class="action">
                <q-btn flat class="action-button"><q-icon name="send"></q-icon> &nbsp; Send</q-btn>
                <q-btn flat class="action-button"><q-icon name="fa fa-qrcode"></q-icon> &nbsp; Receive</q-btn>
            </div>
        </k-card>

        <!-- UNIQ -->
        <k-card class="dashboard__wallet member__card q-mt-md">
            <div class="value">0.00000028 UNIQ</div>
            <div class="conversion">PHP 1,500.00 <q-icon name="fa fa-exchange-alt"></q-icon> USD 24.30 </div>
            <div class="label">Uniq Wallet</div>
            <div class="action">
                <q-btn flat class="action-button"><q-icon name="send"></q-icon> &nbsp; Send</q-btn>
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
import styles from './PMDashboard.scss';
import KCard from '../../../components/Member/KCard';

export default
{
    name: "PMDashboard",
    components: { KCard },
    data: () =>
    ({
        earning_breakdown:
        [
            { label: 'Direct Referral', icon: 'fa fa-users', amount: '0.0000003 BTC', conversion: 'USD 24.85' },
            { label: 'Knight Match', icon: 'fa fa-hands-helping', amount: '0.0000003 BTC', conversion: 'USD 24.85' },
            { label: 'Team Override', icon: 'fa fa-layer-group', amount: '0.0000003 BTC', conversion: 'USD 24.85' },
        ],
    }),
}
</script>

<style scoped>

</style>
