<template>
    <q-layout class="member" view="lHh Lpr lFf">
        <!-- HEADER -->
        <q-header>
            <q-toolbar>
                <q-btn flat dense round @click="drawer = !drawer" icon="menu" aria-label="Menu"/>
                <q-toolbar-title v-if="project == 'krypto-one-live'" class="text-center">
                    Krypto.One™
                </q-toolbar-title>

                <q-toolbar-title v-if="project != 'krypto-one-live'" class="text-center">
                    KryptoKnight.Me
                </q-toolbar-title>

                <q-btn @click="$router.push({ name: 'member_notification'})" flat round dense icon="notifications">
                    <q-badge floating color="red" v-if="$_current_user_data.notification_count">
                        {{$_current_user_data.notification_count}}
                    </q-badge>
                </q-btn>
            </q-toolbar>
        </q-header>

        <!-- DRAWER-->
        <q-drawer  v-model="drawer" show-if-above>
            <q-list class="member__sidebar" separator>
                <q-item @click.native="$router.push({name: 'member_profile'})" class="profile full-width column no-wrap justify-center items-center content-center q-pa-lg">
                    <span class="profile-avatar q-pa-sm">
                        <q-avatar size="120px">
                            <q-img spinner-size="5px" :src="$_current_user_data.photo_url ? $_current_user_data.photo_url : '../statics/boy.jpg'"></q-img>
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

        <!-- PAGES -->
        <q-page-container>
            <div class="page-wrapper">
                <router-view />
            </div>
        </q-page-container>
    </q-layout>
</template>

<script>
import styles from './MemberLayout.scss';
import DB_USER from '../models/DB_USER';

export default
{
    name: 'AdminLayout',
    data: () =>
    ({
        drawer : false,
        project : "krypto-one-live",
    }),
    navigations:
    [
        { label: 'Dashboard'       , icon: 'dashboard'               , side: '', route: 'member_dashboard' },
        { label: 'Wallet'          , icon: 'account_balance_wallet ' , side: '', route: 'member_wallet' },
        { label: 'Enlist Knight'   , icon: 'fa fa-chess-knight '     , side: '', route: 'member_enlist' },
        { label: 'Invite Friends'  , icon: 'fa fa-address-book '     , side: '', route: 'member_invite' },
        { label: 'Nobilities'      , icon: 'fa fa-crown '            , side: '', route: 'member_nobilities' },
        { label: 'Monarchy View'   , icon: 'fa fa-sitemap '          , side: '', route: 'member_monarchy' },
        { label: 'Logout'          , icon: 'logout'                  , side: '', route: 'logout' },
    ],
    mounted()
    {
        this.project = env('FIREBASE_PROJECTID');
    },
    methods:
    {
        goToRoute(route)
        {
            if(route === 'logout')
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
    }
}
</script>
