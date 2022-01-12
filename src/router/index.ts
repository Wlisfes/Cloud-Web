import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Container from '@/Layout/web'

Vue.use(VueRouter)

export const routes: RouteConfig[] = [
	/**web**************************************************************************/
	{
		path: '/',
		name: 'WEB-Container',
		component: Container,
		children: [
			{
				path: '/',
				name: 'WEB-Home',
				component: () => import('@/views/web/home/Home')
			},
			/********************************************************************/
			{
				path: '/multiple',
				name: 'WEB-Multiple',
				component: () => import('@/views/web/multiple/Multiple')
			},
			{
				path: '/multiple/:id',
				name: 'WEB-Matter',
				component: () => import('@/views/web/multiple/Matter')
			},
			/********************************************************************/
			{
				path: '/intense',
				name: 'WEB-Intense',
				component: () => import('@/views/web/intense/Intense')
			},
			{
				path: '/player/:id',
				name: 'WEB-Player',
				component: () => import('@/views/web/intense/Player')
			},
			/********************************************************************/
			{
				path: '/minute',
				name: 'WEB-Minute',
				component: () => import('@/views/web/minute/Minute')
			},
			/********************************************************************/
			{
				path: '/partner',
				name: 'WEB-Partner',
				component: () => import('@/views/web/partner/Partner')
			}
		]
	},

	{
		path: '/404',
		name: 'WEB-404',
		component: () => import('@/views/common/result/404')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	},
	routes
})

export default router
