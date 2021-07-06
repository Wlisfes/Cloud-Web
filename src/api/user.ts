import request from '@/utils/request'
import * as types from '@/types'

/**登录**/
export function login(params: types.LoginParameter) {
	return request<types.LoginResponse>({
		url: `/api/user/login`,
		method: 'POST',
		data: params
	})
}

/**注册**/
export function register(params: types.RegisterParameter) {
	return request<types.RegisterResponse>({
		url: `/api/user/create`,
		method: 'POST',
		data: params
	})
}

/**用户信息**/
export function nodeUser(params?: any) {
	return request<types.GetUserResponse>({
		url: `/api/user/info`,
		method: 'GET',
		params
	})
}
