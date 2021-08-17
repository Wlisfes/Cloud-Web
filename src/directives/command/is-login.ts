import { Vue } from 'vue-property-decorator'
import { getToken } from '@/utils/auth'
import { initMain } from '@/components/instance/init-main'

Vue.directive('login', {
	bind(el, bind, vnode) {
		const { value } = bind
		el.addEventListener('click', (e: Event) => {
			e.preventDefault()
			if (getToken()) {
				value && value()
			} else {
				initMain().then(({ node, vm }) => {
					node.init()
					vm.$once('main-submit', () => {
						node.onClose()
						value && value()
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
