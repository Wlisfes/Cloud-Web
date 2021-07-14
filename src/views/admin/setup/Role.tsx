import { Vue, Component } from 'vue-property-decorator'
import { Table, Tag, Button } from 'ant-design-vue'
import { NodeRole } from '@/views/admin/setup/common'
import { HttpStatus, Source, NodeRoleResponse } from '@/types'
import { nodeRoles } from '@/api'

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
				const { page, size } = this.source
				const { code, data } = await nodeRoles({ page, size })
				if (code === HttpStatus.OK) {
					this.source.total = data.total
					this.source.dataSource = data.list
				}
			} catch (e) {}
			this.source.loading = false
		},
		onChange: pagination => {
			this.source.page = pagination.current
			this.source.size = pagination.pageSize
			this.source.loading = true
			this.$nextTick(() => this.source.initSource())
		}
	}

	protected created() {
		this.source.initSource()
	}

	protected render() {
		const { source } = this
		return (
			<div style={{ padding: '10px' }}>
				<NodeRole ref="nodeRole"></NodeRole>

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
							status: (props: NodeRoleResponse) => (
								<Tag color={props.status ? 'green' : 'pink'}>{props.status ? '启用' : '禁用'}</Tag>
							),
							action: (props: NodeRoleResponse) => (
								<Button.Group>
									<Button type="link" onClick={() => this.$refs.nodeRole.init(props.id)}>
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
		)
	}
}
