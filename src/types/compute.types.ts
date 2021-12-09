export type MonthTotal = {
	total: number
	count: number
}

export type NodeCompute = {
	user: MonthTotal
	cloud: MonthTotal
	article: MonthTotal
	minute: MonthTotal
	source: MonthTotal
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
