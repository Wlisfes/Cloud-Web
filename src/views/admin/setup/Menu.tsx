import { Vue, Component } from 'vue-property-decorator'
import { Button, Table, Icon, Tag, Popconfirm, notification } from 'ant-design-vue'
import { NodeMenu } from '@/views/admin/setup/common'
import { AppSatus } from '@/components/common'
import { nodeMenus, nodeDeleteMenu } from '@/api'
import { HttpStatus, Source, NodeMenuParameter } from '@/types'

@Component
export default class Menu extends Vue {
	$refs!: { nodeMenu: NodeMenu }

	private source: Source<Array<NodeMenuParameter>> = {
		column: [
			{ title: '节点名称', dataIndex: 'name' },
			{ title: '节点图标', align: 'center', width: '8%', scopedSlots: { customRender: 'icon' } },
			{ title: '节点类型', align: 'center', width: '8%', scopedSlots: { customRender: 'type' } },
			{ title: '节点路由', align: 'center', scopedSlots: { customRender: 'router' } },
			{ title: '排序号', dataIndex: 'order', align: 'center', width: '7%' },
			{ title: '节点状态', align: 'center', width: '8%', scopedSlots: { customRender: 'status' } },
			{ title: '创建时间', dataIndex: 'createTime', width: '14.5%', align: 'center' },
			{ title: '操作', align: 'center', width: '15%', scopedSlots: { customRender: 'action' } }
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

	/**删除菜单**/
	private async onDelete(id: number) {
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

	protected created() {
		this.source.initSource()
	}

	protected render() {
		const { source } = this

		return (
			<div style={{ padding: '10px' }}>
				<Button onClick={() => this.$refs.nodeMenu.init('create')}>Create</Button>
				<NodeMenu ref="nodeMenu" onReplay={() => this.source.initSource()}></NodeMenu>

				<Table
					class="app-source"
					bordered
					rowKey={(record: any) => record.id}
					loading={source.loading}
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
							type: (props: NodeMenuParameter) => {
								return props.type === 1 ? <Tag color="cyan">目录</Tag> : <Tag color="blue">菜单</Tag>
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
										{props.type === 1 && (
											<Button
												type="link"
												style={{ color: '#52c41a' }}
												onClick={() => this.$refs.nodeMenu.init('create', props.id)}
											>
												新增
											</Button>
										)}
										<Button
											type="link"
											style={{ color: '#1890ff' }}
											onClick={() => this.$refs.nodeMenu.init('update', props.id)}
										>
											编辑
										</Button>
										<Popconfirm
											title={
												<span>
													<span>确定要删除</span>
													<a style={{ color: '#eb2f96', margin: '0 5px' }}>{props.name}</a>
													<span>吗？</span>
												</span>
											}
											placement="topRight"
											ok-text="确定"
											cancel-text="取消"
											onConfirm={() => this.onDelete(props.id)}
										>
											<Button type="link" style={{ color: '#eb2f96' }}>
												删除
											</Button>
										</Popconfirm>
									</Button.Group>
								)
							}
						}
					}}
				></Table>
			</div>
		)
	}
}
