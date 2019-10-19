import RouteGuard from './route_guards'

const routes = [
	{
		path: '/', component: () => import('layouts/FrontLayout.vue'),
		children:
        [
			{ name: 'front_home',               path: ''               , component: () => import('pages/Front/PFHome.vue') },
			{ name: 'front_login',              path: 'login'          , component: () => import('pages/Front/Login/PFLogin.vue') },
			{ name: 'front_unverified',         path: 'unverified'     , component: () => import('pages/Front/Login/PFUnverifiedUser.vue') },
			{ name: 'front_register',           path: 'register'       , component: () => import('pages/Front/Registration/PFRegistration.vue')},
			{ name: 'front_forgot_password',    path: 'forgotPassword' , component: () => import('pages/Front/PFForgotPassword') }
		]
	},
	
	{
		path: '/member', component: () => import('layouts/MemberLayout.vue'),
        beforeEnter: RouteGuard.beforeEnterMember,
		children:
        [
			{ name: 'member_dashboard',     path: '', component: () => import('pages/Member/Dashboard/PMDashboard.vue') },
			{ name: 'member_wallet',        path: 'wallet', component: () => import('pages/Member/Wallet/PMWallet.vue') },
			{ name: 'member_send',          path: 'wallet/send/:currency', component: () => import('pages/Member/Wallet/PMWalletSend.vue') },
			{ name: 'member_receive',       path: 'wallet/receive/:currency', component: () => import('pages/Member/Wallet/PMWalletReceive.vue') },
			{ name: 'member_history',       path: 'wallet/history/:currency', component: () => import('pages/Member/Wallet/PMWalletHistory.vue') },
			{ name: 'member_convert',       path: 'wallet/convert/:currency', component: () => import('pages/Member/Wallet/PMWalletConvert.vue') },
			{ name: 'member_verification',  path: 'verification', component: () => import('pages/Member/Verification/PMVerification.vue') },
			{ name: 'member_enlist',        path: 'enlist', component: () => import('pages/Member/Enlist/PMEnlist.vue') },
			{ name: 'member_invite',        path: 'invite', component: () => import('pages/Member/Invite/PMInvite.vue') },
			{ name: 'member_nobilities',    path: 'nobilities', component: () => import('pages/Member/Nobilities/PMNobilities.vue') },
			{ name: 'member_cashout',       path: 'cashout', component: () => import('pages/Member/Cashout/PMCashout.vue') },
			{ name: 'member_monarchy',      path: 'monarchy', component: () => import('pages/Member/Monarchy/PMMonarchy.vue') },
		]
	},
	{
		path: '/admin', component: () => import('layouts/AdminLayout.vue'),
		children:
        [
			{ path: '', component: () => import('pages/Admin/PADashboard.vue') }
		]
	},	
	{
		path: '/developer', component: () => import('layouts/DeveloperLayout.vue'),
		children:
        [
			{ path: '', component: () => import('pages/Developer/PDDashboard.vue') }
		]
	},
    {
        path: '/error404', component: () => import('pages/Error404.vue')
    }
];

if (process.env.MODE !== 'ssr')
{
	routes.push({ path: '*', component: () => import('pages/Error404.vue') })
}

export default routes
