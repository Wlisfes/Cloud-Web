import request from '@/utils/request'
import * as types from '@/types'

/**创建收录-授权管理端**/
export function nodeCreateMinute(params: types.NodeCreateMinuteParameter) {
	return request<types.NodeCreateMinuteResponse>({
		url: `/api/minute/create`,
		method: 'POST',
		data: params
	})
}

/**修改收录-授权管理端**/
export function nodeUpdateMinute(params: types.NodeUpdateMinuteParameter) {
	return request<types.NodeUpdateMinuteResponse>({
		url: `/api/minute/update`,
		method: 'PUT',
		data: params
	})
}

/**切换收录状态-授权管理端**/
export function nodeMinuteCutover(params: types.NodeMinuteCutoverParameter) {
	return request<types.NodeMinuteCutoverResponse>({
		url: `/api/minute/cutover`,
		method: 'PUT',
		data: params
	})
}

/**收录信息-授权管理端**/
export function nodeMinute(params: types.NodeMinuteNodeParameter) {
	return request<types.NodeMinuteNodeResponse>({
		url: `/api/minute/info`,
		method: 'GET',
		params
	})
}

/**收录列表-授权管理端**/
export function nodeMinutes(params: types.NodeMinutesParameter) {
	return request<types.NodeMinutesResponse>({
		url: `/api/minute/list-node`,
		method: 'GET',
		params
	})
}

/**删除收录-授权管理端**/
export function nodeDeleteMinute(params: types.NodeDeleteMinuteParameter) {
	return request<types.NodeDeleteMinuteResponse>({
		url: `/api/minute/del`,
		method: 'DELETE',
		params
	})
}

/*********************************************************************************/

/**收录信息-授权管理端**/
export function nodeClientMinute(params: types.NodeMinuteNodeParameter) {
	return request<types.NodeMinuteNodeResponse>({
		url: `/api/minute/client/info`,
		method: 'GET',
		params
	})
}

/**收录列表-授权管理端**/
export function nodeClientMinutes(params: types.NodeClientMinutesParameter) {
	return request<types.NodeMinutesResponse>({
		url: `/api/minute/client/list-node`,
		method: 'GET',
		params
	})
}
