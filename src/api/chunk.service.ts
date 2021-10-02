import request from '@/utils/request'
import * as types from '@/types'

/**创建版本资源-授权管理端**/
export function nodeCreateChunk(params: types.NodeCreateChunkParameter) {
	return request<types.NodeCreateChunkResponse>({
		url: `/api/chunk/create`,
		method: 'POST',
		data: params
	})
}

/**版本资源信息-授权管理端**/
export function nodeChunk(params: types.NodeChunkNodeParameter) {
	return request<types.NodeChunkNodeResponse>({
		url: `/api/chunk/info`,
		method: 'GET',
		params
	})
}

/**版本资源列表-授权管理端**/
export function nodeChunks(params: types.NodeChunksParameter) {
	return request<types.NodeChunksResponse>({
		url: `/api/chunk/list-node`,
		method: 'GET',
		params
	})
}
