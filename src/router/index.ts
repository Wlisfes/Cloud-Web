import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/Layout/admin'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/admin',
		component: Layout,
		children: [
			{
				path: '/admin',
				name: 'Home',
				component: () => import('@/views/home')
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
