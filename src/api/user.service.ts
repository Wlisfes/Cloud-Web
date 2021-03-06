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

/**注册用户**/
export function register(params: types.RegisterParameter) {
	return request<types.RegisterResponse>({
		url: `/api/user/register`,
		method: 'POST',
		data: params
	})
}

/**创建用户**/
export function nodeCreateUser(params: types.NodeCreateUserParameter) {
	return request<types.NodeCreateUserResponse>({
		url: `/api/user/create`,
		method: 'POST',
		data: params
	})
}

/**用户信息-uid**/
export function nodeUidUser(params: types.NodeUidUserParameter) {
	return request<types.NodeUserResponse>({
		url: `/api/user/uid-info`,
		method: 'GET',
		params
	})
}

/**用户信息**/
export function nodeUser(params?: any) {
	return request<types.NodeUserResponse>({
		url: `/api/user/info`,
		method: 'GET',
		params
	})
}

/**用户列表**/
export function nodeUsers(params: types.NodeUsersParameter) {
	return request<types.NodeUsersResponse>({
		url: `/api/user/list-node`,
		method: 'GET',
		params
	})
}

/**切换用户状态**/
export function nodeUserCutover(params: types.NodeUserCutoverParameter) {
	return request<types.NodeUserCutoverResponse>({
		url: `/api/user/cutover`,
		method: 'PUT',
		data: params
	})
}

/**修改用户信息**/
export function nodeUpdateUser(params: types.NodeUpdateUserParameter) {
	return request<types.NodeUpdateUserResponse>({
		url: `/api/user/update`,
		method: 'PUT',
		data: params
	})
}

/**重置用户密码**/
export function nodeUpdatePwsUser(params: types.NodeUpdatePwsUserParameter) {
	return request<types.NodeUpdatePwsUserResponse>({
		url: `/api/user/update-reset`,
		method: 'PUT',
		data: params
	})
}
