<template>
    <div>
        <pa-dashboard-statistics />
        <pa-dashboard-sales-breakdown />
    </div>
</template>

<script>
    import PaDashboardStatistics     from './PADashboardStatistics'
    import PaDashboardSalesBreakdown from './PADashboardSalesBreakdown'

    export default {
        name: "PDashboard",
        components: {
            PaDashboardStatistics,
            PaDashboardSalesBreakdown
        }
    }
</script>

<style scoped>

</style>
