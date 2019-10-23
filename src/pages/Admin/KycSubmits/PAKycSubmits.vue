<template>
    <div class="q-pa-lg">
        <q-table
            title="KYC Submits"
            :data="kycSubmitsData"
            :columns="$options.columns"
            row-key="name"
            :separator="separator"
        />
    </div>
</template>

<script>
    import KCard               from '../../../components/Admin/KCard'
    import DB_KYC_VERIFICATION from '../../../models/DB_KYC_VERIFICATION'

    import {formatFullname} from "../../../utilities/StringUtils";

    export default {
        name: "PAKycSubmits",
        components: {KCard},
        data: () => ({
            separator   : 'cell',
            kycSubmits  : [],
            data        : []
        }),
        computed: {
            kycSubmitsData()
            {
                return this.kycSubmits.map(k =>
                {
                    return {
                        name  : formatFullname(k.first_name, k.last_name, k.middle_name),
                        date  : this.$_formatDate(k.date_time_submitted.toDate(), 'MMMM DD, YYYY'),
                        time  : this.$_formatDate(k.date_time_submitted.toDate(), 'hh:mm A'),
                        status: k.status
                    }
                })
            }
        },
        columns:
        [
            { name: 'name'    , label: 'Name'           , field: 'name'   , align: 'center', sortable: true},
            { name: 'date'    , label: 'Date Submitted' , field: 'date'   , align: 'center', sortable: true},
            { name: 'time'    , label: 'Time'           , field: 'time'   , align: 'center', sortable: true},
            { name: 'status'  , label: 'Status'         , field: 'status' , align: 'center', sortable: true},
            { name: 'action'  , label: 'Action'         , field: ''         , align: 'center', sortable: true},
        ],
        async mounted()
        {
            await this.$bind('kycSubmits', DB_KYC_VERIFICATION.collection())
            console.log(this.kycSubmits)
        }
    }
</script>

<style scoped>

</style>
