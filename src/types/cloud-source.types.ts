import { NodeDate } from '@/types'

export type NodeCloudSourceParameter = NodeDate & {
	id: number
	name: string
	color: string
	status: number
	order: number
	comment: string | null
	message: string
	page: number
	size: number
	total: number
}

export type NodeCloudSourceResponse = Pick<
	NodeCloudSourceParameter,
	'id' | 'name' | 'color' | 'status' | 'order' | 'createTime' | 'updateTime'
>

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
export type NodeCloudSourceNodeResponse = Omit<NodeCloudSourceParameter, 'size' | 'page' | 'message' | 'total'>

/**
 * 分类标签列表
 */
export type NodeCloudSourceNodesParameter = Pick<NodeCloudSourceParameter, 'page' | 'size'> &
	Partial<Pick<NodeCloudSourceParameter, 'status'>>
export type NodeCloudSourceNodesResponse = Pick<NodeCloudSourceParameter, 'size' | 'page' | 'total'> & {
	list: Array<Omit<NodeCloudSourceParameter, 'page' | 'size' | 'total' | 'message'>>
}

/**
 * 删除分类标签
 */
export type NodeDeleteCloudSourceParameter = Pick<NodeCloudSourceParameter, 'id'>
export type NodeDeleteCloudSourceResponse = Pick<NodeCloudSourceParameter, 'message'>
