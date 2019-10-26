<template>
    <div class="wallet">
        <k-header icon="fa fa-wallet" detail="What would you like to do?">Wallet</k-header>
        <div class="q-pt-md" v-if="ready">
            <div class="q-gutter-y-md">
                <k-card>
                    <q-tabs class="wallet__tabs text-grey" v-model="tab" dense active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                        <q-tab class="tab" v-for="currency in $options.currency_options" :key="currency.key" :name="currency.key" :label="currency.label" />
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels class="wallet__panel" v-model="tab" animated>
                        <q-tab-panel class="panel" v-for="currency in $options.currency_options" :key="currency.key" :name="currency.key">
                            <div class="panel-container">
                                <div class="label">{{ currency.label }}</div>
                                <div class="amount">
                                    <div class="amount-value">
                                        <div class="actual">{{ $_formatNumber(currency.amount || 0, { decimal: currency.decimals }) }}</div>
                                        <div class="currency">{{ currency.abb }}</div>
                                    </div>
                                    <div class="amount-conversion">
                                        {{ $_convertRate(currency.amount, currency.abb, 'PHP') }} <q-icon name="fa fa-exchange-alt"></q-icon>  {{ $_convertRate(currency.amount, currency.abb, 'USD') }}
                                    </div>
                                </div>
                            </div>
                            <div class="panel-actions">
                                <div v-for="action in actionsList(currency.actions)" :key="action.key" class="action" @click="$router.push({ name: action.route, params: { currency: currency.key } })">
                                    <div class="action-icon" :style="`background-color: ${action.color}`">
                                        <q-icon class="icon" :name="action.icon"></q-icon>
                                    </div>
                                    <div class="action-label">
                                        {{ action.label }}
                                    </div>
                                </div>
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </k-card>
            </div>
        </div>
    </div>
</template>

<script>
import KHeader from '../../../components/Member/KHeader';
import KCard from '../../../components/Member/KCard';
import styles from './PMWallet.scss';
import ref_currencies from '../../../references/refs_currencies';

export default
{
    components: { KHeader, KCard },
    filters: { },
    data:() =>(
    {
		tab: 'uniq',
        ready: false,
    }),
    mounted()
    {
        //add random value for now (temporary)
        this.$options.currency_options.forEach((currency) =>
        {  
            currency.amount = Math.floor(Math.random() * 10000000000) / 10000000000;
        });

        this.ready = true;

    },
    methods: 
    {
        actionsList(actions)
        {
            let res = [];

            this.$options.action_options.forEach((action) =>
            {
                if(actions.includes(action.key))
                {
                    res.push(action);
                }
            })

            return res;
        }
    },
	currency_options: ref_currencies,
	action_options:
	[
		{ key: 'send', label: 'Send', icon: 'fa fa-paper-plane', color: '#4DB6AC', route: 'member_send' },
		{ key: 'receive', label: 'Receive', icon: 'fa fa-qrcode', color: '#1277A8', route: 'member_receive' },
		{ key: 'convert', label: 'Convert', icon: 'fa fa-exchange-alt', color: '#D15400', route: 'member_convert' },
		{ key: 'history', label: 'History', icon: 'fa fa-history', color: '#ea4848', route: 'member_history' },
	],
}
</script>