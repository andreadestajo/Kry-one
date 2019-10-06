
const routes = [
	{
		path: '/', component: () => import('layouts/MyLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/Index.vue') }
		]
	},
	
	{
		path: '/member', component: () => import('layouts/MyLayout.vue'),
		children: [
			{ path: 'dashboard', component: () => import('pages/Index.vue') }
		]
	},
	{
		path: '/admin', component: () => import('layouts/MyLayout.vue'),
		children: [
			{ path: 'dashboard', component: () => import('pages/Index.vue') }
		]
	}	
]

if (process.env.MODE !== 'ssr')
{
	routes.push({ path: '*', component: () => import('pages/Error404.vue') })
}

export default routes
