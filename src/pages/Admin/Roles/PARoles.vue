<template>
    <q-page class="q-pa-lg">
        <k-header icon="fa fa-chess-knight" detail="Manipulate admin access">
            <span>Roles</span>
            <!--ADD BUTTON-->
            <span slot="right">
                <q-btn unelevated
                       icon="add"
                       label="New Role"
                       type="submit"
                       color="primary"
                       class="q-mb-sm"
                       @click="showRolesModal"/>

                <q-btn unelevated
                       icon="add"
                       label="New Admin"
                       type="submit"
                       color="primary"
                       class="q-mb-sm q-ml-sm"
                       @click=""/>
            </span>

        </k-header>

        <!--TABLE-->
        <k-table ref="kTableRef" :data="[{}, {}]" :columns="$options.columns" class="text-center">
            <template slot="table_rows" slot-scope="nobilities">
                <q-td>
                    "hey"
                </q-td>

                <q-td key="action">
                    <q-btn unelevated
                           class="q-ma-xs"
                           label="EDIT"
                           type="submit"
                           color="primary"
                           @click=""></q-btn>
                    <q-btn unelevated
                           class="q-ma-xs"
                           label="DELETE"
                           type="submit"
                           color="red"
                           @click=""></q-btn>
                </q-td>
            </template>
        </k-table>

        <!--MODALS-->
        <pa-roles-modal ref="rolesModalRef"></pa-roles-modal>
    </q-page>
</template>

<script>
    import KHeader          from '../../../components/Admin/KHeader'
    import KTable           from '../../../components/Admin/KTable'

    import PaRolesModal     from './PARolesModal'

    export default {
        name: "PANobilities",
        components: {
            KHeader,
            KTable,
            PaRolesModal
        },
        methods: {
            showRolesModal() {
                this.$refs.rolesModalRef.showRolesModal();
            }
        },
        columns:
        [
            { name: 'Role'     , label: 'Role'    , field: 'title'   , align: 'center', sortable: true},
            { name: 'Actions'  , label: 'Actions' , field: 'actions' , align: 'center', sortable: true}
        ]
    }
</script>

<style scoped>

</style>
