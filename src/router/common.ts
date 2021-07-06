import type { RouteConfig } from 'vue-router'
import AppMain from '@/views/common/login/AppMain'

const common: Array<RouteConfig> = [
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
	{ path: '*', redirect: '/404' }
]

export default common
