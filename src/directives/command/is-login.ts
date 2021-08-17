import { Vue } from 'vue-property-decorator'
import { getToken } from '@/utils/auth'
import { init } from '@/components/instance/init-main'

Vue.directive('login', {
	bind(el, bind, vnode) {
		const { value } = bind
		el.addEventListener('click', (e: Event) => {
			e.preventDefault()
			if (getToken()) {
				value && typeof value === 'function' && value()
			} else {
				init().then(({ node, vm }) => {
					node.init()
					vm.$once('main-submit', () => {
						node.onClose()
						value && typeof value === 'function' && value()
					})
					vm.$once('main-close', () => {
						vm.$off('main-submit')
						vm.$off('main-close')
					})
				})
			}
		})
	}
})
