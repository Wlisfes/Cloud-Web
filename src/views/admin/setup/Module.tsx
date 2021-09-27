import { Vue, Component } from 'vue-property-decorator'
import { Table, Button, Tooltip, Tag, Menu, Icon, FormModel, Input, Select, notification } from 'ant-design-vue'
import { NodeModule } from '@/views/admin/setup/common'
import { AppRootNode, AppSatus } from '@/components/common'
import { nodeModules, nodeRoleCutover } from '@/api'
import { HttpStatus, Source, NodeModule as NodeModuleState } from '@/types'
import style from '@/style/admin/admin.module.module.less'

@Component
export default class Module extends Vue {
	$refs!: { nodeModule: NodeModule }

	private source: Source<Array<NodeModuleState>> = {
		column: [
			{ title: '模块名称', dataIndex: 'name', align: 'center', width: '15%' },
			{ title: '模块唯一标识', dataIndex: 'primary', width: '15%', align: 'center' },
			{ title: '模块备注', dataIndex: 'comment', align: 'center' },
			{ title: '创建时间', dataIndex: 'createTime', width: '20%', align: 'center' },
			{ title: '模块状态', align: 'center', width: '12.5%', scopedSlots: { customRender: 'status' } },
			{ title: '操作', align: 'center', width: '12.5%', scopedSlots: { customRender: 'action' } }
		],
		page: 1,
		size: 10,
		total: 0,
		sizeOption: ['10', '20', '30', '40', '50'],
		showSize: true,
		loading: true,
		dataSource: [],
		initSource: async () => {
			try {
				this.source.loading = true
				const { page, size } = this.source
				const { code, data } = await nodeModules({ page, size })
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
			this.$nextTick(() => this.source.initSource())
		}
	}

	protected created() {
		this.source.initSource()
	}

	protected render() {
		const { source } = this
		return (
			<AppRootNode class={style['app-conter']}>
				<div class={style['app-conter']}>
					<NodeModule ref="nodeModule" onReplay={() => this.source.initSource()}></NodeModule>

					<FormModel layout="inline" class={style['node-source']}>
						<div class="node-source-item inline-100">
							<FormModel.Item>
								<Select allowClear placeholder="模块状态" style={{ width: '150px' }}>
									<Select.Option value={0}>已禁用</Select.Option>
									<Select.Option value={1}>已启用</Select.Option>
									<Select.Option value={2}>已删除</Select.Option>
								</Select>
							</FormModel.Item>
						</div>
						<div class="node-source-item inline-100">
							<FormModel.Item>
								<Input allowClear placeholder="模块名称" style={{ width: '300px' }}></Input>
							</FormModel.Item>
						</div>
						<FormModel.Item>
							<Button type="primary">查找</Button>
						</FormModel.Item>
						<FormModel.Item>
							<Button>重置</Button>
						</FormModel.Item>
						<FormModel.Item>
							<Button type="primary" onClick={() => this.$refs.nodeModule.init('create')}>
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
								status: (props: NodeModuleState) => <AppSatus status={props.status}></AppSatus>,
								action: (props: NodeModuleState) => (
									<Button.Group>
										<Button
											type="link"
											onClick={() => this.$refs.nodeModule.init('update', props.id)}
										>
											编辑
										</Button>
										<Button type="link">
											{!!props.status ? (
												<span style={{ color: '#eb2f96' }}>禁用</span>
											) : (
												<span style={{ color: '#52c41a' }}>启用</span>
											)}
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
