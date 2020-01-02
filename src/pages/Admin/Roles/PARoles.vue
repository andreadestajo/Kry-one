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


        <k-card unelevated>
            <template slot="section">

                <div class="q-pb-md">
                    <q-btn-toggle
                        v-model="selected_table"
                        class="my-custom-toggle"
                        no-caps
                        unelevated
                        toggle-color="primary"
                        color="white"
                        text-color="primary"
                        :options="$options.table_options"/>
                </div>

                <!--ROLES TABLE-->
                <k-table ref="kTableRef"  class="text-center"
                         :data="roles_data" :columns="$options.role_columns" v-if="selected_table === 'roles'">
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
                                   size="sm"
                                   @click="showRolesModal(roles.data)"></q-btn>
                            <q-btn unelevated
                                   class="q-ma-xs"
                                   label="DELETE"
                                   type="submit"
                                   color="red"
                                   size="sm"
                                   @click="confirmDeleteRole(roles.data)"></q-btn>
                        </q-td>
                    </template>
                </k-table>

                <!--ADMIN TABLE-->
                <k-table ref="kTableRef"  class="text-center"
                         :data="admins_data" :columns="$options.admin_columns" v-else>
                    <template slot="table_rows" slot-scope="admins">
                        <q-td>
                            {{admins.data.name}}
                        </q-td>

                        <q-td>
                            <span v-for="role in admins.data.roles" :key="role">
                                <q-chip size="10px" :color="chipColor(role)" text-color="white">
                                    {{role}}
                                </q-chip>
                            </span>
                        </q-td>

                        <q-td key="action">
                            <q-btn unelevated
                                   class="q-ma-xs"
                                   label="EDIT"
                                   type="submit"
                                   color="primary"
                                   size="sm"
                                   @click="showAdminsModal(admins.data)"></q-btn>
                            <q-btn unelevated
                                   class="q-ma-xs"
                                   label="Remove as admin"
                                   type="submit"
                                   color="red"
                                   size="sm"
                                   @click="confirmRemoveAdmin(admins.data)"></q-btn>
                        </q-td>
                    </template>
                </k-table>

            </template>
        </k-card>

        <!--MODALS-->
        <pa-roles-modal ref="rolesModalRef"></pa-roles-modal>
        <pa-admins-modal ref="adminsModalRef" :roles_options="roles_data"></pa-admins-modal>
    </q-page>
</template>

<script>
    import KHeader          from '../../../components/Admin/KHeader'
    import KTable           from '../../../components/Admin/KTable'
    import KCard            from '../../../components/Admin/KCard'

    import PaRolesModal     from './PARolesModal'
    import PaAdminsModal    from './PAAdminsModal'
    import DB_ROLE          from '../../../models/DB_ROLE'
    import DB_USER          from '../../../models/DB_USER'
    import {FIELD_VALUE}    from "../../../boot/firebase";

    export default {
        components: {
            KCard,
            KHeader,
            KTable,
            PaRolesModal,
            PaAdminsModal
        },
        data: () => ({
            roles          : [],
            roles_data     : [],
            admins         : [],
            admins_data    : [],
            selected_table : 'roles'
        }),
        methods: {
            showRolesModal(data)
            {
                this.$refs.rolesModalRef.showRolesModal(data);
            },
            showAdminsModal(data)
            {
                this.$refs.adminsModalRef.showAdminsModal(data);
            },
            chipColor(role)
            {
                return role === 'developer' ? 'primary' : ''
            },
            confirmRemoveAdmin(data)
            {
                const message = `Are you sure you want to remove ${data.name} as admin ?`;

                const callback = () => {
                    this.$_showPageLoading();

                    DB_USER.update(data.id,
                    {
                        roles: FIELD_VALUE.delete()
                    })
                    .then(() =>
                    {
                        this.$_notify({message: `Successfully removed an admin.`, mode: "positive"});
                        this.$_hidePageLoading();
                    })
                    .catch(error =>
                    {
                        this.$_notify({message: error.message, mode: "negative"});
                        this.$_hidePageLoading();
                    })
                };

                this.$_showConfirmDialog(message, callback);
            },
            confirmDeleteRole(data)
            {
                const message = `Are you sure you want to delete ${data.role} ?`;

                const callback = async () => {
                    this.$_showPageLoading();

                    const user = await DB_USER.getUsersByRole(data.role, {limit: 1});

                    if(user.hasOwnProperty("error"))
                    {
                        this.$_notify({message: error.message, mode: "negative"});
                        this.$_hidePageLoading();
                        return 0;
                    }

                    if(user.length)
                    {
                        this.$_notify({message: "Unable to delete role. Please make sure that no user is assigned to this role.", mode: "negative"});
                        this.$_hidePageLoading();
                        return 0;
                    }

                    DB_ROLE.remove(data.id)
                    .then(() =>
                    {
                        this.$_notify({message: `Successfully deleted a role.`, mode: "positive"});
                        this.$_hidePageLoading();
                    })
                    .catch(error =>
                    {
                        this.$_notify({message: error.message, mode: "negative"});
                        this.$_hidePageLoading();
                    })
                };

                this.$_showConfirmDialog(message, callback);
            }
        },
        async mounted() {
            // Bind nobilities here
            this.$refs.kTableRef.showLoading();
            await DB_ROLE.bindRoles(this);
            await DB_USER.bindAllAdmins(this);
        },
        watch:
        {
            roles(roles)
            {
                if (!roles.length) {
                    return 0
                }

                this.$refs.kTableRef.showLoading();

                const roles_data = roles
                    .filter(r => r.role !== 'admin' && r.role !== 'developer')
                    .map(n => (
                    {
                        id: n.id,
                        role: n.role,
                        access: n.access
                    }));

                this.roles_data = roles_data;
                this.$refs.kTableRef.hideLoading();
            },
            admins(admins)
            {
                if (!admins.length) {
                    return 0
                }

                this.$refs.kTableRef.showLoading();

                const admins_data = admins.map(n => ({
                    id   : n.id,
                    name : n.full_name,
                    email: n.email,
                    roles: n.roles.filter(r => r !== 'admin')
                }));

                this.admins_data = admins_data;
                this.$refs.kTableRef.hideLoading();
            }
        },
        role_columns:
        [
            {name: 'Role'   , label: 'Role'   , field: 'role'   , align: 'center', sortable: true},
            {name: 'Actions', label: 'Actions', field: 'actions', align: 'center', sortable: true}
        ],
        admin_columns:
        [
            {name: 'name'   , label: 'Name'   , field: 'name'   , align: 'center', sortable: true},
            {name: 'roles'  , label: 'Roles'  , field: 'roles'  , align: 'center', sortable: true},
            {name: 'Actions', label: 'Actions', field: 'actions', align: 'center', sortable: true}
        ],
        table_options:
        [
            {label: 'Roles'  , value: 'roles'},
            {label: 'Admins' , value: 'admins'}
        ]
    }
</script>

<style lang="scss" scoped>
    .my-custom-toggle {
        border: 1px solid $primary
    }
</style>
