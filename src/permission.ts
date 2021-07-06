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
	} else {
		if (isWhite(to.path)) {
			next()
		} else {
			router.push({ path: '/main/login' })
			NProgress.done()
		}
	}
	next()
})

router.afterEach(async (to, form) => {
	if (to.path.indexOf('/admin/') !== -1) {
		await store.dispatch('base/setRoute', to)
	}
	NProgress.done()
})
