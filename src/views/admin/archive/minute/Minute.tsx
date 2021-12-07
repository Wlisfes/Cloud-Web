import { Vue, Component } from 'vue-property-decorator'
import { Table, Button, Tooltip, Menu, Tag, Icon, FormModel, Input, Select, notification } from 'ant-design-vue'
import { Image } from 'element-ui'
import { AppRootNode, AppSatus, AppPopover, AppCutover } from '@/components/common'
import { NodeMinute } from '@/views/admin/archive/common'
import { nodeMinutes, nodeSources, nodeMinuteCutover, nodeDeleteMinute } from '@/api'
import { init as initCommon } from '@/components/instance/init-common'
import { HttpStatus, Source, NodeMinute as NodeMinuteState, NodeSource } from '@/types'
import style from '@/style/admin/admin.minute.module.less'

type SourceOption = {
	option: {
		status: number | undefined
		name: string | undefined
		source: number | undefined
	}
}

@Component
export default class Minute extends Vue {
	$refs!: { rootNode: AppRootNode; nodeMinute: NodeMinute }

	private sources: NodeSource[] = []
	private source: Source<Array<NodeMinuteState>> & SourceOption = {
		column: [
			{ title: '收录封面', align: 'center', width: 125, scopedSlots: { customRender: 'cover' } },
			{ title: '收录名称', width: '20%', scopedSlots: { customRender: 'name' } },
			{ title: '收录描述', scopedSlots: { customRender: 'description' } },
			{ title: '标签', align: 'center', width: '7%', scopedSlots: { customRender: 'source' } },
			{ title: '排序号', dataIndex: 'order', align: 'center', width: '7%' },
			{ title: '收录状态', align: 'center', width: '8%', scopedSlots: { customRender: 'status' } },
			{ title: '创建时间', dataIndex: 'createTime', align: 'center', width: '13%' },
			{ title: '操作', align: 'center', width: '10%', scopedSlots: { customRender: 'action' } }
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
			name: undefined,
			source: undefined
		},
		initSource: async () => {
			try {
				this.source.loading = true
				const { source } = this
				const { code, data } = await nodeMinutes({
					page: source.page,
					size: source.size,
					status: source.option.status,
					npm: source.option.name,
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
			this.source.option.name = undefined
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

	/**删除收录**/
	private async nodeDeleteMinute(id: number) {
		try {
			const { code, data } = await nodeDeleteMinute({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**切换收录状态**/
	private async nodeMinuteCutover(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeMinuteCutover({ id })
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
				this.$refs.nodeMinute.init('update', id)
				break
			case 'delete':
				initCommon().then(node => {
					node.$once('close', (done: Function) => done())
					node.$once('submit', (done: Function) => {
						this.nodeDeleteMinute(id).finally(() => {
							done()
							this.source.loading = true
							this.source.initSource()
						})
					})
				})
				break
		}
	}

	protected render() {
		const { source } = this
		return (
			<AppRootNode ref="rootNode" class={style['app-conter']}>
				<NodeMinute ref="nodeMinute" onReplay={() => this.source.initSource()}></NodeMinute>

				<FormModel layout="inline" class={style['node-source']}>
					<div class="node-source-item inline-50">
						<FormModel.Item>
							<Select
								v-model={source.option.source}
								allowClear
								placeholder="收录标签"
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
								placeholder="收录状态"
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
								v-model={source.option.name}
								allowClear
								placeholder="收录名称"
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
						<Button type="primary" onClick={() => this.$refs.nodeMinute.init('create')}>
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
					loading={{ wrapperClassName: 'ant-spin-64', spinning: source.loading }}
					columns={source.column}
					dataSource={source.dataSource}
					scroll={{ x: 1200 }}
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
							cover: (props: NodeMinuteState) => (
								<div class={style['app-conter-cover']}>
									<Image
										alt={props.name}
										fit="cover"
										src={`${props.cover}?x-oss-process=style/resize-16-9`}
										style={{ width: '96px', height: '54px', cursor: 'pointer' }}
									></Image>
								</div>
							),
							name: (props: NodeMinuteState) => (
								<div class={`app-ellipsis-2 ${style['app-conter-pointer']}`}>
									<Tooltip title={props.name}>{props.name}</Tooltip>
								</div>
							),
							description: (props: NodeMinuteState) => (
								<div class={`app-ellipsis-2 ${style['app-conter-pointer']}`}>
									<Tooltip title={props.description}>{props.description}</Tooltip>
								</div>
							),
							source: (props: NodeMinuteState) => {
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
							status: (props: NodeMinuteState) => <AppSatus status={props.status}></AppSatus>,
							action: (props: NodeMinuteState) => (
								<Button.Group>
									<AppPopover
										onChange={(option: { key: string }) => this.onChange(option.key, props.id)}
									>
										<Menu.Item key="update" style={{ color: '#1890ff' }}>
											<Icon type="edit"></Icon>
											<span>编辑</span>
										</Menu.Item>
										<Menu.Item key="delete" style={{ color: '#ff4d4f' }}>
											<Icon type="delete"></Icon>
											<span>删除</span>
										</Menu.Item>
									</AppPopover>
									<Button type="link" onClick={() => this.nodeMinuteCutover(props.id)}>
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
