import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import web from '@/router/common/web'
import admin from '@/router/common/admin'

export const routes: Array<RouteRecordRaw> = [...web, ...admin]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	scrollBehavior: () => ({ left: 0, top: 0 }),
	routes
})

export default router
