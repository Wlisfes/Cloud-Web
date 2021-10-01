import { Vue, Component } from 'vue-property-decorator'
import { Button, FormModel, Select, Table, Tooltip, Menu, Icon, notification } from 'ant-design-vue'
import { AppRootNode, AppCutover, AppPopover, AppSatus } from '@/components/common'
import { NodePartner } from '@/views/admin/setup/common'
import { nodePartners, nodePartnerCutover, nodeDeletePartner } from '@/api'
import { init } from '@/components/instance/init-common'
import { HttpStatus, Source, PartnerResponse } from '@/types'
import style from '@/style/admin/admin.partner.module.less'
type SourceOption = {
	option: {
		status: number | undefined
	}
}

@Component
export default class Partner extends Vue {
	$refs!: { nodePartner: NodePartner }

	private source: Source<Array<PartnerResponse>> & SourceOption = {
		column: [
			{ title: '日志标题', align: 'center', width: '20%', scopedSlots: { customRender: 'title' } },
			{ title: '日志描述', align: 'center', scopedSlots: { customRender: 'description' } },
			{ title: '日志状态', align: 'center', width: '12%', scopedSlots: { customRender: 'status' } },
			{ title: '创建时间', dataIndex: 'createTime', align: 'center', width: '20%' },
			{ title: '操作', align: 'center', width: '12%', scopedSlots: { customRender: 'action' } }
		],
		page: 1,
		size: 10,
		total: 0,
		sizeOption: ['10', '20', '30', '40', '50'],
		showSize: true,
		loading: true,
		dataSource: [],
		option: {
			status: undefined
		},
		initSource: async () => {
			try {
				this.source.loading = true
				const { source } = this
				const { code, data } = await nodePartners({
					page: source.page,
					size: source.size,
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
			this.source.initSource()
		},
		onReset: () => {
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

	/**删除日志**/
	private async nodeDeletePartner(id: number) {
		try {
			const { code, data } = await nodeDeletePartner({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**切换日志状态**/
	private async nodePartnerCutover(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodePartnerCutover({ id })
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
				this.$refs.nodePartner.init('update', id)
				break
			case 'delete':
				init({
					name: 'Partner-Common',
					content: (
						<div style={{ display: 'flex', alignItems: 'center', marginBottom: '45px' }}>
							<Icon type="exclamation-circle" style={{ fontSize: '32px', color: '#ff4d4f' }} />
							<h2 style={{ margin: '0 0 0 10px', fontSize: '18px' }}>确定要删除吗？</h2>
						</div>
					)
				})
					.then(({ self, done }) => {
						self.loading = true
						this.nodeDeletePartner(id).finally(() => {
							done()
							this.source.loading = true
							this.source.initSource()
						})
					})
					.catch(({ done }) => done())
				break
		}
	}

	protected created() {
		this.source.initSource()
	}

	protected render() {
		const { source } = this
		return (
			<AppRootNode>
				<div class={style['app-conter']}>
					<NodePartner ref="nodePartner" onReplay={() => this.source.initSource()}></NodePartner>
					<FormModel layout="inline" class={style['node-source']}>
						<div class="node-source-item inline-50">
							<FormModel.Item>
								<Select
									v-model={source.option.status}
									allowClear
									placeholder="日志状态"
									style={{ width: '240px' }}
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
						<FormModel.Item>
							<Button type="primary" onClick={() => this.$refs.nodePartner.init('create')}>
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
						scroll={{ x: 840 }}
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
								title: (props: PartnerResponse) => (
									<div class={`app-ellipsis-2 ${style['app-conter-pointer']}`}>
										<Tooltip title={props.title}>{props.title}</Tooltip>
									</div>
								),
								description: (props: PartnerResponse) => (
									<div class={`app-ellipsis-2 ${style['app-conter-pointer']}`}>
										<Tooltip title={props.description}>{props.description}</Tooltip>
									</div>
								),
								status: (props: PartnerResponse) => <AppSatus status={props.status}></AppSatus>,
								action: (props: PartnerResponse) => (
									<Button.Group>
										<Button type="link">
											<AppPopover
												onChange={(option: { key: string }) => {
													this.onChange(option.key, props.id)
												}}
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
										</Button>
										<Button type="link" onClick={() => this.nodePartnerCutover(props.id)}>
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
