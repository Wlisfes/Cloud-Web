import request from '@/utils/request'
import * as types from '@/types'

/**创建图床**/
export function nodeCreatePoster(params: types.NodeCreatePosterParameter) {
	return request<types.NodeCreatePosterResponse>({
		url: `/api/poster/create`,
		method: 'POST',
		data: params
	})
}

/**切换图床状态**/
export function nodePosterCutover(params: types.NodePosterCutoverParameter) {
	return request<types.NodePosterCutoverResponse>({
		url: `/api/poster/cutover`,
		method: 'PUT',
		data: params
	})
}

/**图床信息**/
export function nodePoster(params: types.NodePosterNodeParameter) {
	return request<types.NodePosterNodeResponse>({
		url: `/api/poster/info`,
		method: 'GET',
		params
	})
}

/**图床列表**/
export function nodePosters(params: types.NodePostersParameter) {
	return request<types.NodePostersResponse>({
		url: `/api/poster/list-node`,
		method: 'GET',
		params
	})
}

/**删除图床**/
export function nodeDeletePoster(params: types.NodeDeletePosterParameter) {
	return request<types.NodeDeletePosterResponse>({
		url: `/api/poster/del`,
		method: 'DELETE',
		params
	})
}
