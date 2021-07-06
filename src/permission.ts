import router from '@/router'
import store from '@/store'
import { isWhite } from '@/utils/white'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach(async (to, form, next) => {
	NProgress.start()
	const token = getToken()
	if (token) {
		if (store.getters['user/role'].length > 0) {
			next()
		} else {
			try {
				await store.dispatch('user/nodeUser')
				const route = await store.dispatch('base/nodeMenu')
				console.log(route)
				next()
			} catch (e) {}
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
