
const routes = [
	{
		path: '/', component: () => import('layouts/FrontLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/Front/PFHome.vue') }
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
	}	
];

if (process.env.MODE !== 'ssr')
{
	routes.push({ path: '*', component: () => import('pages/Error404.vue') })
}

export default routes
