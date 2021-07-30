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
export function nodeMenuConter(params?: any) {
	return request<Array<types.NodeMenuParameter>>({
		url: `/api/menu/conter`,
		method: 'GET',
		params
	})
}

/**动态路由节点**/
export function nodeMenuRouter(params?: any) {
	return request<Array<types.NodeMenuParameter>>({
		url: `/api/menu/router`,
		method: 'GET',
		params
	})
}

/**菜单列表**/
export function nodeMenu(params?: any) {
	return request<Array<types.NodeMenuParameter>>({
		url: `/api/menu/list`,
		method: 'GET',
		params
	})
}
