import { Vue, Component } from 'vue-property-decorator'
import { Table, Tag, Button } from 'ant-design-vue'
import { HttpStatus, Source, NodeRolesRespone } from '@/types'
import { nodeRoles } from '@/api'

@Component
export default class Role extends Vue {
	private source: Source<Array<NodeRolesRespone>> = {
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
		loading: true,
		dataSource: []
	}

	protected created() {
		this.nodeRoles()
	}

	/**角色列表**/
	public async nodeRoles() {
		try {
			const { code, data } = await nodeRoles()
			if (code === HttpStatus.OK) {
				this.source.dataSource = data
			}
		} catch (e) {}
		this.source.loading = false
	}

	protected render() {
		const { source } = this
		return (
			<div style={{ padding: '10px' }}>
				<Table
					class="app-source"
					bordered
					rowKey={(record: any) => record.id}
					loading={source.loading}
					columns={source.column}
					dataSource={source.dataSource}
					scroll={{ x: 800 }}
					{...{
						scopedSlots: {
							status: (props: NodeRolesRespone) => (
								<Tag style={{ margin: 0 }} color={props.status ? 'green' : 'pink'}>
									{props.status ? '正常' : '已禁用'}
								</Tag>
							),
							action: (props: NodeRolesRespone) => (
								<Button.Group>
									<Button type="link">编辑</Button>
									<Button type="link">{props.status ? '禁用' : '开放'}</Button>
								</Button.Group>
							)
						}
					}}
				></Table>
			</div>
		)
	}
}
