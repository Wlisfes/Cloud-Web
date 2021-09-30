import { Vue, Component } from 'vue-property-decorator'
import { Image } from 'element-ui'
import { Table, Tag, Button, FormModel, Select, Input, Menu, Icon, notification } from 'ant-design-vue'
import { NodeSource } from '@/views/admin/archive/common'
import { AppRootNode, AppPopover, AppCutover, AppSatus } from '@/components/common'
import { nodeSources, nodeSourceCutover, nodeDeleteSource } from '@/api'
import { HttpStatus, Source as SourceState, NodeSource as NodeSourceState } from '@/types'
import style from '@/style/admin/admin.source.module.less'

type SourceOption = {
	option: {
		status: number | undefined
		name: string | undefined
	}
}

@Component
export default class Source extends Vue {
	$refs!: { nodeSource: NodeSource }

	private source: SourceState<Array<NodeSourceState>> & SourceOption = {
		column: [
			{ title: '标签图标', width: 80, scopedSlots: { customRender: 'icon' } },
			{ title: '标签名称', width: '20%', scopedSlots: { customRender: 'name' } },
			{ title: '备注', dataIndex: 'comment', align: 'center' },
			{ title: '排序号', dataIndex: 'order', width: '10%', align: 'center' },
			{ title: '标签状态', align: 'center', width: '10%', scopedSlots: { customRender: 'status' } },
			{ title: '创建时间', dataIndex: 'createTime', align: 'center', width: '20%' },
			{ title: '操作', align: 'center', width: '18.75%', scopedSlots: { customRender: 'action' } }
		],
		page: 1,
		size: 10,
		total: 0,
		sizeOption: ['10', '15', '20', '30', '40', '50'],
		showSize: true,
		loading: true,
		dataSource: [],
		option: {
			status: undefined,
			name: undefined
		},
		initSource: async () => {
			try {
				this.source.loading = true
				const { source } = this
				const { code, data } = await nodeSources({
					page: source.page,
					size: source.size,
					name: source.option.name,
					status: source.option.status
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
			this.source.loading = true
			this.source.initSource()
		},
		onReset: () => {
			this.source.option.name = undefined
			this.source.option.status = undefined
			this.source.onSearch?.()
		},
		onSearch: () => {
			this.source.page = 1
			this.source.size = 10
			this.source.total = 0
			this.source.initSource()
		}
	}

	protected created() {
		this.source.initSource()
	}

	/**删除标签**/
	private async nodeDeleteSource(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeDeleteSource({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
				this.source.initSource()
			}
		} catch (e) {
			this.source.loading = false
		}
	}

	/**切换标签状态**/
	private async nodeSourceCutover(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeSourceCutover({ id })
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
				this.$refs.nodeSource.init('update', id)
				break
			case 'delete':
				this.nodeDeleteSource(id)
				break
		}
	}

	protected render() {
		const { source } = this
		return (
			<AppRootNode>
				<div class={style['app-conter']}>
					<NodeSource ref="nodeSource" onReplay={() => this.source.initSource()}></NodeSource>

					<FormModel layout="inline" class={style['node-source']}>
						<div class="node-source-item inline-100">
							<FormModel.Item>
								<Select
									v-model={source.option.status}
									allowClear
									placeholder="标签状态"
									style={{ minWidth: '150px' }}
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
									placeholder="标签名称"
									style={{ minWidth: '240px' }}
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
							<Button type="primary" onClick={() => this.$refs.nodeSource.init('create')}>
								新增
							</Button>
						</FormModel.Item>
						<FormModel.Item>
							<Button onClick={() => this.source.initSource()}>刷新</Button>
						</FormModel.Item>
					</FormModel>

					<Table
						class="app-source"
						bordered
						rowKey={(record: any) => record.id}
						loading={{ wrapperClassName: 'ant-spin-64', spinning: source.loading }}
						columns={source.column}
						dataSource={source.dataSource}
						scroll={{ x: 800 }}
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
								name: (props: NodeSourceState) => (
									<Tag color={props.color} style={{ marginLeft: '6px' }}>
										{props.name}
									</Tag>
								),
								icon: (props: NodeSourceState) => (
									<div class={style['app-conter-cover']}>
										<Image
											alt={props.name}
											fit="cover"
											src={`${props.icon}?x-oss-process=style/resize`}
											style={{ width: '48px', height: '48px', cursor: 'pointer' }}
										>
											<div class={style['node-placeholder']} slot="placeholder">
												<i class="el-icon-picture"></i>
											</div>
											<div class={style['node-placeholder']} slot="error">
												<i class="el-icon-picture"></i>
											</div>
										</Image>
									</div>
								),
								status: (props: NodeSourceState) => <AppSatus status={props.status}></AppSatus>,
								action: (props: NodeSourceState) => (
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
										<Button type="link" onClick={() => this.nodeSourceCutover(props.id)}>
											<AppCutover status={props.status}></AppCutover>
										</Button>
									</Button.Group>
								)
							}
						}}
					></Table>
				</div>
			</AppRootNode>
		)
	}
}
