import { Vue, Component } from 'vue-property-decorator'
import { Table, Tag, Button } from 'ant-design-vue'
import Avatar from 'vue-avatar'
import { nodeUsers } from '@/api'
import { HttpStatus, Source, NodeUserResponse } from '@/types'

@Component
export default class User extends Vue {
	private source: Source<Array<NodeUserResponse>> = {
		column: [
			{ title: '账号', dataIndex: 'account', align: 'center', width: '9%' },
			{ title: '头像', align: 'center', width: '9%', scopedSlots: { customRender: 'avatar' } },
			{ title: '昵称', dataIndex: 'nickname', align: 'center' },
			{ title: '邮箱', dataIndex: 'email', width: '16%', align: 'center' },
			{ title: '手机号', dataIndex: 'mobile', width: '12%', align: 'center' },
			{ title: '注册时间', dataIndex: 'createTime', width: '15%', align: 'center' },
			{ title: '状态', align: 'center', width: '10%', scopedSlots: { customRender: 'status' } },
			{ title: '操作', align: 'center', width: '12%', scopedSlots: { customRender: 'action' } }
		],
		page: 1,
		size: 10,
		total: 0,
		sizeOption: ['10', '20', '30', '40', '50'],
		showSize: true,
		loading: true,
		dataSource: []
	}

	protected created() {
		this.nodeUsers()
	}

	/**用户列表**/
	public async nodeUsers() {
		try {
			const { code, data } = await nodeUsers({ page: 1, size: 10 })
			if (code === HttpStatus.OK) {
				this.source.total = data.total
				this.source.dataSource = data.list
			}
		} catch (e) {}
		this.source.loading = false
	}

	private onChange(pagination: any, filters: any, sorter: any, props: any) {
		console.log(pagination, filters, sorter, props)
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
					scroll={{ x: 1000 }}
					{...{
						scopedSlots: {
							avatar: (props: NodeUserResponse) => (
								<Avatar
									size={40}
									src={props.avatar}
									username={props.nickname}
									style={{ margin: '0 auto', cursor: 'pointer' }}
								></Avatar>
							),
							status: (props: NodeUserResponse) => (
								<Tag style={{ margin: 0 }} color={props.status ? 'green' : 'pink'}>
									{props.status ? '正常' : '已禁用'}
								</Tag>
							),
							action: (props: NodeUserResponse) => (
								<Button.Group>
									<Button type="link">编辑</Button>
									<Button type="link">{props.status ? '禁用' : '开放'}</Button>
								</Button.Group>
							)
						}
					}}
					pagination={{
						pageSize: source.size,
						current: source.page,
						pageSizeOptions: source.sizeOption,
						showSizeChanger: source.showSize,
						total: source.total
					}}
					onChange={this.onChange}
				></Table>
			</div>
		)
	}
}
