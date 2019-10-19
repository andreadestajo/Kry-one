<template>
    <div class="wallet">
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
			<q-tab v-for="currency in $options.currency_options" :key="currency.key" :name="currency.key" :label="currency.label" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
			<q-tab-panel v-for="currency in $options.currency_options" :key="currency.key" :name="currency.key">
				<div class="text-h6">Mails</div>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
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