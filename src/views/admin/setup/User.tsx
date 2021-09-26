import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Table, Tag, Button, Menu, Icon, Divider, FormModel, Input, Select, notification } from 'ant-design-vue'
import { NodeUser, NodeReset } from '@/views/admin/setup/common'
import { AppRootNode, AppAvatar, AppSatus, AppPopover } from '@/components/common'
import { nodeUsers, nodeRoles, nodeUserCutover } from '@/api'
import { HttpStatus, Source, NodeUserResponse, NodeRole } from '@/types'
import style from '@/style/admin/admin.user.module.less'

type SourceOption = {
	option: {
		status: number | undefined
		primary: string | undefined
		keyword: string | undefined
	}
}

@Component
export default class User extends Vue {
	@Getter('base/mobile') mobile!: boolean

	$refs!: { nodeUser: NodeUser; nodeReset: NodeReset; conter: HTMLElement }

	private roles: NodeRole[] = []
	private get column() {
		return [
			...this.source.column,
			{
				title: '操作',
				align: 'center',
				width: 120,
				fixed: this.mobile ? false : 'right',
				scopedSlots: { customRender: 'action' }
			}
		]
	}
	private source: Source<Array<NodeUserResponse>> & SourceOption = {
		column: [
			{ title: '账号', dataIndex: 'account', align: 'center', width: 100 },
			{ title: '头像', align: 'center', width: 100, scopedSlots: { customRender: 'avatar' } },
			{ title: '昵称', dataIndex: 'nickname', align: 'center', width: 150, ellipsis: true },
			{ title: '邮箱', dataIndex: 'email', align: 'center' },
			{ title: '手机号', dataIndex: 'mobile', align: 'center' },
			{ title: '角色', align: 'center', scopedSlots: { customRender: 'role' } },
			{ title: '注册时间', dataIndex: 'createTime', align: 'center' },
			{ title: '状态', align: 'center', width: 100, scopedSlots: { customRender: 'status' } }
		],
		page: 1,
		size: 10,
		total: 0,
		sizeOption: ['10', '15', '20', '30', '40', '50'],
		showSize: true,
		loading: true,
		dataSource: [],
		option: {
			status: undefined,
			primary: undefined,
			keyword: undefined
		},
		initSource: async () => {
			try {
				this.source.loading = true
				const { source } = this
				const { code, data } = await nodeUsers({
					page: source.page,
					size: source.size,
					status: source.option.status,
					primary: source.option.primary,
					keyword: source.option.keyword
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
			this.source.loading = true
			this.source.initSource()
		},
		onReset: () => {
			this.source.option.status = undefined
			this.source.option.primary = undefined
			this.source.option.keyword = undefined
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
		this.nodeRoles()
	}

	/**角色列表-不包括子类**/
	private async nodeRoles() {
		try {
			const { code, data } = await nodeRoles({ page: 1, size: 10 })
			if (code === HttpStatus.OK) {
				this.roles = data.list
			}
		} catch (e) {}
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
	private onChange(key: string, uid: number) {
		switch (key) {
			case 'update':
				this.$refs.nodeUser.init('update', uid)
				break
			case 'reset':
				this.$refs.nodeReset.init(uid)
				break
		}
	}

	protected render() {
		const { source } = this
		return (
			<AppRootNode>
				<div class={style['app-conter']} ref="conter">
					<NodeUser ref="nodeUser" onReplay={() => this.source.initSource()}></NodeUser>
					<NodeReset ref="nodeReset" onReplay={() => this.source.initSource()}></NodeReset>

					<FormModel layout="inline" class={style['node-source']}>
						<div class="node-source-item inline-50">
							<FormModel.Item>
								<Select
									v-model={source.option.primary}
									allowClear
									placeholder="用户角色"
									style={{ width: '150px' }}
								>
									{this.roles.map(k => (
										<Select.Option key={k.id} value={k.primary}>
											{k.name}
										</Select.Option>
									))}
								</Select>
							</FormModel.Item>
							<FormModel.Item>
								<Select
									v-model={source.option.status}
									allowClear
									placeholder="用户状态"
									style={{ width: '150px' }}
								>
									<Select.Option value={0}>已禁用</Select.Option>
									<Select.Option value={1}>已启用</Select.Option>
									<Select.Option value={2}>已删除</Select.Option>
								</Select>
							</FormModel.Item>
						</div>
						<div class="node-source-item inline-100">
							<FormModel.Item>
								<Input
									v-model={source.option.keyword}
									allowClear
									placeholder="关键字"
									style={{ width: '300px' }}
								></Input>
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
							<Button type="primary" onClick={() => this.$refs.nodeUser.init('create')}>
								新增
							</Button>
						</FormModel.Item>
						<FormModel.Item style={{ marginRight: 0 }}>
							<Button onClick={() => this.source.initSource()}>刷新</Button>
						</FormModel.Item>
					</FormModel>
					<Table
						class="app-source"
						bordered
						rowKey={(record: any) => record.id}
						loading={{ wrapperClassName: 'ant-spin-64', spinning: source.loading }}
						columns={this.column}
						dataSource={source.dataSource}
						scroll={{ x: 1400 }}
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
									<AppAvatar
										size={40}
										src={`${props.avatar}?x-oss-process=style/resize-1-1`}
										username={props.nickname}
										rounded={false}
										style={{ margin: '0 auto', cursor: 'pointer', borderRadius: '4px' }}
									></AppAvatar>
								),
								role: (props: NodeUserResponse) => {
									return props.role.map(k => <Tag color="cyan">{k.name}</Tag>)
								},
								status: (props: NodeUserResponse) => <AppSatus status={props.status}></AppSatus>,
								action: (props: NodeUserResponse) => (
									<Button.Group>
										<AppPopover
											onChange={(option: { key: string }) => this.onChange(option.key, props.uid)}
										>
											<Menu.Item key="update" style={{ color: '#1890ff' }}>
												<Icon type="edit"></Icon>
												<span>编辑</span>
											</Menu.Item>
											<Menu.Item key="reset" style={{ color: '#f5222d' }}>
												<Icon type="reload"></Icon>
												<span>重置密码</span>
											</Menu.Item>
										</AppPopover>
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
			</AppRootNode>
		)
	}
}
