<template>
<div style="background: white; margin-left: 0; height: 85px; box-shadow: 0 4px 1px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
            <q-tabs class="flex-center nav2 text-grey-5" mobile-arrows v-model="tab" active-color="black">
              <q-route-tab v-for="item in $options.navigations" class="q-pa-md" :icon="item.icon" :name="item.name" stack :label="item.label" :to="item.to" flat></q-route-tab>
            </q-tabs>
        </div>
</template>

<script>
	export default
{
    name: 'MemberTabs',
    data: () =>
    ({
        tab: 'dashboard',
    }),
    navigations: 
    [
            { label: 'Dashboard'      , name: 'dashboard' , icon: 'dashboard'                   , route: 'member_dashboard', to: '/member' },
            { label: 'Wallet'         , name: 'wallet' , icon: 'account_balance_wallet '        , route: 'member_wallet', to: '/member/wallet' },
            { label: 'Enlist Knight'  , name: 'enlist_knight' , icon: 'fa fa-chess-knight '     , route: 'member_enlist', to: '/member/enlist'},
            { label: 'Invite Friends' , name: 'invite_friends' , icon: 'fa fa-address-book '    , route: 'member_invite', to: '/member/invite'},
            { label: 'Nobilities'     , name: 'nobilities' , icon: 'fa fa-crown '               , route: 'member_nobilities', to: '/member/nobilities' },
            { label: 'Monarchy View'  , name: 'monarchy_view'  , icon: 'fa fa-sitemap '         , route: 'member_monarchy', to: '/member/monarchy' },
    ],
    mounted()
    {
    },
    methods:
    {
         goToRoute(route)
        {
                (route === this.$route.name) ? this.drawer = false : this.$router.push({ name: route });
        }
    }
    
}
</script>
