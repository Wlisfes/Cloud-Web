import request from '@/utils/request'
import * as types from '@/types'

/**创建文章**/
export function nodeCreateArticle(params: types.NodeCreateArticleParameter) {
	return request<types.NodeCreateArticleResponse>({
		url: `/api/article/create`,
		method: 'POST',
		data: params
	})
}

/**修改文章**/
export function nodeUpdateArticle(params: types.NodeUpdateArticleParameter) {
	return request<types.NodeUpdateArticleResponse>({
		url: `/api/article/update`,
		method: 'PUT',
		data: params
	})
}

/**切换文章状态**/
export function nodeArticleCutover(params: types.NodeArticleCutoverParameter) {
	return request<types.NodeArticleCutoverResponse>({
		url: `/api/article/cutover`,
		method: 'PUT',
		data: params
	})
}

/**文章信息**/
export function nodeArticle(params: types.NodeArticleNodeParameter) {
	return request<types.NodeArticleNodeResponse>({
		url: `/api/article/info`,
		method: 'GET',
		params
	})
}

/**文章列表**/
export function nodeArticles(params: types.NodeArticlesParameter) {
	return request<types.NodeArticlesResponse>({
		url: `/api/article/list-node`,
		method: 'GET',
		params
	})
}

/**删除文章**/
export function nodeDeleteArticle(params: types.NodeDeleteArticleParameter) {
	return request<types.NodeDeleteArticleResponse>({
		url: `/api/article/del`,
		method: 'DELETE',
		params
	})
}
