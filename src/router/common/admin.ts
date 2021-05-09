import type { RouteRecordRaw } from 'vue-router'
import { createRoute } from '@/utils/type'
import Layout from '@/Layout/admin'

export default createRoute<RouteRecordRaw>([
	{
		path: '/admin',
		redirect: '/admin/home',
		component: Layout,
		meta: { title: '首页' },
		children: [
			{
				path: '/admin/home',
				name: 'Home',
				meta: { title: '首页', affix: true },
				component: () => import('@/views/home')
			}
		]
	}
])
