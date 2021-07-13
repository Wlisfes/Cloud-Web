export type Source<T> = {
	page: number
	size: number
	total: number
	loading: boolean
	column: Array<any>
	dataSource: T
}
