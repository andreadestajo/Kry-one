<template>
    <div class="q-pa-lg">
        <q-table title="KYC Submits"
                 :data="kycSubmitsData"
                 :columns="$options.columns"
                 row-key="name">
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                    <q-td key="date" :props="props">{{ props.row.date }}</q-td>
                    <q-td key="time" :props="props">{{ props.row.time }}</q-td>
                    <q-td key="status" :props="props">{{ props.row.status }}</q-td>
                    <q-td key="action" :props="props">
                        <q-btn unelevated
                               label="View"
                               type="submit"
                               color="primary"
                               @click="viewKycDetails()"></q-btn>
                    </q-td>
                </q-tr>
            </template>
        </q-table>

        <pa-kyc-details-modal />
    </div>
</template>

<script>
    import PaKycDetailsModal   from './PAKycDetailsModal'
    import DB_KYC_VERIFICATION from '../../../models/DB_KYC_VERIFICATION'

    import {formatFullname} from "../../../utilities/StringUtils";

    export default {
        name: "PAKycSubmits",
        components: {PaKycDetailsModal},
        data: () =>
        ({
            separator   : 'cell',
            kycSubmits  : []
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
        methods:
        {
            viewKycDetails()
            {
                console.log('hey there')
            }
        },
        async mounted()
        {
            DB_KYC_VERIFICATION.bindKycVerifications(this, "kycSubmits")
        },
        columns:
        [
          { name: 'name'    , label: 'Name'           , field: 'name'   , align: 'center', sortable: true},
          { name: 'date'    , label: 'Date Submitted' , field: 'date'   , align: 'center', sortable: true},
          { name: 'time'    , label: 'Time'           , field: 'time'   , align: 'center', sortable: true},
          { name: 'status'  , label: 'Status'         , field: 'status' , align: 'center', sortable: true},
          { name: 'action'  , label: 'Action'         , field: ''        , align: 'center', sortable: true},
        ],
    }
</script>

<style scoped>

</style>
