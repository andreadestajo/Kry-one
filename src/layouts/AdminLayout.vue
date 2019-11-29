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
                    <q-badge floating color="red">2</q-badge>
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

                <q-item class="nav" :class="item.route === $route.name ? 'active' : ''" clickable v-ripple v-for="item in $options.navigations" @click="goToRoute(item.route)" :key="item.label">
                    <q-item-section avatar>
                        <q-icon class="nav-icon" :name="item.icon" ></q-icon>
                    </q-item-section>
                    <q-item-section class="nav-label">{{ item.label }}</q-item-section>
                    <q-item-section side><!--You can put badge here--></q-item-section>
                </q-item>
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

    export default
    {
        name: 'AdminLayout',
        data: () =>
        ({
            drawer: false
        }),
        methods:
        {
             async goToRoute(route)
             {
                 if(route === 'admin_logout')
                 {
                     await DB_USER.signOut();
                 }
                 else
                 {
                   (route === this.$route.name) ? this.drawer = false : this.$router.push({ name: route });
                 }
             }
        },
        navigations:
        [
            {label: 'Dashboard'       , icon: 'dashboard'               , side: '', route: 'admin_dashboard'},
            {label: 'Users'           , icon: 'people'                  , side: '', route: 'admin_users'},
            {label: 'Promotions'      , icon: 'people'                  , side: '', route: 'admin_promotions'},
            {label: 'KYC Submits'     , icon: 'verified_user'           , side: '', route: 'admin_kyc_submits'},
            {label: 'Cashout Request' , icon: 'account_balance'         , side: '', route: 'admin_cashout_requests'},
            {label: 'Transfer Request', icon: 'sync_alt'                , side: '', route: 'admin_transfer_requests'},
            {label: 'Commissions'     , icon: 'fas fa-street-view'      , side: '', route: 'admin_commissions'},
            {label: 'Nobilities'      , icon: 'fa fa-crown '            , side: '', route: 'admin_nobilities' },
            {label: 'Monarchy View'   , icon: 'fas fa-piggy-bank'       , side: '', route: 'admin_monarchy'},
            {label: 'Logout'          , icon: 'logout'                  , side: '', route: 'admin_logout'},
        ]
    }
</script>
