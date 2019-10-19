<template>
    <div class="wallet">
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
		<q-card>
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
								<div class="actual">0.000000124</div>
								<div class="currency">{{ currency.abb }}</div>
							</div>
							<div class="amount-conversion">
								PHP 1,500.00 <q-icon name="fa fa-exchange-alt"></q-icon> USD 24.30
							</div>
						</div>
					</div>
					<div class="panel-actions">
						<div v-for="action in actionsList(currency.actions)" :key="action.key" class="action">
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
		</q-card>
    </div>
  </div>
    </div>
</template>

<script>
import styles from './PMWallet.scss';
import ref_currencies from '../../../references/refs_currencies';

export default
{
    filters: { },
    data:() =>(
    {
		tab: 'uniq',
    }),
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
		{ key: 'send', label: 'Send', icon: 'fa fa-paper-plane', color: '#4DB6AC', route: '' },
		{ key: 'receive', label: 'Receive', icon: 'fa fa-qrcode', color: '#1277A8', route: '' },
		{ key: 'convert', label: 'Convert', icon: 'fa fa-exchange-alt', color: '#D15400', route: '' },
		{ key: 'history', label: 'History', icon: 'fa fa-history', color: '#ea4848', route: '' },
	],
}
</script>