import { Vue, Component } from 'vue-property-decorator'
import { Table, Button, notification } from 'ant-design-vue'
import { NodeRole } from '@/views/admin/setup/common'
import { AppRootNode, AppSatus } from '@/components/common'
import { nodeRoles, nodeRoleCutover } from '@/api'
import { HttpStatus, Source, NodeRoleResponse } from '@/types'

@Component
export default class Role extends Vue {
	$refs!: { nodeRole: NodeRole }

	private source: Source<Array<NodeRoleResponse>> = {
		column: [
			{ title: '角色名称', dataIndex: 'name', align: 'center', width: '15%' },
			{ title: '角色唯一标识', dataIndex: 'primary', width: '15%', align: 'center' },
			{ title: '备注', dataIndex: 'comment', align: 'center' },
			{ title: '创建时间', dataIndex: 'createTime', width: '18.75%', align: 'center' },
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
			<AppRootNode>
				<NodeRole ref="nodeRole" onReplay={() => this.source.initSource()}></NodeRole>

				<Table
					class="app-source"
					bordered
					rowKey={(record: any) => record.id}
					loading={source.loading}
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
									<Button type="link" onClick={() => this.$refs.nodeRole.init(props.id)}>
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
			</AppRootNode>
		)
	}
}
