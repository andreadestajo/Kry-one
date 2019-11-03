<template>
    <q-page class="q-pa-lg">
        <k-header icon="people" detail="Lorem ipsum dolor sit amet">Users</k-header>
        <!--TODO Jln filters here-->

        <k-table :data="usersData" :columns="$options.columns" class="text-center">
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
                <q-td key="email">{{ kyc.data.email }}</q-td>
                <q-td key="nobility">{{ kyc.data.nobility }}</q-td>
                <q-td key="contact_number">{{ kyc.data.contact_number}}</q-td>
                <q-td key="kyc_status">{{ kyc.data.kyc_status}}</q-td>
                <q-td key="action">
                    <q-btn-dropdown unelevated
                                    color="primary"
                                    label="Action">
                        <q-list>
                            <q-item clickable dense
                                    v-close-popup
                                    v-for="action in $options.actions"
                                    :key="action.key"
                                    @click="onClickAction({action, data: kyc.data})">
                                <q-item-section avatar  >
                                    <q-icon color="primary"
                                            size="xs"
                                            :name="action.icon"/>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{action.label}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </q-td>
            </template>
        </k-table>

        <!--MODALS-->
        <pa-users-wallet-modal ref="usersWalletModalRef"/>
    </q-page>
</template>

<script>
    import KHeader             from '../../../components/Admin/KHeader'
    import KTable              from '../../../components/Admin/KTable'
    import PaUsersWalletModal  from './PAUsersWalletModal'

    import DB_USER   from '../../../models/DB_USER'


    export default {
        name: "PAUsers",
        components: {KHeader, KTable, PaUsersWalletModal},
        data: () =>
        ({
            kycSubmits  : [],
            users       : [],
            search_text : '',
            filters     : ['pending', 'approved', 'rejected']
        }),
        computed:
        {
            usersData()
            {
                return this.users.map(u =>
                {
                    return {
                        name           : u.full_name,
                        email          : u.email,
                        nobility       : u.hasOwnProperty('nobility_info') ? u.nobility_info.title : '',
                        contact_number : u.contact_number,
                        kyc_status     : u.kyc_status ? u.kyc_status.toUpperCase() : '',
                        id             : u.id
                    }
                })
            }
        },
        methods:
        {
            viewKycDetails(kyc_data)
            {
                this.$refs.kycDetailsModal.showKycDetailsModal(kyc_data.details)
            },
            onClickAction(item)
            {
                // We currently have 5 actions
                switch (item.action.key)
                {
                    case 'view_wallet':
                        this.$refs.usersWalletModalRef.showUsersWalletModal(item.data);
                        break;
                    case 'edit_user':
                        break;
                    case 'accelerate_user':
                        break;
                    case 'referrals':
                        break;
                    case 'monarchy':
                        break;
                    case 'block_user':
                        break;
                    default:
                        this.$_notify({message: 'Invalid action. Please try again'})
                }
            }
        },
        async mounted()
        {
            await DB_USER.bindAllUsers(this);
        },
        columns:
        [
            { name: 'name'           , label: 'Name'             , field: 'name'           , align: 'center', sortable: true},
            { name: 'email'          , label: 'Email'            , field: 'email'          , align: 'center', sortable: true},
            { name: 'nobility'       , label: 'Nobility'         , field: 'nobility'       , align: 'center', sortable: true},
            { name: 'contact_number' , label: 'Contact Number'   , field: 'contact_number' , align: 'center', sortable: true},
            { name: 'kyc_status'     , label: 'KYC Verification' , field: 'kyc_status'     , align: 'center', sortable: true},
            { name: 'action'         , label: 'Action'           , field: 'action'         , align: 'center', sortable: true},
        ],
        actions:
        [
            { label: 'View Wallet'    , icon: 'far fa-eye'   , key: 'view_wallet'},
            { label: 'Edit'           , icon: 'far fa-edit'  , key: 'edit_user'},
            { label: 'Accelerate User', icon: 'trending_up'  , key: 'accelerate_user'},
            { label: 'Referrals'      , icon: 'people'       , key: 'referrals'},
            { label: 'Monarchy'       , icon: 'fas fa-users' , key: 'monarchy'},
            { label: 'Block User'     , icon: 'fas fa-ban'   , key: 'block_user'},
        ]
    }
</script>

<style scoped>

</style>
