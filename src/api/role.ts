import request from '@/utils/request'
import * as types from '@/types'

/**角色列表-不包括子类**/
export function nodeRoles(params: types.NodeRolesParameter) {
	return request<types.NodeRolesRespone>({
		url: `/api/role/list`,
		method: 'GET',
		params
	})
}

/**角色列表-包括子类**/
export function nodeRolesChild(params: types.NodeRolesParameter) {
	return request<types.NodeRolesRespone>({
		url: `/api/role/list-node`,
		method: 'GET',
		params
	})
}

/**角色信息**/
export function nodeRole(params: types.NodeRoleParameter) {
	return request<types.NodeRoleResponse>({
		url: `/api/role/node`,
		method: 'GET',
		params
	})
}

/**用户角色信息**/
export function nodeUserRole(params?: any) {
	return request<types.NodeUserRoleRespone>({
		url: `/api/role/user-node`,
		method: 'GET',
		params
	})
}
