import { NodeDate, NodeCloudSource } from '@/types'

export type NodeCloud = NodeDate & {
	id: number
	type: number
	title: string
	key: string
	name: string
	path: string
	cover: string
	status: number
	order: number
	size: number
	description: string
	parent: NodeCloud
	children: NodeCloud[]
	source: NodeCloudSource[]
}
export type NodeCloudParameter = NodeCloud & {
	total: number
	page: number
	size: number
	message: string
}

/**
 * 创建音视频
 */
export type NodeCreateCloudParameter = Pick<NodeCloudParameter, 'type' | 'title' | 'cover' | 'status'> &
	Partial<Pick<NodeCloudParameter, 'key' | 'name' | 'path' | 'order' | 'description' | 'size'>> & {
		parent: number
		source: number[]
	}
export type NodeCreateCloudResponse = Pick<NodeCloudParameter, 'message'>

/**
 * 修改音视频媒体
 */
export type NodeUpdateCloudParameter = Pick<NodeCloudParameter, 'id' | 'type' | 'title' | 'cover' | 'status'> &
	Partial<Pick<NodeCloudParameter, 'key' | 'name' | 'path' | 'order' | 'description' | 'size'>> & {
		parent: number
		source: number[]
	}
export type NodeUpdateCloudResponse = Pick<NodeCloudParameter, 'message'>

/**
 * 切换音视频媒体状态
 */
export type NodeCloudCutoverParameter = Pick<NodeCloudParameter, 'id'>
export type NodeCloudCutoverResponse = Pick<NodeCloudParameter, 'message'>

/**
 * 音视频信息
 */
export type NodeCloudNodeParameter = Pick<NodeCloudParameter, 'id'>
export type NodeCloudNodeResponse = NodeCloud

/**
 * 音视频列表
 */
export type NodeCloudsParameter = Pick<NodeCloudParameter, 'page' | 'size'> &
	Partial<Pick<NodeCloudParameter, 'status'>>
export type NodeCloudsResponse = Pick<NodeCloudParameter, 'page' | 'size' | 'total'> & {
	list: NodeCloud[]
}

/**
 * 删除音视频媒体
 */
export type NodeDeleteCloudParameter = Pick<NodeCloudParameter, 'id'>
export type NodeDeleteCloudResponse = Pick<NodeCloudParameter, 'message'>
