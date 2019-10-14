
const routes = [
	{
		path: '/', component: () => import('layouts/FrontLayout.vue'),
		children:
        [
			{ path: ''               , component: () => import('pages/Front/PFHome.vue') },
			{ path: 'login'          , component: () => import('pages/Front/Login/PFLogin.vue') },
			{ path: 'unverified'     , component: () => import('pages/Front/Login/PFUnverifiedUser.vue') },
			{ path: 'register'       , component: () => import('pages/Front/Registration/PFRegistration.vue')},
			{ path: 'forgotPassword' , component: () => import('pages/Front/PFForgotPassword') }
		]
	},
	
	{
		path: '/member', component: () => import('layouts/MemberLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/Member/PMDashboard.vue') }
		]
	},
	{
		path: '/admin', component: () => import('layouts/AdminLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/Admin/PADashboard.vue') }
		]
	},	
	{
		path: '/developer', component: () => import('layouts/DeveloperLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/Developer/PDDashboard.vue') }
		]
	},	
];

if (process.env.MODE !== 'ssr')
{
	routes.push({ path: '*', component: () => import('pages/Error404.vue') })
}

export default routes
