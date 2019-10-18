
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
		children:
        [
			{ name: 'member_dashboard',     path: '', component: () => import('pages/Member/Dashboard/PMDashboard.vue') },
			{ name: 'member_wallet',        path: 'wallet', component: () => import('pages/Member/Wallet/PMWallet.vue') },
			{ name: 'member_verification',  path: 'verification', component: () => import('pages/Member/Verification/PMVerification.vue') },
			{ name: 'member_send',          path: 'wallet/send', component: () => import('pages/Member/Wallet/PMWalletSend.vue') },
			{ name: 'member_receive',       path: 'wallet/receive', component: () => import('pages/Member/Wallet/PMWalletReceive.vue') },
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
];

if (process.env.MODE !== 'ssr')
{
	routes.push({ path: '*', component: () => import('pages/Error404.vue') })
}

export default routes
