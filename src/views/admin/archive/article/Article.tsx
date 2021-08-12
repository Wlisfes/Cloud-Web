import { Vue, Component } from 'vue-property-decorator'
import { Table, Button, Tooltip, Menu, Tag, Icon, FormModel, Input, Select, notification } from 'ant-design-vue'
import { Image } from 'element-ui'
import { AppRootNode, AppSatus, AppPopover, AppCutover } from '@/components/common'
import { nodeArticles, nodeSources, nodeArticleCutover, nodeDeleteArticle } from '@/api'
import { HttpStatus, Source, NodeArticle, NodeSource } from '@/types'
import style from '@/style/admin/admin.article.module.less'

type SourceOption = {
	option: {
		status: number | undefined
		title: string | undefined
		source: number | undefined
	}
}

@Component
export default class Article extends Vue {
	$refs!: { rootNode: AppRootNode }

	private sources: NodeSource[] = []
	private source: Source<Array<NodeArticle>> & SourceOption = {
		column: [
			{ title: '文章封面', align: 'center', width: 125, scopedSlots: { customRender: 'cover' } },
			{ title: '文章标题', scopedSlots: { customRender: 'title' } },
			{ title: '标签', align: 'center', width: '8%', scopedSlots: { customRender: 'source' } },
			{ title: '浏览量', dataIndex: 'browse', align: 'center', width: '8%' },
			{ title: '排序号', dataIndex: 'order', align: 'center', width: '8%' },
			{ title: '文章状态', align: 'center', width: '8.5%', scopedSlots: { customRender: 'status' } },
			{ title: '创建时间', dataIndex: 'createTime', align: 'center', width: '15%' },
			{ title: '操作', align: 'center', width: '15%', scopedSlots: { customRender: 'action' } }
		],
		page: 1,
		size: 10,
		total: 0,
		sizeOption: ['5', '10', '15', '20', '30', '40', '50'],
		showSize: true,
		loading: true,
		dataSource: [],
		option: {
			status: undefined,
			title: undefined,
			source: undefined
		},
		initSource: async () => {
			try {
				this.source.loading = true
				const { source } = this
				const { code, data } = await nodeArticles({
					page: source.page,
					size: source.size,
					status: source.option.status,
					title: source.option.title,
					source: source.option.source
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
			this.source.option.title = undefined
			this.source.option.status = undefined
			this.source.option.source = undefined
			this.source.onSearch?.()
		},
		onSearch: () => {
			this.source.page = 1
			this.source.size = 10
			this.source.total = 0
			this.source.initSource()
		}
	}

	protected async created() {
		await this.nodeSources()
		this.source.initSource()
	}

	/**标签列表**/
	private nodeSources() {
		return new Promise(resolve => {
			nodeSources({ page: 1, size: 200 })
				.then(({ code, data }) => {
					if (code === HttpStatus.OK) {
						this.sources = data.list
					}
				})
				.catch(e => e)
				.finally(() => resolve(true))
		})
	}

	/**删除文章**/
	private async nodeDeleteArticle(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeDeleteArticle({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
				this.source.initSource()
			}
		} catch (e) {
			this.source.loading = false
		}
	}

	/**切换文章状态**/
	private async nodeArticleCutover(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeArticleCutover({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
			}
			this.source.initSource()
		} catch (e) {
			this.source.onClose()
		}
	}

	/**操作**/
	private onChange(key: string, id: number) {
		switch (key) {
			case 'update':
				this.$router.push(`/admin/article/update?id=${id}`)
				break
			case 'delete':
				this.nodeDeleteArticle(id)
				break
			case 'preview':
				// this.$refs.player.init(id)
				break
		}
	}

	protected render() {
		const { source } = this
		return (
			<AppRootNode ref="rootNode" class={style['app-conter']}>
				<FormModel layout="inline" class={style['node-source']}>
					<div class="node-source-item inline-50">
						<FormModel.Item>
							<Select
								v-model={source.option.source}
								allowClear
								placeholder="文章标签"
								style={{ width: '150px' }}
							>
								{this.sources.map(k => (
									<Select.Option key={k.id} value={k.id}>
										{k.name}
									</Select.Option>
								))}
							</Select>
						</FormModel.Item>
						<FormModel.Item>
							<Select
								v-model={source.option.status}
								allowClear
								placeholder="文章状态"
								style={{ width: '150px' }}
							>
								<Select.Option value={0}>已禁用</Select.Option>
								<Select.Option value={1}>已启用</Select.Option>
								<Select.Option value={2}>已删除</Select.Option>
							</Select>
						</FormModel.Item>
					</div>
					<div class="node-source-item inline-100">
						<FormModel.Item>
							<Input
								v-model={source.option.title}
								allowClear
								placeholder="文章标题"
								style={{ width: '300px' }}
							></Input>
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
					<FormModel.Item>
						<Button type="primary" onClick={() => this.$router.push(`/admin/article/create`)}>
							新增
						</Button>
					</FormModel.Item>
					<FormModel.Item style={{ marginRight: 0 }}>
						<Button onClick={() => this.source.initSource()}>刷新</Button>
					</FormModel.Item>
				</FormModel>
				<Table
					class="app-source is-title"
					bordered
					rowKey={(record: any) => record.id}
					loading={source.loading}
					columns={source.column}
					dataSource={source.dataSource}
					scroll={{ x: 1080 }}
					pagination={{
						pageSize: source.size,
						current: source.page,
						pageSizeOptions: source.sizeOption,
						showSizeChanger: source.showSize,
						total: source.total
					}}
					onChange={source.onChange}
					{...{
						scopedSlots: {
							cover: (props: NodeArticle) => (
								<div class={style['app-conter-cover']}>
									<Image
										alt={props.title}
										fit="cover"
										src={`${props.cover}?x-oss-process=style/resize`}
										style={{ width: '96px', height: '54px', cursor: 'pointer' }}
									></Image>
								</div>
							),
							title: (props: NodeArticle) => (
								<div class={`app-ellipsis-2 ${style['app-conter-pointer']}`}>
									<Tooltip title={props.title}>{props.title}</Tooltip>
								</div>
							),
							source: (props: NodeArticle) => {
								if (props.source?.length > 0) {
									return (
										<Tooltip
											getPopupContainer={() => this.$refs.rootNode.$el}
											title={
												<div class={style['app-conter-source-preview']}>
													{props.source?.map(k => (
														<Tag color={k.color}>{k.name}</Tag>
													))}
												</div>
											}
										>
											<Tag color="cyan">查看</Tag>
										</Tooltip>
									)
								}
								return null
							},
							status: (props: NodeArticle) => <AppSatus status={props.status}></AppSatus>,
							action: (props: NodeArticle) => (
								<Button.Group>
									<AppPopover
										onChange={(option: { key: string }) => this.onChange(option.key, props.id)}
									>
										<Menu.Item key="preview" style={{ color: '#13c2c2' }}>
											<Icon type="eye"></Icon>
											<span>预览</span>
										</Menu.Item>
										<Menu.Item key="update" style={{ color: '#1890ff' }}>
											<Icon type="edit"></Icon>
											<span>编辑</span>
										</Menu.Item>
										<Menu.Item key="delete" style={{ color: '#ff4d4f' }}>
											<Icon type="delete"></Icon>
											<span>删除</span>
										</Menu.Item>
									</AppPopover>
									<Button type="link" onClick={() => this.nodeArticleCutover(props.id)}>
										<AppCutover status={props.status}></AppCutover>
									</Button>
								</Button.Group>
							)
						}
					}}
				></Table>
			</AppRootNode>
		)
	}
}
