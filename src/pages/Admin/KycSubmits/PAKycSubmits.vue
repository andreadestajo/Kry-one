<template>
    <q-page class="q-pa-lg">
        <k-header icon="fa fa-chess-knight" detail="Purchase for your friends">KYC Submits</k-header>
        <!--TODO Jln filters here-->

        <k-table :data="kycSubmitsData" :columns="$options.columns" class="text-center">
            <template slot="table_top_left">
                 <q-input dense
                          placeholder="Search"
                          v-model="search_text">
                    <template v-slot:append>
                        <q-btn flat round color="primary" icon="search" />
                    </template>
                </q-input>
            </template>

            <template slot="table_top_right">
                <q-select dense
                          placeholder="Status"
                          v-model="filters"
                          :options="$options.filter_options"
                          multiple emit-value map-options>
                    <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps"
                                v-on="scope.itemEvents">
                            <q-item-section>
                                <q-item-label v-html="scope.opt.label" ></q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-toggle v-model="filters" :val="scope.opt.value" />
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </template>

            <template slot="table_rows" slot-scope="kyc">
                <q-td key="name">{{ kyc.data.name }}</q-td>
                <q-td key="date">{{ kyc.data.date }}</q-td>
                <q-td key="time">{{ kyc.data.time }}</q-td>
                <q-td key="status">{{ kyc.data.status.toUpperCase() }}</q-td>
                <q-td key="action">
                    <q-btn unelevated
                           label="View"
                           type="submit"
                           color="primary"
                           @click="viewKycDetails(kyc.data)"></q-btn>
                </q-td>
            </template>
        </k-table>

        <pa-kyc-details-modal ref="kycDetailsModal" />
    </q-page>
</template>

<script>
    import KHeader             from '../../../components/Admin/KHeader'
    import KTable              from '../../../components/Admin/KTable'
    import PaKycDetailsModal   from './PAKycDetailsModal'

    import DB_KYC_VERIFICATION from '../../../models/DB_KYC_VERIFICATION'

    import {formatFullname} from "../../../utilities/StringUtils";

    export default {
        name: "PAKycSubmits",
        components: {PaKycDetailsModal, KHeader, KTable},
        data: () =>
        ({
            kycSubmits  : [],

            search_text: '',
            filters: ['pending', 'approved', 'rejected']
        }),
        computed: {
            kycSubmitsData()
            {
                return this.kycSubmits.map(k =>
                {
                    return {
                        name    : formatFullname(k.first_name, k.last_name, k.middle_name),
                        date    : this.$_formatDate(k.date_time_submitted.toDate(), 'MMMM DD, YYYY'),
                        time    : this.$_formatDate(k.date_time_submitted.toDate(), 'hh:mm A'),
                        status  : k.status,
                        details : k
                    }
                })
            }
        },
        methods:
        {
            viewKycDetails(kyc_data)
            {
                this.$refs.kycDetailsModal.showKycDetailsModal(kyc_data.details)
            }
        },
        async mounted()
        {
            DB_KYC_VERIFICATION.bindKycVerifications(this, {name: "kycSubmits"})
        },
        columns:
        [
          { name: 'name'    , label: 'Name'           , field: 'name'   , align: 'center', sortable: true},
          { name: 'date'    , label: 'Date Submitted' , field: 'date'   , align: 'center', sortable: true},
          { name: 'time'    , label: 'Time'           , field: 'time'   , align: 'center', sortable: true},
          { name: 'status'  , label: 'Status'         , field: 'status' , align: 'center', sortable: true},
          { name: 'action'  , label: 'Action'         , field: ''       , align: 'center', sortable: true},
        ],
        filter_options:
        [
            {label: 'Pending'  , value: 'pending'},
            {label: 'Approved' , value: 'approved'},
            {label: 'Rejected' , value: 'rejected'},
        ]
    }
</script>

<style scoped>

</style>
