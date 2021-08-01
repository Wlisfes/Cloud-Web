import { Vue, Component } from 'vue-property-decorator'
import { Button, Table, Icon, Tag } from 'ant-design-vue'
import { NodeMenu } from '@/views/admin/setup/common'
import { nodeMenus } from '@/api'
import { HttpStatus, Source, NodeMenuParameter } from '@/types'

@Component
export default class Menu extends Vue {
	$refs!: { nodeMenu: NodeMenu }

	private source: Source<Array<NodeMenuParameter>> = {
		column: [
			{ title: '节点名称', scopedSlots: { customRender: 'name' } },
			{ title: '节点图标', align: 'center', scopedSlots: { customRender: 'icon' } },
			{ title: '节点类型', align: 'center', scopedSlots: { customRender: 'type' } },
			{ title: '节点路由', align: 'center', scopedSlots: { customRender: 'router' } },
			{ title: '排序号', dataIndex: 'order', align: 'center' },
			{ title: '创建时间', dataIndex: 'createTime', align: 'center' },
			{ title: '操作', align: 'center', scopedSlots: { customRender: 'action' } }
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

	protected render() {
		const { source } = this

		return (
			<div style={{ padding: '10px' }}>
				<Button onClick={() => this.$refs.nodeMenu.init()}>Create</Button>
				<NodeMenu ref="nodeMenu" onReplay={() => console.log('onReplay')}></NodeMenu>

				<Table
					class="app-source"
					bordered
					rowKey={(record: any) => record.id}
					loading={source.loading}
					columns={source.column}
					dataSource={source.dataSource}
					scroll={{ x: 800 }}
					pagination={false}
					{...{
						scopedSlots: {
							name: (props: NodeMenuParameter) => <a>{props.name}</a>,
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
							action: (props: NodeMenuParameter) => {
								return (
									<Button.Group>
										<Button type="link" style={{ color: '#52c41a' }}>
											新增
										</Button>
										<Button type="link" style={{ color: '#1890ff' }}>
											编辑
										</Button>
										<Button type="link" style={{ color: '#eb2f96' }}>
											删除
										</Button>
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
