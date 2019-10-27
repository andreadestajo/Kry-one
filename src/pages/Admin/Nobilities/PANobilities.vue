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
        <div class="q-pa-lg">
            <q-table title="Nobilities"
                     :data="nobilitiesData"
                     :columns="$options.columns"
                     row-key="name"
                     :pagination="{rowsPerPage: 0}"
                     hide-bottom>
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td v-for="column in mappedColumns">
                            {{props.row[column]}}
                        </q-td>

                        <q-td key="action">
                            <q-btn unelevated
                                   class="q-ma-xs"
                                   label="EDIT"
                                   type="submit"
                                   color="primary"
                                   @click="showEditNobilityModal(props.row)"></q-btn>
                            <q-btn unelevated
                                   class="q-ma-xs"
                                   label="DELETE"
                                   type="submit"
                                   color="red"
                                   @click="confirmDeleteNobility(props.row)"></q-btn>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </div>

        <!--ADD MODAL-->
        <pa-nobilities-add-modal ref="nobilitiesAddModalRef" />

        <!--EDIT MODAL-->
        <pa-nobilities-edit-modal ref="nobilitiesEditModalRef" />
    </div>
</template>

<script>
    import Nobility              from "../../../models/DB_NOBILITY"
    import PaNobilitiesAddModal  from './PANobilitiesAddModal'
    import PaNobilitiesEditModal from './PANobilitiesEditModal'

    export default {
        name: "PANobilities",
        components: {
            PaNobilitiesAddModal,
            PaNobilitiesEditModal
        },
        data: () =>
        ({
            nobilities: []
        }),
        computed:
        {
            nobilitiesData()
            {
                return this.nobilities
            },
            mappedColumns()
            {
                const mappedColumns = this.$options.columns.map(c => c.field);
                mappedColumns.pop();
                return mappedColumns
            }
        },
        methods:
        {
            showAddNobilityModal()
            {
                this.$refs.nobilitiesAddModalRef.showModal();
            },
            showEditNobilityModal(nobility)
            {
                const nobility_data = Object.assign({id: nobility.id}, nobility);
                this.$refs.nobilitiesEditModalRef.showModal(nobility_data);
            },
            confirmDeleteNobility(nobility)
            {
                const message = "Are you sure you want to delete nobility ?";
                const callback = () => {
                    Nobility.remove(nobility.id)
                };

                this.$_showConfirmDialog(message, callback);
            }
        },
        async mounted()
        {
            // Bind nobilities here
            this.$_showPageLoading();
            await Nobility.bindNobilities(this);
            this.$_hidePageLoading();
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
