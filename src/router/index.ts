import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AppMain from '@/views/common/login/AppMain'

Vue.use(VueRouter)

export const routes: RouteConfig[] = [
	/**web**************************************************************************/
	{
		path: '/',
		name: 'WEB-Home',
		component: () => import('@/views/web/home/Home')
	},
	{
		path: '/multiple',
		name: 'WEB-Multiple',
		component: () => import('@/views/web/multiple/Multiple')
	},
	{
		path: '/intense',
		name: 'WEB-Intense',
		component: () => import('@/views/web/intense/Intense')
	},
	{
		path: '/minute',
		name: 'WEB-Minute',
		component: () => import('@/views/web/minute/Minute')
	},
	{
		path: '/partner',
		name: 'WEB-Partner',
		component: () => import('@/views/web/partner/Partner')
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
	routes
})

export default router
