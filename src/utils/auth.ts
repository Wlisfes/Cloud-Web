import Cookies from 'js-cookie'
const APP_AUTH_TOKEN = Symbol('APP_AUTH_TOKEN').toString()

export function getToken(): string | undefined {
	return Cookies.get(APP_AUTH_TOKEN)
}

export function setToken(token: string) {
	return Cookies.set(APP_AUTH_TOKEN, token)
}

export function delToken() {
	return Cookies.remove(APP_AUTH_TOKEN)
}
