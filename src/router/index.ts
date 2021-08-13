import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AppMain from '@/views/common/login/AppMain'

Vue.use(VueRouter)

export const routes: RouteConfig[] = [
	/**web**************************************************************************/
	{
		path: '/',
		name: 'WEB-Home',
		component: () => import('@/views/web/home/Home')
	},
	{
		path: '/multiple',
		name: 'WEB-Multiple',
		component: () => import('@/views/web/multiple/Multiple')
	},
	{
		path: '/intense',
		name: 'WEB-Intense',
		component: () => import('@/views/web/intense/Intense')
	},
	{
		path: '/minute',
		name: 'WEB-Minute',
		component: () => import('@/views/web/minute/Minute')
	},
	{
		path: '/partner',
		name: 'WEB-Partner',
		component: () => import('@/views/web/partner/Partner')
	},
	/**admin**************************************************************************/
	// {
	// 	path: '/admin',
	// 	redirect: '/admin/home',
	// 	component: () => import('@/Layout/admin'),
	// 	children: [
	// 		{
	// 			path: '/admin/home',
	// 			name: 'Home',
	// 			meta: { title: '首页' },
	// 			component: () => import('@/views/admin/setup/Menu')
	// 		}
	// 	]
	// },
	/**common**************************************************************************/
	{
		path: '/main',
		redirect: '/main/login',
		component: AppMain,
		children: [
			{
				path: '/main/login',
				name: 'Login',
				component: () => import('@/views/common/login/Login')
			},
			{
				path: '/main/register',
				name: 'Register',
				component: () => import('@/views/common/login/Register')
			}
		]
	},
	{ path: '/404', component: () => import('@/views/common/result/404') }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
