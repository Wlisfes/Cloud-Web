import { NodeDate, NodeUserResponse } from '@/types'

export type NodeChunk = NodeDate & {
	id: number
	url: string
	path: string
	name: string
	version: number
	status: number
	user: NodeUserResponse
}

export type NodeChunkParameter = NodeChunk & {
	total: number
	page: number
	size: number
	message: string
}

/**
 * 创建版本资源
 */
export type NodeCreateChunkParameter = Pick<NodeChunkParameter, 'url' | 'path' | 'name' | 'version'>
export type NodeCreateChunkResponse = Pick<NodeChunkParameter, 'message'>

/**
 * 版本资源信息
 */
export type NodeChunkNodeParameter = Pick<NodeChunkParameter, 'id'>
export type NodeChunkNodeResponse = NodeChunk

/**
 * 版本资源列表
 */
export type NodeChunksParameter = Pick<NodeChunkParameter, 'page' | 'size'> &
	Partial<Pick<NodeChunkParameter, 'status'>>
export type NodeChunksResponse = Pick<NodeChunkParameter, 'page' | 'size' | 'total'> & {
	list: NodeChunkNodeResponse[]
}
