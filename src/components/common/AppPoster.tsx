import { Vue, Component, Prop } from 'vue-property-decorator'
import { Modal, Button, Spin, FormModel, Select, Pagination, notification } from 'ant-design-vue'
import { Image, SkeletonItem } from 'element-ui'
import { nodePosters, nodePosterCutover, nodeDeletePoster } from '@/api'
import { HttpStatus, Source, NodePoster } from '@/types'
import style from '@/style/common/app.poster.module.less'
type SourceOption = {
	option: {
		status: number | undefined
		type: number | undefined
	}
}

@Component
export default class AppPoster extends Vue {
	private visible: boolean = false
	private source: Source<Array<NodePoster>> & SourceOption = {
		column: [],
		page: 1,
		size: 12,
		total: 0,
		sizeOption: ['10', '20', '30', '40', '50'],
		showSize: true,
		loading: true,
		dataSource: [],
		option: {
			status: undefined,
			type: undefined
		},
		initSource: async () => {
			try {
				this.source.loading = true
				const { source } = this
				const { code, data } = await nodePosters({
					page: source.page,
					size: source.size,
					status: source.option.status,
					type: source.option.type
				})
				if (code === HttpStatus.OK) {
					this.source.total = data.total
					this.source.dataSource = data.list
				}
			} catch (e) {}
			this.source.onClose()
		},
		onClose: () => {
			this.source.loading = false
		},
		onChange: pagination => {
			this.source.page = pagination.current
			this.source.size = pagination.pageSize
			this.source.initSource()
		},
		onReset: () => {
			this.source.option.status = undefined
			this.source.option.type = undefined
			this.source.onSearch?.()
		},
		onSearch: () => {
			this.source.page = 1
			this.source.size = 10
			this.source.total = 0
			this.source.initSource()
		}
	}

	private onSubmit(props: NodePoster) {
		this.$emit('submit', props)
		this.onClose()
	}

	/**组件调用**/
	public init() {
		this.visible = true
		this.source.initSource()
	}

	/**组件初始化**/
	private onClose() {
		// this.source.page = 1
		this.visible = false
	}

	protected render() {
		const { source } = this

		return (
			<Modal
				dialogStyle={{ maxWidth: '95%', paddingBottom: 0 }}
				v-model={this.visible}
				width={840}
				closable={false}
				centered
				destroyOnClose
				onCancel={this.onClose}
			>
				<Spin class="ant-spin-64" spinning={source.loading}>
					<div class={style['app-poster']}>
						<FormModel layout="inline" class={style['node-source']}>
							<div class="node-source-item inline-50">
								<FormModel.Item>
									<Select
										v-model={source.option.type}
										allowClear
										placeholder="图片类型"
										style={{ width: '150px' }}
									>
										<Select.Option value={1}>avatar</Select.Option>
										<Select.Option value={2}>upload</Select.Option>
										<Select.Option value={3}>cover</Select.Option>
										<Select.Option value={4}>photo</Select.Option>
									</Select>
								</FormModel.Item>
								<FormModel.Item>
									<Select
										v-model={source.option.status}
										allowClear
										placeholder="图片状态"
										style={{ width: '150px' }}
									>
										<Select.Option value={0}>已禁用</Select.Option>
										<Select.Option value={1}>已启用</Select.Option>
										<Select.Option value={2}>已删除</Select.Option>
									</Select>
								</FormModel.Item>
							</div>
							<FormModel.Item>
								<Button type="primary" onClick={this.source.onSearch}>
									查找
								</Button>
							</FormModel.Item>
							<FormModel.Item>
								<Button onClick={this.source.onReset}>重置</Button>
							</FormModel.Item>
							<FormModel.Item style={{ marginRight: 0 }}>
								<Button onClick={() => this.source.initSource()}>刷新</Button>
							</FormModel.Item>
						</FormModel>
						<div class={style['app-poster-conter']}>
							{source.dataSource.map(k => (
								<div class={style['app-poster-item']}>
									<div class={style['node-poster']}>
										<div class={style['node-poster-conter']} onClick={() => this.onSubmit(k)}>
											<Image
												fit="cover"
												style={{ width: '100%', height: '100%' }}
												src={`${k.url}?x-oss-process=style/resize`}
											>
												<SkeletonItem
													slot="placeholder"
													variant="image"
													style={{ width: '100%', height: '100%' }}
												></SkeletonItem>
												<SkeletonItem
													slot="error"
													variant="image"
													style={{ width: '100%', height: '100%' }}
												></SkeletonItem>
											</Image>
										</div>
									</div>
								</div>
							))}
						</div>
						{source.total && (
							<div class={style['app-poster-footer']}>
								<Pagination
									current={source.page}
									pageSize={source.size}
									total={source.total}
									pageSizeOptions={source.sizeOption}
									onChange={(current: number, pageSize: number) => {
										source.onChange?.({
											current,
											pageSize,
											pageSizeOptions: [],
											showSizeChanger: false,
											total: source.total
										})
									}}
								></Pagination>
							</div>
						)}
					</div>
				</Spin>
				<div slot="footer" style={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={this.onClose}>取消</Button>
				</div>
			</Modal>
		)
	}
}
