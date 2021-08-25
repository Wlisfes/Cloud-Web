import { NodeDate, NodeSource, NodeUserResponse } from '@/types'

export type NodeArticle = NodeDate & {
	id: number
	title: string
	cover: string
	content: string
	html: string
	description: string | null
	url: string
	status: number
	order: number
	browse: number
	source: NodeSource[]
	user: NodeUserResponse
}

export type NodeArticleParameter = NodeArticle & {
	total: number
	page: number
	size: number
	message: string
}

/**
 * 创建文章
 */
export type NodeCreateArticleParameter = Pick<NodeArticle, 'title' | 'cover' | 'content' | 'html'> &
	Partial<Pick<NodeArticle, 'url' | 'status' | 'order'>> & {
		source?: number[]
	}
export type NodeCreateArticleResponse = Pick<NodeArticleParameter, 'message'>

/**
 * 修改文章
 */
export type NodeUpdateArticleParameter = Pick<NodeArticle, 'id' | 'title' | 'cover' | 'content' | 'html'> &
	Partial<Pick<NodeArticle, 'url' | 'status' | 'order'>> & {
		source?: number[]
	}
export type NodeUpdateArticleResponse = Pick<NodeArticleParameter, 'message'>

/**
 * 切换文章状态
 */
export type NodeArticleCutoverParameter = Pick<NodeArticle, 'id'>
export type NodeArticleCutoverResponse = Pick<NodeArticleParameter, 'message'>

/**
 * 文章信息
 */
export type NodeArticleNodeParameter = Pick<NodeArticle, 'id'>
export type NodeArticleNodeResponse = NodeArticle

/**
 * 文章列表
 */
export type NodeArticlesParameter = Pick<NodeArticleParameter, 'page' | 'size'> &
	Partial<Pick<NodeArticleParameter, 'status' | 'title'>> & { source?: number }
export type NodeArticlesResponse = Pick<NodeArticleParameter, 'page' | 'size' | 'total'> & {
	list: NodeArticle[]
}

/**
 * 删除文章
 */
export type NodeDeleteArticleParameter = Pick<NodeArticleParameter, 'id'>
export type NodeDeleteArticleResponse = Pick<NodeArticleParameter, 'message'>
