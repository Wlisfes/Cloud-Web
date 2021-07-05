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

/**邮箱注册验证码**/
export function nodeEmailCode(params: types.NodeEmailCodeParameter) {
	return request<types.NodeEmailCodeResponse>({
		url: `/api/nodemailer/register-code`,
		method: 'POST',
		data: params
	})
}

/**获取菜单列表**/
export function getMenu(params?: any) {
	return request({
		url: `/api/menu/list`,
		method: 'GET',
		data: params
	})
}
