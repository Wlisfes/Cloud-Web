import request from '@/utils/request'
import * as types from '@/types'

/**创建评论**/
export function nodeCreateComment(params: types.NodeCreateCommentParameter) {
	return request<types.NodeCreateCommentResponse>({
		url: `/api/comment/create`,
		method: 'POST',
		data: params
	})
}

/**切换评论状态**/
export function nodeCommentCutover(params: types.NodeCommentCutoverParameter) {
	return request<types.NodeCommentCutoverResponse>({
		url: `/api/comment/cutover`,
		method: 'PUT',
		data: params
	})
}

/**评论列表**/
export function nodeComments(params: types.NodeCommentsParameter) {
	return request<types.NodeCommentsResponse>({
		url: `/api/comment/list-node`,
		method: 'GET',
		params
	})
}

/**子评论列表**/
export function nodeChildComments(params: types.NodeCommentsParameter) {
	return request<types.NodeCommentsResponse>({
		url: `/api/comment/child/list-node`,
		method: 'GET',
		params
	})
}

/**删除评论**/
export function nodeDeleteComment(params: types.NodeDeleteCommentParameter) {
	return request<types.NodeDeleteCommentResponse>({
		url: `/api/comment/del`,
		method: 'DELETE',
		params
	})
}
