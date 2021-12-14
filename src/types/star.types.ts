import { NodeDate, NodeUserResponse } from '@/types'

export type NodeStar = NodeDate & {
	id: number
	one: number
	type: number
	status: number
	user: NodeUserResponse
}
export type NodeStarParameter = NodeStar & {
	total: number
	page: number
	size: number
	message: string
}

/**
 * 创建收藏
 */
export type NodeCreateStarParameter = Pick<NodeStarParameter, 'one' | 'type'>
export type NodeCreateStarResponse = Pick<NodeStarParameter, 'message'>

/**
 * 取消收藏
 */
export type NodeCancelStarParameter = Pick<NodeStarParameter, 'one' | 'type'>
export type NodeCancelStarResponse = Pick<NodeStarParameter, 'message'>
