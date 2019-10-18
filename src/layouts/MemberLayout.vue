<template>
    <q-layout class="member" view="lHh Lpr lFf">
        <!-- HEADER -->
        <q-header>
            <q-toolbar>
                <q-btn flat dense round @click="drawer = !drawer" icon="menu" aria-label="Menu"/>
                <q-toolbar-title class="text-center">
                    KryptoOne™
                </q-toolbar-title>

                <q-btn flat round dense icon="notifications">
                    <!-- <q-badge floating color="red">2</q-badge> -->
                </q-btn>
            </q-toolbar>
        </q-header>

        <!-- DRAWER-->
        <q-drawer v-model="drawer" show-if-above bordered content-class="bg-grey-2">
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

                <q-item class="text-grey-7" clickable v-ripple :active="false" v-for="item in $options.navigations" @click="goToRoute(item.route)" :key="item.label">
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
        drawer: false
    }),
    navigations:
    [
        {label: 'Dashboard'       , icon: 'dashboard'               , side: '', route: 'member_dashboard' },
        {label: 'Wallet'          , icon: 'account_balance_wallet ' , side: '', route: 'member_wallet' },
        {label: 'Logout'          , icon: 'logout'                  , side: '', route: 'logout' },
    ],
    methods:
    {
        goToRoute(route)
        {
            if(route === 'logout')
            {
                this.$router.push({ name: 'front_login' });
            }
            else
            {
                if(route === this.$route.name)
                {
                    this.drawer = false;
                }
                else
                {
                    this.$router.push({ name: route });
                }
                
            }
            
        }
    }
}
</script>
