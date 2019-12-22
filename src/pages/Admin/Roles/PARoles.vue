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
                       @click="showRolesModal()"/>

                <q-btn unelevated
                       icon="add"
                       label="New Admin"
                       type="submit"
                       color="primary"
                       class="q-mb-sm q-ml-sm"
                       @click="showAdminsModal()"/>
            </span>

        </k-header>

        <!--TABLE-->
        <k-table ref="kTableRef" :data="roles_data" :columns="$options.columns" class="text-center">
            <template slot="table_rows" slot-scope="roles">
                <q-td>
                    {{roles.data.role}}
                </q-td>

                <q-td key="action">
                    <q-btn unelevated
                           class="q-ma-xs"
                           label="EDIT"
                           type="submit"
                           color="primary"
                           @click="showRolesModal(roles.data)"></q-btn>
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
        <pa-admins-modal ref="adminsModalRef"></pa-admins-modal>
    </q-page>
</template>

<script>
    import KHeader          from '../../../components/Admin/KHeader'
    import KTable           from '../../../components/Admin/KTable'

    import PaRolesModal     from './PARolesModal'
    import PaAdminsModal    from './PAAdminsModal'
    import DB_ROLE          from '../../../models/DB_ROLE'

    export default {
        name: "PANobilities",
        components: {
            KHeader,
            KTable,
            PaRolesModal,
            PaAdminsModal
        },
        data: () => ({
           roles      : [],
           roles_data : [],
        }),
        methods: {
            showRolesModal(data) {
                this.$refs.rolesModalRef.showRolesModal(data);
            },
            showAdminsModal(data) {
                this.$refs.adminsModalRef.showAdminsModal(data);
            }
        },
        async mounted()
        {
            // Bind nobilities here
            this.$refs.kTableRef.showLoading();
            await DB_ROLE.bindRoles(this);
            console.log(this.roles);
        },
        watch:
        {
            roles(roles)
            {
                if(!roles.length) {return 0}

                this.$refs.kTableRef.showLoading();

                const roles_data = roles.map(n => ({
                    id     : n.id,
                    role   : n.role,
                    access : n.access
                }));

                this.roles_data = roles_data;
                this.$refs.kTableRef.hideLoading();
            }
        },
        columns:
        [
            { name: 'Role'     , label: 'Role'    , field: 'role'   , align: 'center', sortable: true},
            { name: 'Actions'  , label: 'Actions' , field: 'actions' , align: 'center', sortable: true}
        ]
    }
</script>

<style scoped>

</style>
