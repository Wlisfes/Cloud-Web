import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AppMain from '@/views/common/login/AppMain'
import Layout from '@/Layout/admin'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
	/**web**************************************************************************/
	{
		path: '/web/home',
		component: () => import('@/views/web/home/Home')
	},
	/**admin**************************************************************************/
	{
		path: '/admin',
		redirect: '/admin/home',
		component: Layout,
		children: [
			{
				path: '/admin/home',
				name: 'Home',
				meta: { title: '首页' },
				component: () => import('@/views/admin/home/Home')
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
	{ path: '/', redirect: '/web/home' },
	{ path: '*', redirect: '/404' }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
