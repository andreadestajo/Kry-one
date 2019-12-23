<template>
    <q-layout class="admin" view="lHh Lpr lFf">
        <!--START HEADER-->
        <q-header>
            <q-toolbar>
                <q-btn flat dense round
                       @click="drawer = !drawer"
                       icon="menu"
                       aria-label="Menu"/>

                <q-toolbar-title class="text-center">
                    KryptoOne™
                </q-toolbar-title>

                <q-btn flat round dense icon="notifications">
                    <q-badge floating color="red" v-if="0">2</q-badge>
                </q-btn>
            </q-toolbar>
        </q-header>
        <!--END HEADER-->

        <!--START DRAWER-->
        <q-drawer  v-model="drawer" show-if-above>
            <q-list class="admin__sidebar" separator>
                <q-item class="profile full-width column no-wrap justify-center items-center content-center q-pa-lg">
                    <span class="profile-avatar q-pa-sm">
                        <q-avatar size="120px">
                            <q-img spinner-size="5px" src="../statics/boy.jpg"></q-img>
                        </q-avatar>
                    </span>
                    <span class="profile-name text-weight-bold">{{$_current_user_data ? $_current_user_data.email : ''}}</span>
                    <span class="profile-email">{{$_current_user_data ? $_current_user_data.full_name : ''}}</span>
                </q-item>

                <div v-for="item in $options.navigations"
                     :key="item.label">
                    <q-item v-if="$options.hasAccessTo(item.access_key)"
                            class="nav" :class="item.route   === $route.name ? 'active' : ''" clickable v-ripple
                            @click="goToRoute(item.route)">
                        <q-item-section avatar>
                            <q-icon class="nav-icon" :name="item.icon" ></q-icon>
                        </q-item-section>
                        <q-item-section class="nav-label">{{ item.label }}</q-item-section>
                        <q-item-section side><!--You can put badge here--></q-item-section>
                    </q-item>
                </div>
            </q-list>
        </q-drawer>

        <!--END DRAWER-->

        <q-page-container>
            <!--START PAGES-->
            <router-view />
            <!--END PAGES-->
        </q-page-container>
    </q-layout>
</template>

<script>
    import './AdminLayout.scss';
    import DB_USER from '../models/DB_USER';
    import {hasAccessTo} from "../globals/AuthenticationHelper";

    export default
    {
        name: 'AdminLayout',
        data: () =>
        ({
            drawer: false
        }),
        methods:
        {
             goToRoute(route)
             {
                 if(route === 'admin_logout')
                 {
                     DB_USER.signOut()
                     .then(() => {
                         this.$router.push({name: 'front_login'})
                     });
                 }
                 else
                 {
                   (route === this.$route.name) ? this.drawer = false : this.$router.push({ name: route });
                 }
             }
        },
        navigations:
        [
            {label: 'Dashboard'       , icon: 'dashboard'               , side: '', access_key: ''                 , route: 'admin_dashboard'},
            {label: 'Users'           , icon: 'people'                  , side: '', access_key: 'users'            , route: 'admin_users'},
            {label: 'Promotions'      , icon: 'people'                  , side: '', access_key: 'promotions'       , route: 'admin_promotions'},
            {label: 'KYC Submits'     , icon: 'verified_user'           , side: '', access_key: 'kyc_submits'      , route: 'admin_kyc_submits'},
            {label: 'Cashout Request' , icon: 'account_balance'         , side: '', access_key: 'cashout_requests' , route: 'admin_cashout_requests'},
            {label: 'Central Wallet'  , icon: 'sync_alt'                , side: '', access_key: 'central_wallet'   , route: 'admin_transfer_requests'},
            {label: 'Commissions'     , icon: 'fas fa-street-view'      , side: '', access_key: 'commissions'      , route: 'admin_commissions'},
            {label: 'Nobilities'      , icon: 'fa fa-crown '            , side: '', access_key: 'nobilities'       , route: 'admin_nobilities' },
            {label: 'Monarchy View'   , icon: 'fas fa-piggy-bank'       , side: '', access_key: 'monarchy_view'    , route: 'admin_monarchy'},
            {label: 'Roles'           , icon: 'people'                  , side: '', access_key: 'role_management'  , route: 'admin_roles'},
            {label: 'Logout'          , icon: 'logout'                  , side: '', access_key: ''                 , route: 'admin_logout'},
        ],
        hasAccessTo
    }
</script>
