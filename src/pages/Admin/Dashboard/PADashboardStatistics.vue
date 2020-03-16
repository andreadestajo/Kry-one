<template>
    <div class="row q-ma-md">
        <!--START NUMBER OF USERS-->
        <k-card class="col-md col-12 q-ma-sm">
            <span slot="section">
                <q-icon name="fas fa-users" color="primary" size="2.5em"/>
                <div class="text-center q-pa-sm">
                    <span class="text-h4 text-weight-bold text-primary">
                        {{statistic_data[0].total | formatNumber}}
                    </span>
                    <br/>
                    <span class="text-h6 text-grey-5">
                        Total number of users
                    </span>
                </div>
            </span>
        </k-card>
        <!--END NUMBER OF USERS-->

        <!--START NUMBER OF KYC Verified-->
        <k-card class="col-md col-12 q-ma-sm">
            <span slot="section">
                <q-icon name="verified_user" color="primary" size="2.5em"/>
                <div class="text-center q-pa-sm">
                    <span class="text-h4 text-weight-bold text-primary">
                        {{statistic_data[0].kyc_approved | formatNumber}}
                    </span>
                    <br/>
                    <span class="text-subtitle1 text-grey-5">
                        Total number of KYC verified users
                    </span>
                </div>
            </span>
        </k-card>
        <!--END NUMBER OF KYC Verified-->

        <!--START NUMBER OF KYC Verified-->
        <k-card class="col-md col-12 q-ma-sm">
            <span slot="section">
                <q-icon name="verified_user" color="primary" size="2.5em"/>
                <div class="text-center q-pa-sm">
                    <span class="text-h4 text-weight-bold text-primary">
                        {{statistic_data[0].kyc_rejected | formatNumber}}
                    </span>
                    <br/>
                    <span class="text-subtitle1 text-grey-5">
                        Total number of KYC unverified users
                    </span>
                </div>
            </span>
        </k-card>
        <!--END NUMBER OF KYC Verified-->

        <!--START NUMBER OF KYC Verified-->
        <k-card class="col-md col-12 q-ma-sm">
            <span slot="section">
                <q-icon name="verified_user" color="primary" size="2.5em"/>
                <div class="text-center q-pa-sm">
                    <span class="text-h4 text-weight-bold text-primary">
                        {{statistic_data[0].kyc_pending | formatNumber}}
                    </span>
                    <br/>
                    <span class="text-subtitle1 text-grey-5">
                        Total number of KYC pending users
                    </span>
                </div>
            </span>
        </k-card>
        <!--END NUMBER OF KYC Verified-->
    </div>
</template>

<script>
    import KCard from '../../../components/Admin/KCard';
    import DB_USER_COUNT from '../../../models/DB_USER_COUNT';
    import DB_STATS from '../../../models/DB_STATS';

    export default {
        name: "PADashboardStatistics",
        components: {KCard},
        
        data: () => ({
            statistic_data: []
        }),
        methods: {
            async statistics()
            {
                let stats               = new DB_STATS();
                this.$bind('statistic_data', await stats.getCollection());
            }
        },

        async mounted() {
            this.statistics();
        },

        computed: {
        },

        filters: {
            formatNumber: function(value)
            {
                if(value < 10 && value > 0){
                    return '0' + value;
                }else{
                    return value;
                }
            }
        }
    }
</script>

<style scoped>

</style>
