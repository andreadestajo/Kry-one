<template>
    <q-layout class="member" view="lHh Lpr lFf">
        <!-- HEADER -->
        <q-header>
            <q-toolbar>
                <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" aria-label="Menu"/>
                <q-toolbar-title class="text-center">
                    KryptoOne™
                </q-toolbar-title>

                <q-btn flat round dense icon="notifications">
                    <!-- <q-badge floating color="red">2</q-badge> -->
                </q-btn>
            </q-toolbar>
        </q-header>

        <!-- DRAWER-->
        <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
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

                <q-item class="text-grey-7" clickable v-ripple :active="false" v-for="item in $options.navigations" :key="item.label">
                    <q-item-section avatar>
                        <q-icon :name="item.icon" ></q-icon>
                    </q-item-section>
                    <q-item-section>{{item.label}}</q-item-section>
                    <q-item-section side><!--You can put badge here--></q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <!-- PAGES -->
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import styles from './MemberLayout.scss';

export default
{
    name: 'AdminLayout',
    data: () =>
    ({
        leftDrawerOpen: false
    }),
    navigations:
    [
        {label: 'Dashboard'       , icon: 'dashboard'               , side: '', route: ''},
        {label: 'Wallet'          , icon: 'account_balance_wallet ' , side: '', route: ''},
        {label: 'User'            , icon: 'people'                  , side: '', route: ''},
        {label: 'KYC Submits'     , icon: 'verified_user'           , side: '', route: ''},
        {label: 'Cashout Request' , icon: 'account_balance'         , side: '', route: ''},
        {label: 'Commissions'     , icon: 'fas fa-street-view'      , side: '', route: ''},
        {label: 'Monarchy View'   , icon: 'fas fa-piggy-bank'       , side: '', route: ''},
        {label: 'Logout'          , icon: 'logout'                  , side: '', route: ''},
    ]
}
</script>
