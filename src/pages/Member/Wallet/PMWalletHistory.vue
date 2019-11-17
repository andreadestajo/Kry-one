<template>
    <div class="wallethistory">
        <k-header detail="Bitcoin wallet transaction history">Transaction History</k-header>
        <k-card class="q-mt-md q-mb-md">
            <div class="wallethistory__list">
                <div v-for="(history, key) in wallet_history" :key="key" class="list">
                    <div v-if="history.mode === 'subtitle'" class="list-subtitle">
                        {{ history.label }}
                    </div>
                    <div v-if="history.mode === 'logs'" class="list-logs">
                        <div class="list-logs-icon">
                            <q-icon :name="getIcon(history.type)" size="30px"></q-icon>
                        </div>
                        <div class="list-logs-description">
                            <div class="detail" v-html="history.description"></div>
                            <div class="remark">{{ history.remark }}</div>
                        </div>
                        <div class="list-logs-value">
                            <div  :class="`amount ${history.method}`">{{ history.amount }} BTC</div>
                            <div class="balance">{{ history.balance_after }}</div>
                            <div class="time">{{ history.time }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </k-card>
    </div>
</template>

<script>
import KHeader from     '../../../components/Member/KHeader';
import KCard from       '../../../components/Member/KCard';
import KField from      '../../../components/Member/KField';
import styles from      './PMWalletHistory.scss';

export default
{
    components: { KHeader, KCard },
    filters: { },
    data:() =>(
    {
        wallet_history:
        [
            { mode: 'subtitle', label: '09/11/2019' },
            { mode: 'logs', type: 'purchased', description: 'You have converted <b>PHP 30.00 ANT to 0.000000300 BTC</b>', remark: 'No Remarks', amount: 0.5427345, balance_after: 0.8427343, time: '06:50 PM', method: 'add' },
            { mode: 'logs', type: 'sent', description: '<b>0.00272576 btc</b> has been issued to your account by <b>Admin Account</b>.', remark: 'No Remarks', amount: 0.2427345, balance_after: 0.1427343, time: '06:50 PM', method: 'add' },
            { mode: 'subtitle', label: '09/10/2019' },
            { mode: 'logs', type: 'purchased', description: 'You have converted <b>PHP 30.00 ANT to 0.000000300 BTC</b>', remark: 'No Remarks', amount: 0.5427345, balance_after: 0.8427343, time: '06:50 PM', method: 'add' },
            { mode: 'logs', type: 'purchased', description: '<b>0.00272576 btc</b> has been issued to your account by <b>Admin Account</b>.', remark: 'No Remarks', amount: 0.2427345, balance_after: 0.1427343, time: '06:50 PM', method: 'add' },
            { mode: 'logs', type: 'issued', description: 'You have converted <b>PHP 30.00 ANT to 0.000000300 BTC</b>', remark: 'No Remarks', amount: 0.5427345, balance_after: 0.8427343, time: '06:50 PM', method: 'deduct' },
            { mode: 'logs', type: 'purchased', description: '<b>0.00272576 btc</b> has been issued to your account by <b>Admin Account</b>.', remark: 'No Remarks', amount: 0.2427345, balance_after: 0.1427343, time: '06:50 PM', method: 'add' },
        ]
    }),
    mounted() {},
    methods: {
        getIcon(type)
        {
            switch (type) {
                case 'sent':
                    return 'fa fa-plane';
                break;
                case 'purchased':
                    return 'fa fa-shopping-cart';
                break;

                case 'issued':
                    return 'fa fa-user-secret';
                break;

                default:
                    return 'fa fa-plane';
                break;
            }
        }
    },
    computed: { }
}
</script>
