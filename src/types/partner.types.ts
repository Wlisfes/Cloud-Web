import { NodeDate, NodePoster, NodeUserResponse } from '@/types'

export type PartnerResponse = NodeDate & {
	id: number
	title: string
	content: string
	html: string
	status: number
	description: string
	cover: Array<NodePoster>
	user: NodeUserResponse
}

export type PartnerParameter = PartnerResponse & {
	total: number
	page: number
	size: number
	message: string
}

/**
 * 创建日志
 */
export type NodeCreatePartnerParameter = Pick<PartnerParameter, 'title' | 'content' | 'html'> &
	Partial<Pick<PartnerParameter, 'status'> & { cover: number[] }>
export type NodeCreatePartnerResponse = Pick<PartnerParameter, 'message'>

/**
 * 修改日志
 */
export type NodeUpdatePartnerParameter = Pick<PartnerParameter, 'id' | 'title' | 'content' | 'html'> &
	Partial<Pick<PartnerParameter, 'status'> & { cover: number[] }>
export type NodeUpdatePartnerResponse = Pick<PartnerParameter, 'message'>

/**
 * 切换日志状态
 */
export type NodePartnerCutoverParameter = Pick<PartnerParameter, 'id'>
export type NodePartnerCutoverResponse = Pick<PartnerParameter, 'message'>

/**
 * 日志信息
 */
export type NodePartnerParameter = Pick<PartnerParameter, 'id'>
export type NodePartnerResponse = PartnerResponse

/**
 * 日志列表
 */
export type NodePartnersParameter = Pick<PartnerParameter, 'page' | 'size'> & Partial<Pick<PartnerParameter, 'status'>>
export type NodeClientPartnersParameter = Pick<PartnerParameter, 'page' | 'size'>
export type NodePartnersResponse = Pick<PartnerParameter, 'page' | 'size' | 'total'> & { list: PartnerResponse[] }

/**
 * 删除日志
 */
export type NodeDeletePartnerParameter = Pick<PartnerParameter, 'id'>
export type NodeDeletePartnerResponse = Pick<PartnerParameter, 'message'>
