<template>
    <q-page class="q-pa-lg">
        <k-header icon="people" detail="Lorem ipsum dolor sit amet">Users</k-header>
        <!--TODO Jln filters here-->

        <k-table ref="kTableRef" :data="users_data" :columns="$options.columns" class="text-center">
            <template slot="table_top">
                <q-input dense class="full-width"
                         placeholder="Search by email"
                         @keyup.enter="searchUser"
                         v-model="search_text">
                    <template v-slot:append>
                        <q-btn flat round color="primary" icon="search" @click="searchUser"/>
                    </template>
                </q-input>
            </template>

            <template slot="table_rows" slot-scope="user">
                <q-td key="name">{{ user.data.name }}</q-td>
                <q-td key="email">{{ user.data.email }}</q-td>
                <q-td key="nobility">{{ user.data.nobility_info.title }}</q-td>
                <q-td key="contact_number">{{ user.data.contact_number}}</q-td>
                <q-td key="kyc_status">{{ user.data.kyc_status}}</q-td>
                <q-td key="action">
                    <q-btn-dropdown unelevated
                                    color="primary"
                                    label="Action">
                        <q-list>
                            <q-item clickable dense
                                    v-close-popup
                                    v-for="action in $options.actions"
                                    :key="action.key"
                                    @click="onClickAction({action, data: user.data})">
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
        <pa-users-accelerate-modal   ref="usersAccelerateModalRef"/>
        <pa-users-issue-wallet-modal ref="usersIssueWalletModal"/>

        <router-view></router-view>
    </q-page>
</template>

<script>
    import KHeader                 from '../../../components/Admin/KHeader'
    import KTable                  from '../../../components/Admin/KTable'

    import PaUsersAccelerateModal  from './PAUsersAccelerateModal'
    import PaUsersIssueWalletModal from './PAUsersIssueWalletModal'

    import DB_USER   from '../../../models/DB_USER'

    export default {
        name: "PAUsers",
        components:
        {
            KHeader,
            KTable,
            PaUsersAccelerateModal,
            PaUsersIssueWalletModal
        },
        data: () =>
        ({
            search_text : '',
            filters     : ['pending', 'approved', 'rejected'],
            users       : [],
            users_data  : []
        }),
        methods:
        {
            onClickAction(item)
            {
                // We currently have 7 actions
                switch (item.action.key)
                {
                    case 'view_wallet':
                        this.$router.push
                        ({
                            name  : 'admin_users_wallet',
                            params: {user_id: item.data.id}
                        });
                        break;
                    case 'issue_wallet':
                        this.$refs.usersIssueWalletModal.showUsersIssueWalletModal(item.data);
                        break;
                    case 'edit_user':
                        this.$router.push
                        ({
                            name  : 'admin_users_edit',
                            params: {user_id: item.data.id}
                        });
                        break;
                    case 'accelerate_user':
                        this.$refs.usersAccelerateModalRef.showUsersAccelerateModal(item.data);
                        break;
                    case 'referrals':
                        this.$router.push
                        ({
                            name  : 'admin_users_referrals',
                            params: {referral_code: item.data.referral_code}
                        });
                        break;
                    case 'monarchy':
                        break;
                    case 'block_user':
                        break;
                    default:
                        this.$_notify({message: 'Invalid action. Please try again'})
                }
            },
            async searchUser()
            {
                this.$refs.kTableRef.showLoading();
                const params = {};

                if(this.search_text)
                {
                    params.search_text = this.search_text.trim()
                }

                await DB_USER.bindAllUsers(this, params);
                this.$refs.kTableRef.hideLoading();
            }
        },
        async mounted()
        {
            this.$refs.kTableRef.showLoading();
            await DB_USER.bindAllUsers(this);
            this.$refs.kTableRef.hideLoading();
        },
        watch:
        {
            users(users)
            {
                const users_data = [];

                users.forEach(u =>
                {
                    users_data.push
                    ({
                        name           : u.full_name,
                        email          : u.email,
                        nobility_info  : u.hasOwnProperty('nobility_info') ? u.nobility_info : {title: ''},
                        contact_number : u.contact_number,
                        kyc_status     : u.kyc_status ? u.kyc_status.toUpperCase() : '',
                        id             : u.id,
                        referral_code  : u.referral_code
                    })
                });

                this.users_data = users_data;
            }
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
            { label: 'View Wallet'    , icon: 'far fa-eye'              , key: 'view_wallet'},
            { label: 'Issue Wallet'   , icon: 'account_balance_wallet'  , key: 'issue_wallet'},
            { label: 'Edit'           , icon: 'far fa-edit'             , key: 'edit_user'},
            //{ label: 'Accelerate User', icon: 'trending_up'             , key: 'accelerate_user'},
            { label: 'Referrals'      , icon: 'people'                  , key: 'referrals'},
            //{ label: 'Monarchy'       , icon: 'fas fa-users'            , key: 'monarchy'},
            //{ label: 'Block User'     , icon: 'fas fa-ban'              , key: 'block_user'},
        ]
    }
</script>

<style scoped>

</style>
