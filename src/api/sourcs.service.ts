import request from '@/utils/request'
import * as types from '@/types'

/**创建标签**/
export function nodeCreateSource(params: types.NodeCreateSourceParameter) {
	return request<types.NodeCreateSourceResponse>({
		url: `/api/source/create`,
		method: 'POST',
		data: params
	})
}

/**修改标签**/
export function nodeUpdateSource(params: types.NodeUpdateSourceParameter) {
	return request<types.NodeUpdateSourceResponse>({
		url: `/api/source/update`,
		method: 'PUT',
		data: params
	})
}

/**切换标签状态**/
export function nodeSourceCutover(params: types.NodeSourceCutoverParameter) {
	return request<types.NodeSourceCutoverResponse>({
		url: `/api/source/cutover`,
		method: 'PUT',
		data: params
	})
}

/**标签信息**/
export function nodeSource(params: types.NodeSourceNodeParameter) {
	return request<types.NodeSourceNodeResponse>({
		url: `/api/source/info`,
		method: 'GET',
		params
	})
}

/**标签列表**/
export function nodeSources(params: types.NodeSourceNodesParameter) {
	return request<types.NodeSourceNodesResponse>({
		url: `/api/source/list-node`,
		method: 'GET',
		params
	})
}

/**分类标签**/
export function nodeDeleteSource(params: types.NodeDeleteSourceParameter) {
	return request<types.NodeDeleteSourceResponse>({
		url: `/api/source/del`,
		method: 'DELETE',
		params
	})
}
