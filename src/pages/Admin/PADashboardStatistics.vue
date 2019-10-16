<template>
    <div>
        <!--START NUMBER OF USERS-->
        <k-card class="q-ma-lg shadow-1">
            <span slot="section">
                <q-icon name="fas fa-users" color="primary" size="2.5em"/>
                <div class="text-center q-pa-sm">
                    <span class="text-h4 text-weight-bold text-primary">
                        100
                    </span>
                    <br/>
                    <span class="text-h6 text-grey-5">
                        Total number of users
                    </span>
                </div>
            </span>
        </k-card>
        <!--END NUMBER OF USERS-->

        <!--START NUMBER OF USERS-->
        <k-card class="q-ma-lg shadow-1">
            <span slot="section">
                <q-icon name="verified_user" color="primary" size="2.5em"/>
                <div class="text-center q-pa-sm">
                    <span class="text-h4 text-weight-bold text-primary">
                        100
                    </span>
                    <br/>
                    <span class="text-subtitle1 text-grey-5">
                        Total number of KYC verified users
                    </span>
                </div>
            </span>
        </k-card>
        <!--END NUMBER OF USERS-->

    </div>
</template>

<script>
    import KCard from '../../components/Admin/KCard'

    export default {
        name: "PADashboardStatistics",
        components: {KCard}
    }
</script>

<style scoped>

</style>
