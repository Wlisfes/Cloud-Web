import { NodeDate, NodeUserResponse } from '@/types'

export type NodeComment = NodeDate & {
	id: number
	one: number
	super: number
	type: number
	comment: string
	status: number
	parent: NodeComment
	user: NodeUserResponse
	reply: {
		total: number
		page: number
		size: number
		list: NodeComment[]
	}
}
export type NodeCommentParameter = NodeComment & {
	total: number
	page: number
	size: number
	message: string
}

/**
 * 创建评论
 */
export type NodeCreateCommentParameter = Pick<NodeCommentParameter, 'one' | 'type' | 'comment'> & {
	super?: number | null
	parent?: number | null
}
export type NodeCreateCommentResponse = Pick<NodeCommentParameter, 'message'>

/**
 * 切换评论状态
 */
export type NodeCommentCutoverParameter = Pick<NodeCommentParameter, 'id'>
export type NodeCommentCutoverResponse = Pick<NodeCommentParameter, 'message'>

/**
 * 评论列表
 */
export type NodeCommentsParameter = Pick<NodeCommentParameter, 'one' | 'type' | 'page' | 'size'> &
	Partial<Pick<NodeCommentParameter, 'super'>>
export type NodeCommentsResponse = Pick<NodeCommentParameter, 'page' | 'size' | 'total'> & {
	list: NodeComment[]
}

/**
 * 删除评论
 */
export type NodeDeleteCommentParameter = Pick<NodeCommentParameter, 'id'>
export type NodeDeleteCommentResponse = Pick<NodeCommentParameter, 'message'>
