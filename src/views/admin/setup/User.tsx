import { Vue, Component } from 'vue-property-decorator'
import { Table, Tag, Button, Menu, Dropdown, Icon, Divider, notification } from 'ant-design-vue'
import { NodeUser } from '@/views/admin/setup/common'
import Avatar from 'vue-avatar'
import { nodeUsers, nodeUserCutover } from '@/api'
import { HttpStatus, Source, NodeUserResponse } from '@/types'
import style from '@/style/admin/admin.user.module.less'

@Component
export default class User extends Vue {
	$refs!: { nodeUser: NodeUser }

	private source: Source<Array<NodeUserResponse>> = {
		column: [
			{ title: '账号', dataIndex: 'account', align: 'center', width: '8%' },
			{ title: '头像', align: 'center', width: '6%', scopedSlots: { customRender: 'avatar' } },
			{ title: '昵称', dataIndex: 'nickname', align: 'center', width: '12%', ellipsis: true },
			{ title: '邮箱', dataIndex: 'email', width: '13%', align: 'center' },
			{ title: '手机号', dataIndex: 'mobile', width: '10.5%', align: 'center' },
			{ title: '角色', align: 'center', width: '7.5%', scopedSlots: { customRender: 'role' } },
			{ title: '备注', dataIndex: 'comment', align: 'center', ellipsis: true },
			{ title: '注册时间', dataIndex: 'createTime', width: '12%', align: 'center' },
			{ title: '状态', align: 'center', width: '6%', scopedSlots: { customRender: 'status' } },
			{ title: '操作', align: 'center', width: '10%', scopedSlots: { customRender: 'action' } }
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

	/**切换用户状态**/
	private async nodeUserCutover(uid: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeUserCutover({ uid })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
			}
			this.source.initSource()
		} catch (e) {
			this.source.onClose()
		}
	}

	/**操作**/
	private onAction(key: string, uid: number) {
		switch (key) {
			case 'update':
				this.$refs.nodeUser.init('update', uid)
				break
		}
	}

	protected render() {
		const { source } = this
		return (
			<div class={style['app-conter']}>
				<NodeUser ref="nodeUser" onReplay={() => this.source.initSource()}></NodeUser>

				<Button type="primary" onClick={() => this.$refs.nodeUser.init('create')}>
					新增
				</Button>

				<Table
					class="app-source"
					bordered
					rowKey={(record: any) => record.id}
					loading={source.loading}
					columns={source.column}
					dataSource={source.dataSource}
					scroll={{ x: 1280 }}
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
							role: (props: NodeUserResponse) => (
								<Tag style={{ margin: 0 }} color="cyan">
									{props.role[0]?.name}
								</Tag>
							),
							status: (props: NodeUserResponse) => (
								<Tag style={{ margin: 0 }} color={!!props.status ? 'green' : 'pink'}>
									{!!props.status ? '启用' : '禁用'}
								</Tag>
							),
							action: (props: NodeUserResponse) => (
								<Button.Group>
									<Dropdown trigger={['click']}>
										<Button type="link">操作</Button>
										<Menu
											slot="overlay"
											onClick={({ key }: { key: string }) => this.onAction(key, props.uid)}
										>
											<Menu.Item key="update" style={{ color: '#1890ff' }}>
												<Icon type="edit"></Icon>
												<span>编辑</span>
											</Menu.Item>
											<Menu.Item key="role" style={{ color: '#fa8c16' }}>
												<Icon type="safety"></Icon>
												<span>权限</span>
											</Menu.Item>
											<Menu.Item key="reset" style={{ color: '#f5222d' }}>
												<Icon type="reload"></Icon>
												<span>重置密码</span>
											</Menu.Item>
										</Menu>
									</Dropdown>
									<Divider type="vertical" style={{ margin: 'auto' }}></Divider>
									<Button type="link" onClick={() => this.nodeUserCutover(props.uid)}>
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
