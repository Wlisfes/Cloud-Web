import { NodeDate, NodeSource, NodeUserResponse } from '@/types'

export type NodeMinute = NodeDate & {
	id: number
	name: string
	cover: string
	description: string | null
	url: string
	npm: string
	github: string
	status: number
	order: number
	source: NodeSource[]
	user: NodeUserResponse
}

export type NodeMinuteParameter = NodeMinute & {
	total: number
	page: number
	size: number
	message: string
}

/**
 * 创建收录
 */
export type NodeCreateMinuteParameter = Pick<NodeMinuteParameter, 'name' | 'cover'> &
	Partial<Pick<NodeMinuteParameter, 'description' | 'url' | 'npm' | 'github' | 'status' | 'order'>> & {
		source?: number[]
	}
export type NodeCreateMinuteResponse = Pick<NodeMinuteParameter, 'message'>

/**
 * 修改收录
 */
export type NodeUpdateMinuteParameter = Pick<NodeMinuteParameter, 'id' | 'name' | 'cover'> &
	Partial<Pick<NodeMinuteParameter, 'description' | 'url' | 'npm' | 'github' | 'status' | 'order'>> & {
		source?: number[]
	}
export type NodeUpdateMinuteResponse = Pick<NodeMinuteParameter, 'message'>

/**
 * 切换收录状态
 */
export type NodeMinuteCutoverParameter = Pick<NodeMinuteParameter, 'id'>
export type NodeMinuteCutoverResponse = Pick<NodeMinuteParameter, 'message'>

/**
 * 收录信息
 */
export type NodeMinuteNodeParameter = Pick<NodeMinuteParameter, 'id'>
export type NodeMinuteNodeResponse = NodeMinute

/**
 * 收录列表
 */
export type NodeMinutesParameter = Pick<NodeMinuteParameter, 'page' | 'size'> &
	Partial<Pick<NodeMinuteParameter, 'status' | 'npm'>> & { source?: number }
export type NodeClientMinutesParameter = Pick<NodeMinuteParameter, 'page' | 'size'> &
	Partial<Pick<NodeMinuteParameter, 'name'>> & { source?: number }
export type NodeMinutesResponse = Pick<NodeMinuteParameter, 'page' | 'size' | 'total'> & {
	list: NodeMinute[]
}

/**
 * 删除收录
 */
export type NodeDeleteMinuteParameter = Pick<NodeMinuteParameter, 'id'>
export type NodeDeleteMinuteResponse = Pick<NodeMinuteParameter, 'message'>
