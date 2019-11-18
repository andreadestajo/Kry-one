<template>
    <div class="wallethistory" ref="scrollTargetRef" >
        <k-header detail="Bitcoin wallet transaction history">Transaction History</k-header>

        <k-card class="q-mt-md q-mb-md">
            <q-infinite-scroll class="wallethistory__list" @load="fetchWalletHistory" :offset="250" :scroll-target="$refs.scrollTargetRef">
                <div v-for="(history, key) in wallet_history_data_po" :key="key" class="list">
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
                </div>                <template v-slot:loading>
                    <div class="row justify-center q-py-sm" style="background-color: #f3f3f3">
                        <q-spinner color="primary" size="20px" />
                    </div>
                </template>
            </q-infinite-scroll>

        </k-card>
    </div>
</template>

<script>
import './PMWalletHistory.scss';

import KHeader  from '../../../components/Member/KHeader';
import KCard    from '../../../components/Member/KCard';

import DB_USER_WALLET_LOG from "../../../models/DB_USER_WALLET_LOG";

export default
{
    components: { KHeader, KCard },
    data:() =>
    ({
        wallet_history_data_po:
        [
            { mode: 'subtitle', label: '09/11/2019' },
            { mode: 'logs', type: 'purchased', description: 'You have converted <b>PHP 30.00 ANT to 0.000000300 BTC</b>', remark: 'No Remarks', amount: 0.5427345, balance_after: 0.8427343, time: '06:50 PM', method: 'add' },
            { mode: 'logs', type: 'sent', description: '<b>0.00272576 btc</b> has been issued to your account by <b>Admin Account</b>.', remark: 'No Remarks', amount: 0.2427345, balance_after: 0.1427343, time: '06:50 PM', method: 'add' },
            { mode: 'subtitle', label: '09/10/2019' },
            { mode: 'logs', type: 'purchased', description: 'You have converted <b>PHP 30.00 ANT to 0.000000300 BTC</b>', remark: 'No Remarks', amount: 0.5427345, balance_after: 0.8427343, time: '06:50 PM', method: 'add' },
            { mode: 'logs', type: 'purchased', description: '<b>0.00272576 btc</b> has been issued to your account by <b>Admin Account</b>.', remark: 'No Remarks', amount: 0.2427345, balance_after: 0.1427343, time: '06:50 PM', method: 'add' },
            { mode: 'logs', type: 'issued', description: 'You have converted <b>PHP 30.00 ANT to 0.000000300 BTC</b>', remark: 'No Remarks', amount: 0.5427345, balance_after: 0.8427343, time: '06:50 PM', method: 'deduct' },
            { mode: 'logs', type: 'purchased', description: '<b>0.00272576 btc</b> has been issued to your account by <b>Admin Account</b>.', remark: 'No Remarks', amount: 0.2427345, balance_after: 0.1427343, time: '06:50 PM', method: 'add' },
        ],
        itemsRef            : [{}, {}, {}, {}, {}],
        wallet_history      : [],
        wallet_history_data : []
    }),
    methods:
    {
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
        },
        async fetchWalletHistory(index, done)
        {
            // Fetch data here
            const currency = this.$route.params.currency === "uniq" ? "xau" : this.$route.params.currency;

            const wallet_history = await DB_USER_WALLET_LOG.getUserWalletLogs(this,
                this.$_current_user_data.id,
                'wallet_history',
                currency,
                {limit: 10}
            );

            // Push to wallet_history
            wallet_history.forEach(history =>
            {
                this.wallet_history.push(history)
            });

            console.log(this.wallet_history);

        }
    },
    async mounted()
    {
        this.fetchWalletHistory()
    },
    watch:
    {
        wallet_history(wallet_history)
        {
            const wallet_history_data = [];

            wallet_history.forEach(history => {
                wallet_history_data.push(history)
            });

            this.wallet_history_data = wallet_history_data;
        }
    }
}
</script>
