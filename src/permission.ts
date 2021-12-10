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
		const list = store.getters['base/list'] || []
		if (list?.length > 0) {
			next()
		} else {
			try {
				await store.dispatch('user/nodeUser')
				await store.dispatch('base/nodeRoleMenu')
				const route = await store.dispatch('base/useRouter')
				await new Promise(resolve => {
					router.addRoute(route)
					router.addRoute({ path: '*', redirect: '/404' })
					resolve(route)
				})

				next({ ...(to as any), replace: true })
			} catch (e) {
				delToken()
				next({ path: '/' })
			}
		}
	} else {
		if (isWhite(to.path)) {
			next()
		} else {
			next({ path: '/' })
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
