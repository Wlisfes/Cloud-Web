import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AppMain from '@/views/common/login/AppMain'

Vue.use(VueRouter)

export const routes: RouteConfig[] = [
	/**web**************************************************************************/
	{
		path: '/web/home',
		component: () => import('@/views/web/home/Home')
	},
	/**admin**************************************************************************/
	{
		path: '/admin',
		redirect: '/admin/home',
		component: () => import('@/Layout/admin'),
		children: [
			{
				path: '/admin/home',
				name: 'Home',
				meta: { title: '首页' },
				component: () => import('@/views/admin/setup/Menu')
			}
		]
	},
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
	{ path: '/404', component: () => import('@/views/common/result/404') },
	{ path: '/', redirect: '/web/home' }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
