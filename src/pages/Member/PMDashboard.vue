<template>
    <div class="dashboard">
        <div class="dashboard__header"></div>

        <!-- NOBILITY -->
        <div class="dashboard__nobility member__card q-mt-md">
            <div class="group">
                <div class="group-label">Your current nobility</div>
                <div class="group-value current">PLEDGER</div>
            </div>
            <div class="group">
                <div class="group-label">Your next target</div>
                <div class="group-value next">KNIGHT</div>
            </div>
            <div class="action">
                <q-btn flat class="action-button"><q-icon name="info"></q-icon> &nbsp; Nobility</q-btn>
                <q-btn flat class="action-button"><q-icon name="fa fa-arrow-up"></q-icon> &nbsp; Accelerate</q-btn>
            </div>
        </div>

        <!-- BITCOIN -->
        <div class="dashboard__wallet member__card q-mt-md">
            <div class="value">0.00000028 BTC</div>
            <div class="conversion">PHP 1,500.00 <q-icon name="fa fa-exchange-alt"></q-icon> USD 24.30 </div>
            <div class="label">Bitcoin Wallet</div>
            <div class="action">
                <q-btn flat class="action-button"><q-icon name="send"></q-icon> &nbsp; Send</q-btn>
                <q-btn flat class="action-button"><q-icon name="fa fa-qrcode"></q-icon> &nbsp; Receive</q-btn>
            </div>
        </div>

        <!-- UNIQ -->
        <div class="dashboard__wallet member__card q-mt-md">
            <div class="value">0.00000028 UNIQ</div>
            <div class="conversion">PHP 1,500.00 <q-icon name="fa fa-exchange-alt"></q-icon> USD 24.30 </div>
            <div class="label">Uniq Wallet</div>
            <div class="action">
                <q-btn flat class="action-button"><q-icon name="send"></q-icon> &nbsp; Send</q-btn>
                <q-btn flat class="action-button"><q-icon name="fa fa-shopping-cart"></q-icon> &nbsp; Buy Uniq</q-btn>
            </div>
        </div>


    </div>
</template>

<script>
import styles from './PMDashboard.scss';

export default
{
    name: "PMDashboard"
}
</script>

<style scoped>

</style>
