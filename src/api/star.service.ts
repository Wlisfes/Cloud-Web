import request from '@/utils/request'
import * as types from '@/types'

/**创建收藏**/
export function nodeCreateStar(params: types.NodeCreateStarParameter) {
	return request<types.NodeCreateStarResponse>({
		url: `/api/star/create`,
		method: 'POST',
		data: params
	})
}

/**取消收藏**/
export function nodeCancelStar(params: types.NodeCancelStarParameter) {
	return request<types.NodeCancelStarResponse>({
		url: `/api/star/cancel`,
		method: 'PUT',
		data: params
	})
}
