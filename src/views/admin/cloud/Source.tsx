import { Vue, Component } from 'vue-property-decorator'
import { Table, Tag, Button, notification } from 'ant-design-vue'
import { NodeSource } from '@/views/admin/cloud/common'
import { AppRootNode, AppCutover, AppSatus } from '@/components/common'
import { nodeCloudSources, nodeCloudSourceCutover, nodeDeleteCloudSource } from '@/api'
import { HttpStatus, Source as SourceState, NodeCloudSource } from '@/types'
import style from '@/style/admin/admin.source.module.less'

@Component
export default class Source extends Vue {
	$refs!: { nodeSource: NodeSource }

	private source: SourceState<Array<NodeCloudSource>> = {
		column: [
			{ title: '分类名称', width: '20%', scopedSlots: { customRender: 'name' } },
			{ title: '备注', dataIndex: 'comment', align: 'center' },
			{ title: '排序号', dataIndex: 'order', width: '10%', align: 'center' },
			{ title: '分类状态', align: 'center', width: '10%', scopedSlots: { customRender: 'status' } },
			{ title: '创建时间', dataIndex: 'createTime', align: 'center', width: '18.75%' },
			{ title: '操作', align: 'center', width: '18.75%', scopedSlots: { customRender: 'action' } }
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
				const { code, data } = await nodeCloudSources({
					page: this.source.page,
					size: this.source.size
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
			this.$nextTick(() => this.source.initSource())
		}
	}

	protected created() {
		this.source.initSource()
	}

	/**删除分类标签**/
	private async nodeDeleteCloudSource(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeDeleteCloudSource({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
				this.source.initSource()
			}
		} catch (e) {
			this.source.loading = false
		}
	}

	/**切换分类标签状态**/
	private async nodeCloudSourceCutover(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeCloudSourceCutover({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
			}
			this.source.initSource()
		} catch (e) {
			this.source.onClose()
		}
	}

	protected render() {
		const { source } = this
		return (
			<AppRootNode>
				<div class={style['app-conter']}>
					<Button onClick={() => this.$refs.nodeSource.init('create')}>Create</Button>
					<NodeSource ref="nodeSource" onReplay={() => this.source.initSource()}></NodeSource>

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
								name: (props: NodeCloudSource) => (
									<Tag color={props.color} style={{ marginLeft: '6px' }}>
										{props.name}
									</Tag>
								),
								status: (props: NodeCloudSource) => <AppSatus status={props.status}></AppSatus>,
								action: (props: NodeCloudSource) => (
									<Button.Group>
										<Button
											type="link"
											onClick={() => this.$refs.nodeSource.init('update', props.id)}
										>
											编辑
										</Button>
										<Button type="link" onClick={() => this.nodeCloudSourceCutover(props.id)}>
											<AppCutover status={props.status}></AppCutover>
										</Button>
										<Button
											type="link"
											style={{ color: '#ff4d4f' }}
											onClick={() => this.nodeDeleteCloudSource(props.id)}
										>
											删除
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
