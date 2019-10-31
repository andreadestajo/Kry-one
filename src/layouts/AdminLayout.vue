<template>
    <q-layout view="lHh Lpr lFf">
        <!--START HEADER-->
        <q-header elevated>
            <q-toolbar>
                <q-btn flat
                dense
                round
                @click="leftDrawerOpen = !leftDrawerOpen"
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
        <q-drawer v-model="leftDrawerOpen"
                  show-if-above
                  bordered
                  content-class="bg-grey-2">
            <q-list bordered separator>
                <q-item class="full-width column no-wrap justify-center items-center content-center q-pa-lg text-grey-7">
                    <span class="q-pa-sm">
                        <q-avatar size="120px">
                            <img src="https://cdn.quasar.dev/img/avatar.png">
                        </q-avatar>
                    </span>
                    <span class="text-weight-bold">ADMIN</span>
                    <span>admin@krypto.com</span>
                </q-item>


                <q-item class="text-grey-7"
                        clickable v-ripple
                        :active="false"
                        v-for="item in $options.navigations"
                        :key="item.label"
                        @click="goToRoute(item.route)">
                    <q-item-section avatar>
                        <q-icon :name="item.icon" ></q-icon>
                    </q-item-section>
                    <q-item-section>{{item.label}}</q-item-section>
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
import DB_USER from '../models/DB_USER';


export default
{
    name: 'AdminLayout',
    data: () =>
    ({
        leftDrawerOpen: false
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
        {label: 'User'            , icon: 'people'                  , side: '', route: 'admin_users'},
        {label: 'Promotions'      , icon: 'people'                  , side: '', route: 'admin_promotions'},
        {label: 'KYC Submits'     , icon: 'verified_user'           , side: '', route: 'admin_kyc_submits'},
        {label: 'Cashout Request' , icon: 'account_balance'         , side: '', route: 'admin_cashout_requests'},
        {label: 'Commissions'     , icon: 'fas fa-street-view'      , side: '', route: 'admin_commissions'},
        {label: 'Nobilities'      , icon: 'fa fa-crown '            , side: '', route: 'admin_nobilities' },
        {label: 'Monarchy View'   , icon: 'fas fa-piggy-bank'       , side: '', route: 'admin_monarchy'},
        {label: 'Logout'          , icon: 'logout'                  , side: '', route: 'admin_logout'},
    ]
}
</script>
