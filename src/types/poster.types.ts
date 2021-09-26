import { NodeDate, NodeUserResponse } from '@/types'

export type NodePoster = NodeDate & {
	id: number
	type: number
	url: string
	path: string
	status: number
	user: NodeUserResponse
}

export type NodePosterParameter = NodePoster & {
	total: number
	page: number
	size: number
	message: string
}

/**
 * 创建图床
 */
export type NodeCreatePosterParameter = Pick<NodePosterParameter, 'type' | 'url' | 'path'>
export type NodeCreatePosterResponse = Pick<NodePosterParameter, 'message'>

/**
 * 切换图床状态
 */
export type NodePosterCutoverParameter = Pick<NodePosterParameter, 'id'>
export type NodePosterCutoverResponse = Pick<NodePosterParameter, 'message'>

/**
 * 图床信息
 */
export type NodePosterNodeParameter = Pick<NodePosterParameter, 'id'>
export type NodePosterNodeResponse = NodePoster

/**
 * 图床列表
 */
export type NodePostersParameter = Pick<NodePosterParameter, 'page' | 'size'> &
	Partial<Pick<NodePosterParameter, 'status' | 'type'>>
export type NodePostersResponse = Pick<NodePosterParameter, 'page' | 'size' | 'total'> & {
	list: NodePosterNodeResponse[]
}

/**
 * 删除图床
 */
export type NodeDeletePosterParameter = Pick<NodePosterParameter, 'id'>
export type NodeDeletePosterResponse = Pick<NodePosterParameter, 'message'>
