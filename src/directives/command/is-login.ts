import { Vue } from 'vue-property-decorator'
import { getToken } from '@/utils/auth'
import { init as initMain } from '@/components/instance/init-main'

Vue.directive('login', {
	bind(el, bind, vnode) {
		const { value } = bind
		el.addEventListener('click', (e: Event) => {
			e.preventDefault()
			if (getToken()) {
				value && typeof value === 'function' && value()
			} else {
				initMain().then(node => {
					node.$once('close', (done: Function) => done())
					node.$once('submit', async (done: Function) => {
						if (value && typeof value === 'function') {
							await value()
						}
						done()
					})
				})
			}
		})
	}
})
