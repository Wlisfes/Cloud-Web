import request from '@/utils/request'
import * as types from '@/types'

/**创建分类标签**/
export function nodeCreateCloudSource(params: types.NodeCreateCloudSourceParameter) {
	return request<types.NodeCreateCloudSourceResponse>({
		url: `/api/cloud-source/create`,
		method: 'POST',
		data: params
	})
}

/**修改分类标签**/
export function nodeUpdateCloudSource(params: types.NodeUpdateCloudSourceParameter) {
	return request<types.NodeUpdateCloudSourceResponse>({
		url: `/api/cloud-source/update`,
		method: 'PUT',
		data: params
	})
}

/**切换分类标签状态**/
export function nodeCloudSourceCutover(params: types.NodeCloudSourceCutoverParameter) {
	return request<types.NodeCloudSourceCutoverResponse>({
		url: `/api/cloud-source/cutover`,
		method: 'PUT',
		data: params
	})
}

/**分类标签信息**/
export function nodeCloudSource(params: types.NodeCloudSourceNodeParameter) {
	return request<types.NodeCloudSourceNodeResponse>({
		url: `/api/cloud-source/info`,
		method: 'GET',
		params
	})
}

/**分类标签列表**/
export function nodeCloudSources(params: types.NodeCloudSourceNodesParameter) {
	return request<types.NodeCloudSourceNodesResponse>({
		url: `/api/cloud-source/list-node`,
		method: 'GET',
		params
	})
}

/**删除分类标签**/
export function nodeDeleteCloudSource(params: types.NodeDeleteCloudSourceParameter) {
	return request<types.NodeDeleteCloudSourceResponse>({
		url: `/api/cloud-source/del`,
		method: 'DELETE',
		params
	})
}
