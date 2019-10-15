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
                <q-item>
                    <div class="text-center q-pa-lg">
                        <q-avatar size="100px">
                            <img src="https://cdn.quasar.dev/img/avatar.png">
                        </q-avatar>
                        <p>
                            Admin <br/>
                            admin@kryptoone.com
                        </p>
                    </div>
                </q-item>
                <q-item clickable v-ripple :active="false"
                        v-for="item in $options.navigations"
                        :key="item.label">
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
  export default {
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
        {label: 'Commissions'     , icon: 'mdi-piggy-bank'          , side: '', route: ''},
        {label: 'Monarchy View'   , icon: ''                        , side: '', route: ''},
        {label: 'Logout'          , icon: 'logout'                  , side: '', route: ''},
    ]
  }
</script>
