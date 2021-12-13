import request from '@/utils/request'
import * as types from '@/types'

/**创建音视频-授权管理端**/
export function nodeCreateCloud(params: types.NodeCreateCloudParameter) {
	return request<types.NodeCreateCloudResponse>({
		url: `/api/cloud/create`,
		method: 'POST',
		data: params
	})
}

/**修改音视频媒体-授权管理端**/
export function nodeUpdateCloud(params: types.NodeUpdateCloudParameter) {
	return request<types.NodeUpdateCloudResponse>({
		url: `/api/cloud/update`,
		method: 'PUT',
		data: params
	})
}

/**切换音视频媒体状态-授权管理端**/
export function nodeCloudCutover(params: types.NodeCloudCutoverParameter) {
	return request<types.NodeCloudCutoverResponse>({
		url: `/api/cloud/cutover`,
		method: 'PUT',
		data: params
	})
}

/**音视频信息-授权管理端**/
export function nodeCloud(params: types.NodeCloudNodeParameter) {
	return request<types.NodeCloudNodeResponse>({
		url: `/api/cloud/info`,
		method: 'GET',
		params
	})
}

/**删除音视频媒体-授权管理端**/
export function nodeDeleteCloud(params: types.NodeDeleteCloudParameter) {
	return request<types.NodeDeleteCloudResponse>({
		url: `/api/cloud/del`,
		method: 'DELETE',
		params
	})
}

/**音视频列表-授权管理端**/
export function nodeClouds(params: types.NodeCloudsParameter) {
	return request<types.NodeCloudsResponse>({
		url: `/api/cloud/list-node`,
		method: 'GET',
		params
	})
}

/******************************************************************************/

/**音视频列表-客户端**/
export function nodeClientClouds(params: types.NodeClientCloudsParameter) {
	return request<types.NodeClientCloudsResponse>({
		url: `/api/cloud/client/list-node`,
		method: 'GET',
		params
	})
}

/**音视频关键字搜索-客户端**/
export function nodeSearchClouds(params: types.NodeCloudsParameter) {
	return request<types.NodeCloudsResponse>({
		url: `/api/cloud/client/keyword-node`,
		method: 'GET',
		params
	})
}

/**音视频信息-客户端**/
export function nodeClientCloud(params: types.NodeCloudNodeParameter) {
	return request<types.NodeCloudNodeResponse>({
		url: `/api/cloud/client/info`,
		method: 'GET',
		params
	})
}
