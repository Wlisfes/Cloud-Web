import Vue from 'vue'
import VueRouter from 'vue-router'
import admin from './admin'
import web from './web'

Vue.use(VueRouter)

const routes = [...web, ...admin]
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
