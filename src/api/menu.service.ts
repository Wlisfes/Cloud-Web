import request from '@/utils/request'
import * as types from '@/types'

/**创建菜单节点**/
export function nodeCreateMenu(params: types.NodeCreateMenuParameter) {
	return request<types.NodeCreateMenuResponse>({
		url: `/api/menu/create`,
		method: 'POST',
		data: params
	})
}

/**目录节点**/
export function nodeMenuConter() {
	return request<Array<types.NodeMenuParameter>>({
		url: `/api/menu/conter`,
		method: 'GET'
	})
}

/**动态路由节点**/
export function nodeMenuRouter() {
	return request<Array<types.NodeMenuParameter>>({
		url: `/api/menu/router`,
		method: 'GET'
	})
}

/**角色菜单**/
export function nodeRoleMenu() {
	return request<Array<types.NodeMenuParameter>>({
		url: `/api/menu/role`,
		method: 'GET'
	})
}

/**菜单列表**/
export function nodeMenus() {
	return request<Array<types.NodeMenuParameter>>({
		url: `/api/menu/list-node`,
		method: 'GET'
	})
}

/**菜单信息**/
export function nodeMenu(params: types.NodeIDMenuParameter) {
	return request<types.NodeMenuParameter>({
		url: `/api/menu/info`,
		method: 'GET',
		params
	})
}

/**修改菜单**/
export function nodeUpdateMenu(params: types.NodeUpdateMenuParameter) {
	return request<types.NodeUpdateMenuResponse>({
		url: `/api/menu/update`,
		method: 'PUT',
		data: params
	})
}

/**删除菜单**/
export function nodeDeleteMenu(params: types.NodeDeleteMenuParameter) {
	return request<types.NodeDeleteMenuResponse>({
		url: `/api/menu/del`,
		method: 'DELETE',
		params
	})
}
