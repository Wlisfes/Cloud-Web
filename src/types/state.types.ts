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
	initSource: (merge?: boolean, page?: number, size?: number) => Promise<any>
	onClose: () => void
	onSearch?: () => void
	onReset?: () => void
	onMore?: () => void
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

/**客户端列表配置****************************/
export type Client<T, R> = {
	page: number
	size: number
	keyword: string
	total: number
	loading: boolean
	dataSource: T
	node: R
	initSource: (merge?: boolean, page?: number, size?: number) => Promise<any> /**列表初始化接口**/
	onClose: () => void /**关闭loading**/
	onSearch?: (value: string) => void /**搜索列表接口**/
	onRefresh?: () => void /**刷新列表事件**/
	onSubmit?: () => void /**搜索提交事件**/
	onChange?: (props: { value: string; reset: boolean }) => void /**搜索关键字change事件**/
	onMore?: () => void /**加载更多事件**/
}
