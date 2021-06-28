import type { RouteConfig } from 'vue-router'

const web: Array<RouteConfig> = [
	{
		path: '/',
		component: () => import('@/views/web/home/Home')
	}
]

export default web
