import router from '@/router'
import store from '@/store'
import { isWhite } from '@/utils/white'
import { getToken, delToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach(async (to, form, next) => {
	NProgress.start()
	const token = getToken()
	if (token) {
		if (to.path.indexOf('/main') !== -1) {
			next({ path: '/', replace: true })
		} else {
			const roles = store.getters['user/role']
			if (roles.length > 0) {
				next()
			} else {
				try {
					await store.dispatch('user/nodeUser')
					const routes = await store.dispatch('base/nodeMenu')
					routes.forEach((route: any) => {
						router.addRoute(route)
					})

					next({ ...(to as any), replace: true })
				} catch (e) {
					delToken()
					next({ path: '/main/login' })
				}
			}
		}
	} else {
		if (isWhite(to.path)) {
			next()
		} else {
			next({ path: '/main/login' })
			NProgress.done()
		}
	}
})

router.afterEach(async (to, form) => {
	if (to.path.indexOf('/admin/') !== -1) {
		await store.dispatch('base/setRoute', to)
	}
	NProgress.done()
})
