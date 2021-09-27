import { Vue, Component } from 'vue-property-decorator'
import { Button, FormModel, Select, Table, Tooltip, notification } from 'ant-design-vue'
import { AppRootNode, AppCutover, AppSatus } from '@/components/common'
import { NodePartner } from '@/views/admin/setup/common'
import { nodePartners } from '@/api'
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
									<div class={`app-ellipsis-1 ${style['app-conter-pointer']}`}>
										<Tooltip title={props.title}>{props.title}</Tooltip>
									</div>
								),
								description: (props: PartnerResponse) => (
									<div class={`app-ellipsis-1 ${style['app-conter-pointer']}`}>
										<Tooltip title={props.description}>{props.description}</Tooltip>
									</div>
								),
								status: (props: PartnerResponse) => <AppSatus status={props.status}></AppSatus>,
								action: (props: PartnerResponse) => (
									<Button.Group>
										<Button type="link">
											<AppCutover status={props.status}></AppCutover>
										</Button>
										<Button type="link">
											<span style={{ color: '#ff4d4f' }}>删除</span>
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
