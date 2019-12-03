<template>
    <q-page class="q-pa-lg">
        <k-header icon="fa fa-chess-knight" detail="Purchase for your friends">
            <span>Nobilities</span>
            <!--ADD BUTTON-->
            <span slot="right">
                <q-btn unelevated
                       icon="add"
                       label="Add New Nobility"
                       type="submit"
                       color="primary"
                       class="q-mb-sm"
                       @click="showAddNobilityModal"/>
            </span>

        </k-header>

        <!--TABLE-->
        <k-table ref="kTableRef" :data="nobilities_data" :columns="$options.columns" class="text-center">
            <template slot="table_rows" slot-scope="nobilities">
                <q-td v-for="column in mappedColumns" :key="column">
                    {{nobilities.data[column]}}
                </q-td>

                <q-td key="action">
                    <q-btn unelevated
                           class="q-ma-xs"
                           label="EDIT"
                           type="submit"
                           color="primary"
                           @click="showEditNobilityModal(nobilities.data)"></q-btn>
                    <q-btn unelevated
                           class="q-ma-xs"
                           label="DELETE"
                           type="submit"
                           color="red"
                           @click="confirmDeleteNobility(nobilities.data)"></q-btn>
                </q-td>
            </template>
        </k-table>

        <!--ADD MODAL-->
        <pa-nobilities-add-modal ref="nobilitiesAddModalRef" />

        <!--EDIT MODAL-->
        <pa-nobilities-edit-modal ref="nobilitiesEditModalRef" />
    </q-page>
</template>

<script>
    import KHeader               from '../../../components/Admin/KHeader'
    import KTable                from '../../../components/Admin/KTable'

    import Nobility              from "../../../models/DB_NOBILITY"
    import PaNobilitiesAddModal  from './PANobilitiesAddModal'
    import PaNobilitiesEditModal from './PANobilitiesEditModal'

    export default {
        name: "PANobilities",
        components: {
            KHeader,
            KTable,
            PaNobilitiesAddModal,
            PaNobilitiesEditModal
        },
        data: () =>
        ({
            nobilities     : [],
            nobilities_data: []
        }),
        computed:
        {
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
            this.$refs.kTableRef.showLoading();
            await Nobility.bindNobilities(this);
        },
        watch:
        {
            nobilities(nobilities)
            {
                if(!nobilities.length) {return 0}

                this.$refs.kTableRef.showLoading();

                const nobilities_data = nobilities.map(n =>
                {
                    n.required_rank = n.hasOwnProperty('required_rank_title') ? n.required_rank_title : '';
                    return n
                });

                this.nobilities_data = nobilities_data;
                this.$refs.kTableRef.hideLoading();
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
            { name: 'badge_color'      , label: 'Color'          , field: 'badge_color'     , align: 'center', sortable: true},
            { name: 'action'           , label: 'Action'         , field: 'action'          , align: 'center', sortable: true},
        ],
    }
</script>

<style scoped>

</style>
