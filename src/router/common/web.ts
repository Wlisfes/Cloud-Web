import type { RouteRecordRaw } from 'vue-router'
import { createRoute } from '@/utils/type'
import Layout from '@/Layout/web'

export default createRoute<RouteRecordRaw>([
	{
		path: '/',
		redirect: '/home',
		component: Layout,
		children: [
			{
				path: '/home',
				name: 'AppHome',
				meta: { title: '首页', active: 1 },
				component: () => import('@/views/web/home/Home.vue')
			}
		]
	}
])
