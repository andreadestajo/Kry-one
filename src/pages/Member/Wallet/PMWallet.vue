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
	currency_options: ref_currencies,
}
</script>