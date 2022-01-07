import Cookies from 'js-cookie'
const APP_AUTH_TOKEN = Symbol('APP_AUTH_TOKEN').toString()
import { init as initMain } from '@/components/instance/init-main'

export function getToken(): string | undefined {
	return Cookies.get(APP_AUTH_TOKEN)
}

export function setToken(token: string) {
	return Cookies.set(APP_AUTH_TOKEN, token, { expires: 1 })
}

export function delToken() {
	return Cookies.remove(APP_AUTH_TOKEN)
}

/**验证是否登录**/
export function stopAuth(fn?: Function) {
	if (getToken()) {
		typeof fn === 'function' && fn()
	} else {
		initMain().then(node => {
			node.$once('close', (done: Function) => done())
			node.$once('submit', (done: Function) => {
				typeof fn === 'function' && fn()
				done()
			})
		})
	}
}

/**阻止默认事件**/
export function stopEvent(e: Event, fn?: Function) {
	e.preventDefault()
	e.stopPropagation()
	typeof fn === 'function' && fn()
}

/**阻止默认事件 -> 登录验证**/
export function stopBack(e: Event, fn?: Function) {
	stopEvent(e, () => {
		stopAuth(fn)
	})
}
