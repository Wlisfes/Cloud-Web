/**表格配置****************************/
export type Source<T> = {
	page: number
	size: number
	total: number
	loading: boolean
	column: Array<any>
	showSize: boolean
	sizeOption: string[]
	dataSource: T
	initSource: () => void
	onClose: () => void
	onSearch?: () => void
	onReset?: () => void
	onChange?: (
		pagination: {
			current: number
			pageSize: number
			pageSizeOptions: string[]
			showSizeChanger: boolean
			total: number
		},
		filters?: any,
		sorter?: any,
		props?: any
	) => void
}
