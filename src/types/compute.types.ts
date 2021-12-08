export type NodeCompute = {
	user: number
	cloud: number
	article: number
	minute: number
	source: number
}

/**
 * 各类总数统计
 */
export type NodeComputeTotalResponse = Pick<NodeCompute, 'user' | 'cloud' | 'article' | 'minute' | 'source'>
