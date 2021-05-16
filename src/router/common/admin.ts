import type { RouteRecordRaw } from 'vue-router'
import { createRoute } from '@/utils/type'
import Layout from '@/Layout/admin'

export default createRoute<RouteRecordRaw>([
	{
		path: '/admin',
		redirect: '/admin/home',
		component: Layout,
		meta: { title: '首页', affix: true },
		children: [
			{
				path: '/admin/home',
				name: 'Home',
				meta: { title: '首页', affix: true },
				component: () => import('@/views/home')
			}
		]
	},
	{
		path: '/admin',
		redirect: '/admin/user',
		component: Layout,
		meta: { title: '管理中心' },
		children: [
			{
				path: '/admin/user',
				name: 'User',
				meta: { title: '用户管理' },
				component: () => import('@/views/admin/User.vue')
			},
			{
				path: '/admin/role',
				name: 'Role',
				meta: { title: '角色管理' },
				component: () => import('@/views/admin/Role.vue')
			}
		]
	}
])
