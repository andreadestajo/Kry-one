<template>
    <div class="wallethistory" ref="scrollTargetRef">
        <k-header detail="Bitcoin wallet transaction history">Transaction History</k-header>

        <k-card class="q-mt-md q-mb-md">
            <div v-if="is_history_empty" class="wallethistory__label">
                <span class="list">No transaction history.</span>
            </div>
            <q-infinite-scroll class="wallethistory__list"
                               @load="fetchWalletHistory"
                               ref="historyRef"
                               :scroll-target="$refs.scrollTargetRef">
                <div v-for="(history, key) in wallet_history_data" :key="key" class="list">
                    <div v-if="history.mode === 'subtitle'" class="list-subtitle">
                        {{ history.label }}
                    </div>
                    <div v-if="history.mode === 'logs'" class="list-logs">
                        <div class="list-logs-icon">
                            <q-icon :name="getIcon(history.type)" size="30px"></q-icon>
                        </div>
                        <div class="list-logs-description">
                            <div class="detail" v-html="history.description"></div>
                            <div class="remark" v-html="history.remark"></div>
                        </div>
                        <div class="list-logs-value">
                            <div  :class="`amount ${history.method}`">{{ history.amount }}</div>
                            <div class="balance"><k-amount-conversion :amount="history.amount_raw" :coin="currency_con.toUpperCase()"/></div>
                            <div class="time">({{ history.balance_after }})</div>
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

import moment from 'moment'

export default
{
    components: { KHeader, KCard },
    data:() =>
    ({
        wallet_history_data : [],
        last_history           : null,
        is_history_empty       : false,
        currency_con            : null,
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
            setTimeout(async () => {
                if(this.is_history_empty) {this.$refs.historyRef.stop()}

                // Fetch data here
                const currency = this.currency_con = this.$route.params.currency === "uniq" ? "xau" : this.$route.params.currency;
                const options = {limit: 10}; // default limit is 10 you can modify this one

                // Set start after
                if(this.last_history)
                {
                    options.start_after = this.last_history
                }

                const wallet_history = await DB_USER_WALLET_LOG.getUserWalletLogs(
                    this.$_current_user_data.id,
                    'wallet_history',
                    currency,
                    options
                );

                // Get last document and assign to start_after
                if(wallet_history.length)
                {
                    this.last_history = wallet_history[wallet_history.length - 1];

                    // warning. Change this too if you wanna change the default limit
                    if(wallet_history.length < 10)
                    {
                        this.$refs.historyRef.stop()
                    }
                } else {
                    this.$nextTick(function () {
                        this.$refs.historyRef.stop()
                    });
                }

                // Push to wallet_history
                wallet_history.forEach(history =>
                {
                    const data = history.data();

                    // Append subtitle
                    const last_date = this.wallet_history_data.length ? this.wallet_history_data[this.wallet_history_data.length - 1].date : null;
                    const is_append = !last_date
                        ? true
                        : this.$_formatDate(last_date) !== this.$_formatDate(data.date_created.toDate());

                    if(is_append)
                    {
                        this.wallet_history_data.push({ mode: 'subtitle', label: this.$_formatDate(data.date_created.toDate())})
                    }

                    // Structure data
                    const history_data =
                    {
                        mode          : 'logs',
                        type          : data.type,
                        description   : data.description,
                        remark        : data.remark === "No Remarks" ? '' : data.remark,
                        amount_raw    : data.amount,
                        amount        : this.$_formatNumber(data.amount, {currency: currency.toUpperCase()}),
                        balance_after : this.$_formatNumber(data.balance_after, {currency: currency.toUpperCase()}),
                        time          : moment(data.date_created.toDate()).startOf('hour').fromNow(),
                        date          : data.date_created.toDate(),
                        method        : data.method,
                    };

                    this.wallet_history_data.push(history_data)
                });

                if(!this.wallet_history_data.length)
                {
                    this.is_history_empty = true;
                }

                done()
            }, 1000)
        }
    },
    async mounted()
    {
    }
}
</script>
