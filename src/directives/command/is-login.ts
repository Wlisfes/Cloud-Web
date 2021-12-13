import { Vue } from 'vue-property-decorator'
import { getToken } from '@/utils/auth'
import { init as initMain } from '@/components/instance/init-main'

/**
 *验证是否登录
 * @param callback Function
 * @param e Event
 * @returns number 0.拒绝登录 1.已经登录 2.执行登录
 */
export function isToken(callback?: Function, e?: Event): Promise<number> {
	return new Promise(resolve => {
		e?.preventDefault()
		e?.stopPropagation()
		if (getToken()) {
			callback?.()
			resolve(1)
		} else {
			initMain().then(node => {
				node.$once('close', (done: Function) => {
					resolve(0)
					done()
				})
				node.$once('submit', (done: Function) => {
					callback?.()
					resolve(2)
					done()
				})
			})
		}
	})
}

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
