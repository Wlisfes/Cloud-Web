import request from '@/utils/request'
import * as types from '@/types'

/**创建角色**/
export function nodeCreateRole(params: types.NodeCreateRoleParameter) {
	return request<types.NodeCreateRoleRespone>({
		url: `/api/role/create`,
		method: 'POST',
		data: params
	})
}

/**角色列表**/
export function nodeRoles(params: types.NodeRolesParameter) {
	return request<types.NodeRolesRespone>({
		url: `/api/role/list-node`,
		method: 'GET',
		params
	})
}

/**角色信息**/
export function nodeRole(params: types.NodeRoleParameter) {
	return request<types.NodeRoleResponse>({
		url: `/api/role/info`,
		method: 'GET',
		params
	})
}

/**修改角色权限**/
export function updateNodeRole(params: types.NodeUpdateRoleParameter) {
	return request<types.NodeUpdateRoleRespone>({
		url: `/api/role/update`,
		method: 'PUT',
		data: params
	})
}

/**切换角色状态**/
export function nodeRoleCutover(params: types.NodeRoleCutoverParameter) {
	return request<types.NodeRoleCutoverRespone>({
		url: `/api/role/cutover`,
		method: 'PUT',
		data: params
	})
}
