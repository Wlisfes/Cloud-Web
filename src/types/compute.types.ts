export type NodeCompute = {
	user: number
	cloud: number
	article: number
	minute: number
	source: number
	current: number
	list: Array<{ key: string; value: number }>
}

/**
 * 各类总数统计
 */
export type NodeComputeTotalResponse = Pick<NodeCompute, 'user' | 'cloud' | 'article' | 'minute' | 'source'>

/**
 * 各类分组统计
 */
export type NodeComputeGroupParameter = Pick<NodeCompute, 'current'>
export type NodeComputeGroupResponse = Pick<NodeCompute, 'list'>
