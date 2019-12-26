import RouteGuard             from './route_guards'

const routes = [
	{
		path: '/', component: () => import('layouts/FrontLayout.vue'),
		children:
        [
			{ name: 'front_home',               path: ''               , beforeEnter: RouteGuard.beforeEnterLogin, component: () => import('pages/Front/Login/PFLogin.vue') },
			{ name: 'front_login',              path: 'login'          , beforeEnter: RouteGuard.beforeEnterLogin, component: () => import('pages/Front/Login/PFLogin.vue') },
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
			{ name: 'member_dashboard',      path: '', component: () => import('pages/Member/Dashboard/PMDashboard.vue') },
			{ name: 'member_wallet',         path: 'wallet', component: () => import('pages/Member/Wallet/PMWallet.vue') },
			{ name: 'member_send',           path: 'wallet/send/:currency',    component: () => import('pages/Member/Wallet/PMWalletSend.vue') },
			{ name: 'member_receive',        path: 'wallet/receive/:currency', component: () => import('pages/Member/Wallet/PMWalletReceive.vue') },
			{ name: 'member_history',        path: 'wallet/history/:currency', component: () => import('pages/Member/Wallet/PMWalletHistory.vue') },
			{ name: 'member_convert',        path: 'wallet/convert/:currency', component: () => import('pages/Member/Wallet/PMWalletConvert.vue') },
			{ name: 'member_verification',   path: 'verification',   component: () => import('pages/Member/Verification/PMVerification.vue') },
			{ name: 'member_enlist',         path: 'enlist',         component: () => import('pages/Member/Enlist/PMEnlist.vue') },
			{ name: 'member_enlist_pending', path: 'enlist/pending', component: () => import('pages/Member/Enlist/PMEnlistPending.vue') },
			{ name: 'member_invite',         path: 'invite',         component: () => import('pages/Member/Invite/PMInvite.vue') },
			{ name: 'member_nobilities',     path: 'nobilities',    component: () => import('pages/Member/Nobilities/PMNobilities.vue') },
			{ name: 'member_cashout',        path: 'cashout',       component: () => import('pages/Member/Cashout/PMCashout.vue') },
			{ name: 'member_monarchy',       path: 'monarchy',      component: () => import('pages/Member/Monarchy/PMMonarchy.vue') },
			{ name: 'member_buy',            path: 'buy',           component: () => import('pages/Member/Buy/PMBuy.vue') },
			{ name: 'member_notification',   path: 'notification',  component: () => import('pages/Member/Notification/PMNotification.vue') },
			{ name: 'member_profile',        path: 'profile',       component: () => import('pages/Member/Profile/PMProfile.vue') },
		]
	},
	{
		path: '/admin', component: () => import('layouts/AdminLayout.vue'),
        beforeEnter: RouteGuard.beforeEnterAdmin,
		children:
        [
			{ name: 'admin_dashboard'        , path: ''                , component: () => import('pages/Admin/Dashboard/PADashboard.vue') },
			{ name: 'admin_promotions'       , path: 'promotions'      , beforeEnter: RouteGuard.beforeEnterAdminPage("promotions")       , component: () => import('pages/Admin/Promotions/PAPromotions.vue') },
			{ name: 'admin_kyc_submits'      , path: 'kycsubmits'      , beforeEnter: RouteGuard.beforeEnterAdminPage("kyc_submits")      , component: () => import('pages/Admin/KycSubmits/PAKycSubmits.vue') },
			{ name: 'admin_cashout_requests' , path: 'cashoutrequests' , beforeEnter: RouteGuard.beforeEnterAdminPage("cashout_requests") , component: () => import('pages/Admin/CashoutRequests/PACashoutRequests.vue') },
			{ name: 'admin_transfer_requests', path: 'transferrequests', beforeEnter: RouteGuard.beforeEnterAdminPage("central_wallet")   , component: () => import('pages/Admin/TransferRequests/PATransferRequests.vue') },
			{ name: 'admin_commissions'      , path: 'commissions'     , beforeEnter: RouteGuard.beforeEnterAdminPage("commissions")      , component: () => import('pages/Admin/Commissions/PACommissions.vue') },
			{ name: 'admin_nobilities'       , path: 'nobilities'      , beforeEnter: RouteGuard.beforeEnterAdminPage("nobilities")       , component: () => import('pages/Admin/Nobilities/PANobilities.vue') },
            {
                name     : 'admin_logs',
                path     : 'logs',
                component: () => import('pages/Admin/Logs/PALogs.vue')
            },
			{ name: 'admin_roles'            , path: 'roles'        , beforeEnter: RouteGuard.beforeEnterAdminPage("role_management"), component: () => import('pages/Admin/Roles/PARoles.vue') },
			{ name: 'admin_monarchy'         , path: 'monarchy'     , beforeEnter: RouteGuard.beforeEnterAdminPage("monarchy_view"  ), component: () => import('pages/Admin/Monarchy/PAMonarchy.vue') },
            {
                name: 'admin_users',
                path: 'users',
                beforeEnter: RouteGuard.beforeEnterAdminPage("users"),
                component: () => import('pages/Admin/Users/PAUsers.vue'),
                children:
                [
                    { name: 'admin_users_referrals' , path: 'referrals/:referral_code' , component: () => import('pages/Admin/Users/PAUsersReferralsModal.vue')},
                    { name: 'admin_users_wallet'    , path: 'wallet/:user_id'          , component: () => import('pages/Admin/Users/PAUsersWalletModal.vue')},
                    { name: 'admin_users_edit'      , path: 'edit/:user_id'            , component: () => import('pages/Admin/Users/PAUsersEditModal.vue')}
                ]
            }
        ]
	},	
	{
		path: '/developer', component: () => import('layouts/DeveloperLayout.vue'),
		children:
        [
			{ name: 'developer_dashboard' , path: '', component: () => import('pages/Developer/PDDashboard.vue') },
			{ name: 'developer_dashboard2', path: 'dash2', component: () => import('pages/Developer/PDDashboard2.vue') }
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
