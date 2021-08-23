import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Button, Table, Icon, Tag, Menu as BaseMenu, notification } from 'ant-design-vue'
import { NodeMenu } from '@/views/admin/setup/common'
import { AppRootNode, AppSatus, AppPopover, AppCutover } from '@/components/common'
import { nodeMenus, nodeDeleteMenu, nodeMenuCutover } from '@/api'
import { HttpStatus, Source, NodeMenuParameter } from '@/types'

@Component
export default class Menu extends Vue {
	$refs!: { nodeMenu: NodeMenu }

	private source: Source<Array<NodeMenuParameter>> = {
		column: [
			{ title: '节点名称', scopedSlots: { customRender: 'name' } },
			{ title: '节点图标', align: 'center', width: '8%', scopedSlots: { customRender: 'icon' } },
			{ title: '节点类型', align: 'center', width: '8%', scopedSlots: { customRender: 'type' } },
			{ title: '节点状态', align: 'center', width: '8%', scopedSlots: { customRender: 'status' } },
			{ title: '节点路由', align: 'center', scopedSlots: { customRender: 'router' } },
			{ title: '排序号', dataIndex: 'order', align: 'center', width: '7%' },
			{ title: '创建时间', dataIndex: 'createTime', width: '16%', align: 'center' },
			{ title: '操作', align: 'center', width: '14%', scopedSlots: { customRender: 'action' } }
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
				const { code, data } = await nodeMenus()
				if (code === HttpStatus.OK) {
					this.source.dataSource = data
				}
			} catch (e) {}
			this.source.onClose()
		},
		onClose: () => {
			this.source.loading = false
		}
	}

	protected created() {
		this.source.initSource()
	}

	/**删除菜单**/
	private async nodeDeleteMenu(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeDeleteMenu({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
				this.source.initSource()
			}
		} catch (e) {
			this.source.loading = false
		}
	}

	/**切换菜单状态**/
	private async nodeMenuCutover(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeMenuCutover({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
				this.source.initSource()
			}
		} catch (e) {
			this.source.loading = false
		}
	}

	/**操作**/
	private onChange(key: string, id: number) {
		switch (key) {
			case 'create':
				this.$refs.nodeMenu.init('create', id)
				break
			case 'update':
				this.$refs.nodeMenu.init('update', id)
				break
			case 'delete':
				this.nodeDeleteMenu(id)
				break
		}
	}

	protected render() {
		const { source } = this
		return (
			<AppRootNode>
				<NodeMenu ref="nodeMenu" onReplay={() => this.source.initSource()}></NodeMenu>
				<FormModel layout="inline" style={{ paddingBottom: '10px' }}>
					<FormModel.Item>
						<Button type="primary" onClick={() => this.$refs.nodeMenu.init('create')}>
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
					columns={source.column}
					dataSource={source.dataSource}
					scroll={{ x: 1000 }}
					pagination={false}
					expandIcon={(props: any) => {
						if (props.record.children?.length > 0) {
							return props.expanded ? (
								<div
									style={{ marginLeft: '8px' }}
									class="ant-table-row-expand-icon ant-table-row-expanded"
									onClick={props.onExpand}
								></div>
							) : (
								<div
									style={{ marginLeft: '8px' }}
									class="ant-table-row-expand-icon ant-table-row-collapsed"
									onClick={props.onExpand}
								></div>
							)
						}
						return <span style={{ paddingLeft: '20px' }}></span>
					}}
					{...{
						scopedSlots: {
							name: (props: NodeMenuParameter) => {
								return (
									<span>
										<span>{props.name}</span>
										{props.visible === 0 && (
											<Tag color="pink" style={{ marginLeft: '5px' }}>
												隐藏
											</Tag>
										)}
									</span>
								)
							},
							type: (props: NodeMenuParameter) => {
								return props.type === 1 ? <Tag color="cyan">目录</Tag> : <Tag color="red">菜单</Tag>
							},
							router: (props: NodeMenuParameter) => {
								return !!props.router ? (
									<router-link to={props.router}>{props.router}</router-link>
								) : null
							},
							icon: (props: NodeMenuParameter) => {
								return !!props.icon ? (
									<Icon type={props.icon} style={{ fontSize: '20px', margin: '6px' }}></Icon>
								) : null
							},
							status: (props: NodeMenuParameter) => <AppSatus status={props.status}></AppSatus>,
							action: (props: NodeMenuParameter) => {
								return (
									<Button.Group>
										<AppPopover
											onChange={(option: { key: string }) => this.onChange(option.key, props.id)}
										>
											{props.type === 1 && (
												<BaseMenu.Item key="create" style={{ color: '#52c41a' }}>
													<Icon type="folder-add"></Icon>
													<span>新增</span>
												</BaseMenu.Item>
											)}
											<BaseMenu.Item key="update" style={{ color: '#1890ff' }}>
												<Icon type="edit"></Icon>
												<span>编辑</span>
											</BaseMenu.Item>
											<BaseMenu.Item key="delete" style={{ color: '#eb2f96' }}>
												<Icon type="delete"></Icon>
												<span>删除</span>
											</BaseMenu.Item>
										</AppPopover>
										<Button type="link" onClick={() => this.nodeMenuCutover(props.id)}>
											<AppCutover status={props.status}></AppCutover>
										</Button>
									</Button.Group>
								)
							}
						}
					}}
				></Table>
			</AppRootNode>
		)
	}
}
