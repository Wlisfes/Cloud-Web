import { Vue, Component } from 'vue-property-decorator'
import { Table, Tag, Button } from 'ant-design-vue'
import { HttpStatus, NodeRolesRespone } from '@/types'
import { nodeRoles } from '@/api'

type State = {
	common: {
		loading: boolean
		column: Array<any>
		dataSource: NodeRolesRespone[]
	}
}
@Component
export default class Role extends Vue {
	private state: State = {
		common: {
			column: [
				{ title: '角色名称', dataIndex: 'name', align: 'center', width: '16%', slots: { title: 'name' } },
				{ title: '角色唯一标识', dataIndex: 'primary', width: '20%', align: 'center' },
				{ title: '创建时间', dataIndex: 'createTime', align: 'center' },
				{ title: '角色状态', align: 'center', width: '14%', scopedSlots: { customRender: 'status' } },
				{ title: '操作', align: 'center', width: 160, scopedSlots: { customRender: 'action' } }
			],
			loading: true,
			dataSource: []
		}
	}

	protected created() {
		this.nodeRoles()
	}

	/**角色列表**/
	public async nodeRoles() {
		try {
			const { code, data } = await nodeRoles()
			if (code === HttpStatus.OK) {
				this.state.common.dataSource = data
				console.log(data)
			}
		} catch (e) {}
		this.state.common.loading = false
	}

	protected render() {
		const { common } = this.state
		return (
			<div style={{ padding: '10px' }}>
				<Table
					size="middle"
					bordered
					rowKey={(record: any) => record.id}
					loading={common.loading}
					columns={common.column}
					dataSource={common.dataSource}
					scroll={{ x: 680 }}
					{...{
						scopedSlots: {
							status: (props: NodeRolesRespone) => (
								<Tag color={props.status ? 'green' : 'pink'}>{props.status ? '正常' : '已禁用'}</Tag>
							),
							action: (props: NodeRolesRespone) => (
								<Button.Group>
									<Button type="link" size="small">
										编辑
									</Button>
									<Button type="link" size="small">
										{props.status ? '禁用' : '开放'}
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
