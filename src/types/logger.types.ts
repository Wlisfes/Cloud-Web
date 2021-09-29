import { NodeDate, NodeUserResponse } from '@/types'

export type LoggerResponse = NodeDate & {
	id: number
	referer: string
	ip: string
	path: string
	method: string
	type: number
	body: Object
	query: Object
	params: Object
	code: number
	message: string
	status: number
	user: NodeUserResponse
}
export type LoggerParameter = LoggerResponse & {
	total: number
	page: number
	size: number
	message: string
}

/**
 * 切换Logger状态
 */
export type NodeLoggerCutoverParameter = Pick<LoggerParameter, 'id'>
export type NodeLoggerCutoverResponse = Pick<LoggerParameter, 'message'>

/**
 * Logger信息
 */
export type NodeLoggerNodeParameter = Pick<LoggerParameter, 'id'>
export type NodeLoggerNodeResponse = LoggerResponse

/**
 * Logger列表
 */
export type NodeLoggersParameter = Pick<LoggerParameter, 'page' | 'size'> &
	Partial<Pick<LoggerParameter, 'status' | 'type'>>
export type NodeLoggersResponse = Pick<LoggerParameter, 'page' | 'size' | 'total'> & {
	list: NodeLoggerNodeResponse[]
}

/**
 * 删除Logger
 */
export type NodeDeleteLoggerParameter = Pick<LoggerParameter, 'id'>
export type NodeDeleteLoggerResponse = Pick<LoggerParameter, 'message'>
