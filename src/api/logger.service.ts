import request from '@/utils/request'
import * as types from '@/types'

/**切换Logger状态-授权管理端**/
export function nodeLoggerCutover(params: types.NodeLoggerCutoverParameter) {
	return request<types.NodeLoggerCutoverResponse>({
		url: `/api/logger/cutover`,
		method: 'PUT',
		data: params
	})
}

/**Logger信息-授权管理端**/
export function nodeLogger(params: types.NodeLoggerNodeParameter) {
	return request<types.NodeLoggerNodeResponse>({
		url: `/api/logger/info`,
		method: 'GET',
		params
	})
}

/**Logger列表-授权管理端**/
export function nodeLoggers(params: types.NodeLoggersParameter) {
	return request<types.NodeLoggersResponse>({
		url: `/api/logger/list-node`,
		method: 'GET',
		params
	})
}

/**删除Logger-授权管理端**/
export function nodeDeleteLogger(params: types.NodeDeleteLoggerParameter) {
	return request<types.NodeDeleteLoggerResponse>({
		url: `/api/logger/del`,
		method: 'DELETE',
		params
	})
}
