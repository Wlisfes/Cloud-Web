import request from '@/utils/request'
import * as types from '@/types'

/**角色列表-不包括子类**/
export function nodeRoles(params?: any) {
	return request<types.GetUserResponse>({
		url: `/api/role/list`,
		method: 'GET',
		params
	})
}

/**角色列表-包括子类**/
export function nodeRolesChild(params?: any) {
	return request<types.GetUserResponse>({
		url: `/api/role/list-node`,
		method: 'GET',
		params
	})
}
