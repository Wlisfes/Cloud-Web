import { Vue, Component } from 'vue-property-decorator'
import { Table, Button, FormModel, Select, Input, notification } from 'ant-design-vue'
import { NodeRole } from '@/views/admin/setup/common'
import { AppRootNode, AppSatus } from '@/components/common'
import { nodeRoles, nodeRoleCutover } from '@/api'
import { HttpStatus, Source, NodeRoleResponse } from '@/types'
import style from '@/style/admin/admin.role.module.less'

@Component
export default class Role extends Vue {
	$refs!: { nodeRole: NodeRole }

	private source: Source<Array<any>> = {
		column: [
			{ title: '角色名称', dataIndex: 'name', align: 'center', width: '15%' },
			{ title: '角色唯一标识', dataIndex: 'primary', width: '15%', align: 'center' },
			{ title: '备注', dataIndex: 'comment', align: 'center' },
			{ title: '创建时间', dataIndex: 'createTime', width: '20%', align: 'center' },
			{ title: '角色状态', align: 'center', width: '12.5%', scopedSlots: { customRender: 'status' } },
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
				const { code, data } = await nodeRoles({ page, size })
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

	/**切换角色状态**/
	private async nodeRoleCutover(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeRoleCutover({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
			}
			this.source.initSource()
		} catch (e) {
			this.source.onClose()
		}
	}

	protected render() {
		const { source } = this
		return (
			<AppRootNode class={style['app-conter']}>
				<div class={style['app-conter']}>
					<NodeRole ref="nodeRole" onReplay={() => this.source.initSource()}></NodeRole>
					<FormModel layout="inline" class={style['node-source']}>
						<div class="node-source-item inline-100">
							<FormModel.Item>
								<Select allowClear placeholder="标签状态" style={{ width: '150px' }}>
									<Select.Option value={0}>已禁用</Select.Option>
									<Select.Option value={1}>已启用</Select.Option>
									<Select.Option value={2}>已删除</Select.Option>
								</Select>
							</FormModel.Item>
						</div>
						<div class="node-source-item inline-100">
							<FormModel.Item>
								<Input allowClear placeholder="标签名称" style={{ width: '300px' }}></Input>
							</FormModel.Item>
						</div>
						<FormModel.Item>
							<Button type="primary">查找</Button>
						</FormModel.Item>
						<FormModel.Item>
							<Button>重置</Button>
						</FormModel.Item>
						<FormModel.Item>
							<Button type="primary" onClick={() => this.$refs.nodeRole.init('create')}>
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
								status: (props: NodeRoleResponse) => <AppSatus status={props.status}></AppSatus>,
								action: (props: NodeRoleResponse) => (
									<Button.Group>
										<Button
											type="link"
											onClick={() => this.$refs.nodeRole.init('update', props.id)}
										>
											编辑
										</Button>
										<Button type="link" onClick={() => this.nodeRoleCutover(props.id)}>
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
