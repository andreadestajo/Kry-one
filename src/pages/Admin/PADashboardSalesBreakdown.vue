<template>
    <div class="q-ma-lg">
        <span class="text-subtitle1">Sales Breakdown</span>
        <k-card class="shadow-1" :content_padding="false">
            <span slot="content">
            <q-list separator>
                <q-item clickable v-for="item in $options.salesBreakdownItems">
                    <q-item-section avatar>
                      <q-icon color="primary" :name="item.icon" />
                    </q-item-section>

                    <q-item-section>{{item.label}}</q-item-section>

                    <q-item-section side>
                        <q-item-label class="text-primary">0.00000003 BTC</q-item-label>
                        <q-item-label>PHP 1,500.00</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </span>
        </k-card>
    </div>
</template>

<script>
    import KCard from '../../components/Admin/KCard'

    export default {
        name: "PADashboardSalesBreakdown",
        components: {KCard},
        salesBreakdownItems: [
            {label: 'Daily Sales'   , icon: 'fas fa-calendar-day'},
            {label: 'Week;y Sales'  , icon: 'far fa-calendar-alt'},
            {label: 'Monthly Sales' , icon: 'calendar_today'},
            {label: 'Annual Sales'  , icon: 'fas fa-calendar'}
        ]
    }
</script>

<style scoped>

</style>
