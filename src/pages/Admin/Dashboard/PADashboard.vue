<template>
    <div class="dashboard" >
        <div class="dashboard__header"></div>

        <pa-dashboard-statistics class="dashboard__statistics"/>

        <div class="row q-ma-md">
            <div class="col-md col-12 q-ma-sm">
                <pa-dashboard-sales-breakdown />
            </div>

            <div class="col-md col-12 q-ma-sm">
                <pa-dashboard-promotions />
            </div>
        </div>
    </div>
</template>

<script>
    import './PADashboard.scss';

    import PaDashboardStatistics     from './PADashboardStatistics'
    import PaDashboardSalesBreakdown from './PADashboardSalesBreakdown'
    import PaDashboardPromotions     from './PADashboardPromotions'

    export default {
        name: "PDashboard",
        components: {
            PaDashboardStatistics,
            PaDashboardSalesBreakdown,
            PaDashboardPromotions
        }
    }
</script>

<style scoped>

</style>
