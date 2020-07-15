<template>
<div style="background: white; margin-left: 0; height: 80px; box-shadow: 0 4px 1px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
            <q-tabs class="flex-center nav2">
               <q-btn class="q-pa-md" color="primary" icon="dashboard" name="dashboard" stack label="Dashboard" to="/member" flat/>
               <q-btn class="q-pa-md" icon="account_balance_wallet" name="wallet" stack label="wallet" to="/member/wallet" flat/>
               <q-btn class="q-pa-md" icon="fa fa-chess-knight" name="knight" label="Enlist" stack to="/member/enlist" flat/>
               <q-btn class="q-pa-md" icon="fa fa-users" name="invite" label="Invite" stack to="/member/invite" flat/>
               <q-btn class="q-pa-md" icon="fa fa-crown" name="nobility" label="Nobility" stack to="/member/nobilities" flat/>
               <q-btn class="q-pa-md" icon="fa fa-sitemap" name="monarchy" label="Monarchy" stack to="/member/monarchy" flat/>
            </q-tabs>
        </div>
</template>

<script>
	export default
{
    name: 'MemberTabs',
    data: () =>
    ({
    }),
    methods:
    {
        
    }
    
}
</script>
