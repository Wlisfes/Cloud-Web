import { NodeDate } from '@/types'

export type NodeSource = NodeDate & {
	id: number
	name: string
	icon: string
	color: string
	status: number
	order: number
	comment: string | null
}
export type NodeSourceParameter = NodeSource & {
	message: string
	page: number
	size: number
	total: number
}

/**
 * 创建标签
 */
export type NodeCreateSourceParameter = Pick<NodeSourceParameter, 'name' | 'color' | 'icon'> &
	Partial<Pick<NodeSourceParameter, 'status' | 'order' | 'comment'>>
export type NodeCreateSourceResponse = Pick<NodeSourceParameter, 'message'>

/**
 * 修改标签
 */
export type NodeUpdateSourceParameter = Pick<NodeSourceParameter, 'id' | 'name' | 'color' | 'icon'> &
	Partial<Pick<NodeSourceParameter, 'status' | 'order' | 'comment'>>
export type NodeUpdateSourceResponse = Pick<NodeSourceParameter, 'message'>

/**
 * 切换标签状态
 */
export type NodeSourceCutoverParameter = Pick<NodeSourceParameter, 'id'>
export type NodeSourceCutoverResponse = Pick<NodeSourceParameter, 'message'>

/**
 * 标签信息
 */
export type NodeSourceNodeParameter = Pick<NodeSourceParameter, 'id'>
export type NodeSourceNodeResponse = NodeSource

/**
 * 标签列表
 */
export type NodeSourceNodesParameter = Pick<NodeSourceParameter, 'page' | 'size'> &
	Partial<Pick<NodeSourceParameter, 'status' | 'name'>>
export type NodeSourceNodesResponse = Pick<NodeSourceParameter, 'size' | 'page' | 'total'> & {
	list: NodeSource[]
}

/**
 * 删除标签
 */
export type NodeDeleteSourceParameter = Pick<NodeSourceParameter, 'id'>
export type NodeDeleteSourceResponse = Pick<NodeSourceParameter, 'message'>
