import { Vue, Component } from 'vue-property-decorator'
import { Table, Tag, Button } from 'ant-design-vue'
import { NodeUser } from '@/views/admin/setup/common'
import Avatar from 'vue-avatar'
import { nodeUsers } from '@/api'
import { HttpStatus, Source, NodeUserResponse } from '@/types'
import style from '@/style/admin/admin.user.module.less'

@Component
export default class User extends Vue {
	$refs!: { nodeUser: NodeUser }

	private source: Source<Array<NodeUserResponse>> = {
		column: [
			{ title: '账号', dataIndex: 'account', align: 'center', width: '8.333%' },
			{ title: '头像', align: 'center', width: '6.666%', scopedSlots: { customRender: 'avatar' } },
			{ title: '昵称', dataIndex: 'nickname', align: 'center', width: '12.5%', ellipsis: true },
			{ title: '邮箱', dataIndex: 'email', width: '13.333%', align: 'center' },
			{ title: '手机号', dataIndex: 'mobile', width: '10.833%', align: 'center' },
			{ title: '备注', dataIndex: 'comment', align: 'center', ellipsis: true },
			{ title: '注册时间', dataIndex: 'createTime', width: '12.5%', align: 'center' },
			{ title: '状态', align: 'center', width: '8.333%', scopedSlots: { customRender: 'status' } },
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
				const { code, data } = await nodeUsers({ page, size })
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
			this.$nextTick(() => this.source.initSource())
		}
	}

	protected created() {
		this.source.initSource()
	}

	protected render() {
		const { source } = this
		return (
			<div class={style['app-conter']}>
				<NodeUser ref="nodeUser"></NodeUser>
				<Table
					class="app-source"
					bordered
					rowKey={(record: any) => record.id}
					loading={source.loading}
					columns={source.column}
					dataSource={source.dataSource}
					scroll={{ x: 1200 }}
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
							avatar: (props: NodeUserResponse) => (
								<Avatar
									size={40}
									src={props.avatar}
									username={props.nickname}
									rounded={false}
									style={{ margin: '0 auto', cursor: 'pointer', borderRadius: '4px' }}
								></Avatar>
							),
							status: (props: NodeUserResponse) => (
								<Tag style={{ margin: 0 }} color={!!props.status ? 'green' : 'pink'}>
									{!!props.status ? '启用' : '禁用'}
								</Tag>
							),
							action: (props: NodeUserResponse) => (
								<Button.Group>
									<Button type="link" onClick={() => this.$refs.nodeUser.init(props.uid)}>
										编辑
									</Button>
									<Button type="link" onClick={() => this.$refs.nodeUser.init(props.uid)}>
										角色
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
