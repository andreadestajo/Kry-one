<template>
    <k-card class="q-ma-lg .shadow-1">
        <span slot="section">
              <q-icon name="fa fa-users" color="primary" size="3em"/>
            <p>This is an admin dashboard!</p>
        </span>
    </k-card>
</template>

<script>
    import KCard from '../../components/Admin/KCard'

    export default {
        name: "PDashboard",
        components: {KCard}
    }
</script>

<style scoped>
    .q-card {
        border-radius: 20px;
    }
</style>
