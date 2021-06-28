import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, form, next) => {
	NProgress.start()
	next()
})

router.afterEach(async (to, form) => {
	if (to.name && to.meta && to.meta.tagHidden !== true) {
		let matched: any = [to.name]
		if (to.matched) {
			matched = to.matched.map(item => item.name)
		}
		await store.dispatch('app/setMultiple', {
			path: to.path,
			fullPath: to.fullPath,
			query: to.query,
			params: to.params,
			name: to.name,
			matched: matched,
			meta: { ...to.meta }
		})
	}
	store.commit('app/SET_ROUTE', { ...to })
	NProgress.done()
})
