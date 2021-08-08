import { NodeDate } from '@/types'

export type NodeCloudSource = NodeDate & {
	id: number
	name: string
	color: string
	status: number
	order: number
	comment: string | null
}
export type NodeCloudSourceParameter = NodeCloudSource & {
	message: string
	page: number
	size: number
	total: number
}

/**
 * 创建分类标签
 */
export type NodeCreateCloudSourceParameter = Pick<NodeCloudSourceParameter, 'name' | 'color'> &
	Partial<Pick<NodeCloudSourceParameter, 'status' | 'order' | 'comment'>>
export type NodeCreateCloudSourceResponse = Pick<NodeCloudSourceParameter, 'message'>

/**
 * 修改分类标签
 */
export type NodeUpdateCloudSourceParameter = Pick<NodeCloudSourceParameter, 'id' | 'name' | 'color'> &
	Partial<Pick<NodeCloudSourceParameter, 'status' | 'order' | 'comment'>>
export type NodeUpdateCloudSourceResponse = Pick<NodeCloudSourceParameter, 'message'>

/**
 * 切换分类标签状态
 */
export type NodeCloudSourceCutoverParameter = Pick<NodeCloudSourceParameter, 'id'>
export type NodeCloudSourceCutoverResponse = Pick<NodeCloudSourceParameter, 'message'>

/**
 * 分类标签信息
 */
export type NodeCloudSourceNodeParameter = Pick<NodeCloudSourceParameter, 'id'>
export type NodeCloudSourceNodeResponse = NodeCloudSource

/**
 * 分类标签列表
 */
export type NodeCloudSourceNodesParameter = Pick<NodeCloudSourceParameter, 'page' | 'size'> &
	Partial<Pick<NodeCloudSourceParameter, 'status' | 'name'>>
export type NodeCloudSourceNodesResponse = Pick<NodeCloudSourceParameter, 'size' | 'page' | 'total'> & {
	list: NodeCloudSource[]
}

/**
 * 删除分类标签
 */
export type NodeDeleteCloudSourceParameter = Pick<NodeCloudSourceParameter, 'id'>
export type NodeDeleteCloudSourceResponse = Pick<NodeCloudSourceParameter, 'message'>
