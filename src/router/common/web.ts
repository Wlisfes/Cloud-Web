import type { RouteRecordRaw } from 'vue-router'
import { createRoute } from '@/utils/type'
import Layout from '@/Layout/web'

export default createRoute<RouteRecordRaw>([
	{
		path: '/',
		redirect: '/home',
		component: Layout,
		meta: { title: '首页' },
		children: [
			{
				path: '/home',
				name: 'Home',
				meta: { title: '首页', affix: true },
				component: () => import('@/views/home')
			}
		]
	}
])
