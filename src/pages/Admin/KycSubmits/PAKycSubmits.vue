<template>
    <div class="q-pa-lg">
        <q-table
            title="Treats"
            :data="data"
            :columns="$options.columns"
            row-key="name"
            :separator="separator"
        />
    </div>
</template>

<script>
    import KCard               from '../../../components/Admin/KCard'
    import DB_KYC_VERIFICATION from '../../../models/DB_KYC_VERIFICATION'

    export default {
        name: "PAKycSubmits",
        components: {KCard},
        data: () => ({
            separator: 'cell',
            kycSubmits: [],
            data: []
        }),
        computed: {

        },
        columns:
        [
            { name: 'name'    , label: 'Name'           , field: '', align: 'center', sortable: true},
            { name: 'date'    , label: 'Date Submitted' , field: '', align: 'center', sortable: true},
            { name: 'time'    , label: 'Time'           , field: '', align: 'center', sortable: true},
            { name: 'status'  , label: 'Status'         , field: '', align: 'center', sortable: true},
            { name: 'action'  , label: 'Action'         , field: '', align: 'center', sortable: true},
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
