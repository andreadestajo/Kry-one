<template>
    <div>
        <!--ADD BUTTON-->
        <div class="q-pa-lg">
            <q-btn unelevated
                   label="Add New Nobility"
                   type="submit"
                   color="primary"
                   class="q-mt-sm"
                   @click="showAddNobilityModal"/>
        </div>

        <!--TABLE-->
        <q-table title="Nobilities"
                 :data="nobilitiesData"
                 :columns="$options.columns"
                 row-key="name">
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="name">{{ props.row.name }}</q-td>
                    <q-td key="date">{{ props.row.date }}</q-td>
                    <q-td key="time">{{ props.row.time }}</q-td>
                    <q-td key="status">{{ props.row.status }}</q-td>
                    <q-td key="action">
                        <q-btn unelevated
                               label="View"
                               type="submit"
                               color="primary"
                               @click="viewKycDetails(props.row)"></q-btn>
                    </q-td>
                </q-tr>
            </template>
        </q-table>

        <!--ADD MODAL-->
        <pa-nobilities-add-modal ref="nobilitiesAddModalRef" />
    </div>
</template>

<script>
    import PaNobilitiesAddModal from './PANobilitiesAddModal'

    export default {
        name: "PANobilities",
        components: {PaNobilitiesAddModal},
        methods:
        {
            showAddNobilityModal()
            {
                this.$refs.nobilitiesAddModalRef.showModal();
            }
        },
        columns:
        [
            { name: 'title'            , label: 'Title'          , field: 'title'           , align: 'center', sortable: true},
            { name: 'price'            , label: 'Price'          , field: 'price'           , align: 'center', sortable: true},
            { name: 'rank_order'       , label: 'Rank Order'     , field: 'rank_order'      , align: 'center', sortable: true},
            { name: 'required_direct'  , label: 'Direct'         , field: 'required_direct' , align: 'center', sortable: true},
            { name: 'required_rank'    , label: 'Rank'           , field: 'required_rank'   , align: 'center', sortable: true},
            { name: 'override_bonus'   , label: 'Bonus'          , field: 'override_bonus'  , align: 'center', sortable: true},
            { name: 'perks'            , label: 'Perks'          , field: 'perks'           , align: 'center', sortable: true},
            { name: 'details'          , label: 'Details'        , field: 'details'         , align: 'center', sortable: true},
            { name: 'badge_color'      , label: 'Color'          , field: 'badge_color'     , align: 'center', sortable: true},
            { name: 'action'           , label: 'Action'         , field: 'action'          , align: 'center', sortable: true},
        ],
    }
</script>

<style scoped>

</style>
