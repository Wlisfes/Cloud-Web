import type { RouteConfig } from 'vue-router'
import Layout from '@/Layout/admin'

const admin: Array<RouteConfig> = [
	{
		path: '/admin',
		redirect: '/admin/home',
		component: Layout,
		children: [
			{
				path: '/admin/home',
				name: 'Home',
				meta: { title: '首页', affix: true },
				component: () => import('@/views/admin/home/Home')
			}
		]
	},
	{
		path: '/admin/user',
		redirect: '/admin/user/list',
		component: Layout,
		children: [
			{
				path: '/admin/user/list',
				name: 'User-list',
				meta: { title: 'User', affix: true },
				component: () => import('@/views/admin/user/User')
			},
			{
				path: '/admin/user/role',
				name: 'User-role',
				meta: { title: 'Role', affix: true },
				component: () => import('@/views/admin/user/Role')
			},
			{
				path: '/admin/user/auth',
				name: 'User-auth',
				meta: { title: 'Auth', affix: true },
				component: () => import('@/views/admin/user/Auth')
			}
		]
	},
	{
		path: '/admin/cloud',
		redirect: '/admin/cloud/list',
		component: Layout,
		children: [
			{
				path: '/admin/cloud/list',
				name: 'Cloud-list',
				meta: { title: 'Cloud', affix: true },
				component: () => import('@/views/admin/cloud/Cloud')
			}
		]
	}
]

export default admin
