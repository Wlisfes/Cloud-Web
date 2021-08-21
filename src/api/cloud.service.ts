import request from '@/utils/request'
import * as types from '@/types'

/**创建音视频**/
export function nodeCreateCloud(params: types.NodeCreateCloudParameter) {
	return request<types.NodeCreateCloudResponse>({
		url: `/api/cloud/create`,
		method: 'POST',
		data: params
	})
}

/**修改音视频媒体**/
export function nodeUpdateCloud(params: types.NodeUpdateCloudParameter) {
	return request<types.NodeUpdateCloudResponse>({
		url: `/api/cloud/update`,
		method: 'PUT',
		data: params
	})
}

/**切换音视频媒体状态**/
export function nodeCloudCutover(params: types.NodeCloudCutoverParameter) {
	return request<types.NodeCloudCutoverResponse>({
		url: `/api/cloud/cutover`,
		method: 'PUT',
		data: params
	})
}

/**音视频信息**/
export function nodeCloud(params: types.NodeCloudNodeParameter) {
	return request<types.NodeCloudNodeResponse>({
		url: `/api/cloud/info`,
		method: 'GET',
		params
	})
}

/**音视频列表**/
export function nodeClouds(params: types.NodeCloudsParameter) {
	return request<types.NodeCloudsResponse>({
		url: `/api/cloud/list-node`,
		method: 'GET',
		params
	})
}

/**音视频列表-客户端**/
export function nodeClientClouds(params: types.NodeClientCloudsParameter) {
	return request<types.NodeClientCloudsResponse>({
		url: `/api/cloud/client/list-node`,
		method: 'GET',
		params
	})
}

/**删除音视频媒体**/
export function nodeDeleteCloud(params: types.NodeDeleteCloudParameter) {
	return request<types.NodeDeleteCloudResponse>({
		url: `/api/cloud/del`,
		method: 'DELETE',
		params
	})
}
