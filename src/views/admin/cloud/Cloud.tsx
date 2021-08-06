import { Vue, Component } from 'vue-property-decorator'
import { Table, Button, Tooltip, Tag, Menu, Icon, notification } from 'ant-design-vue'
import { Image } from 'element-ui'
import { NodeCloud } from '@/views/admin/cloud/common'
import { AppRootNode, AppPopover, AppCutover, AppSatus } from '@/components/common'
import { nodeClouds, nodeCloudCutover, nodeDeleteCloud } from '@/api'
import { HttpStatus, Source, NodeCloud as NodeCloudState } from '@/types'
import style from '@/style/admin/admin.cloud.module.less'

@Component
export default class Cloud extends Vue {
	$refs!: { nodeCloud: NodeCloud }

	private source: Source<Array<NodeCloudState>> = {
		column: [
			{ title: '媒体封面', align: 'center', width: 125, scopedSlots: { customRender: 'cover' } },
			{ title: '媒体标题', width: '18%', scopedSlots: { customRender: 'title' } },
			{ title: '媒体类型', align: 'center', width: '7.5%', scopedSlots: { customRender: 'type' } },
			{ title: '媒体描述', scopedSlots: { customRender: 'description' } },
			{ title: '排序号', dataIndex: 'order', align: 'center', width: '7.5%' },
			{ title: '媒体状态', align: 'center', width: '7.5%', scopedSlots: { customRender: 'status' } },
			{ title: '创建时间', dataIndex: 'createTime', align: 'center', width: '13.5%' },
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
				this.source.loading = true
				const { code, data } = await nodeClouds({
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

	/**删除媒体**/
	private async nodeDeleteCloud(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeDeleteCloud({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
				this.source.initSource()
			}
		} catch (e) {
			this.source.loading = false
		}
	}

	/**切换媒体状态**/
	private async nodeCloudCutover(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeCloudCutover({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
			}
			this.source.initSource()
		} catch (e) {
			this.source.onClose()
		}
	}

	/**操作**/
	private onChange(key: string, id: number) {
		switch (key) {
			case 'update':
				this.$refs.nodeCloud.init('update', id)
				break
			case 'delete':
				this.nodeDeleteCloud(id)
				break
			case 'preview':
				// this.$refs.nodeUserRole.init(uid)
				break
		}
	}

	protected render() {
		const { source } = this
		return (
			<AppRootNode>
				<div class={style['app-conter']}>
					<Button onClick={() => this.$refs.nodeCloud.init('create')}>Create</Button>
					<NodeCloud ref="nodeCloud" onReplay={() => this.source.initSource()}></NodeCloud>

					<Table
						class="app-source is-title"
						bordered
						rowKey={(record: any) => record.id}
						loading={source.loading}
						columns={source.column}
						dataSource={source.dataSource}
						scroll={{ x: 1080 }}
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
								cover: (props: NodeCloudState) => (
									<div class={style['app-conter-cover']}>
										<Image
											alt={props.title}
											fit="cover"
											src={`${props.cover}?x-oss-process=style/resize`}
											style={{ width: '96px', height: '54px', cursor: 'pointer' }}
										></Image>
									</div>
								),
								title: (props: NodeCloudState) => (
									<div class={`app-ellipsis-2 ${style['app-conter-pointer']}`}>
										<Tooltip title={props.title}>{props.title}</Tooltip>
									</div>
								),
								type: (props: NodeCloudState) => {
									return props.type === 1 ? (
										<Tag color="red">单集媒体</Tag>
									) : (
										<Tag color="cyan">多集媒体</Tag>
									)
								},
								description: (props: NodeCloudState) => (
									<div class={`app-ellipsis-2 ${style['app-conter-pointer']}`}>
										<Tooltip title={props.description}>{props.description}</Tooltip>
									</div>
								),
								status: (props: NodeCloudState) => <AppSatus status={props.status}></AppSatus>,
								action: (props: NodeCloudState) => (
									<Button.Group>
										<AppPopover
											onChange={(option: { key: string }) => this.onChange(option.key, props.id)}
										>
											<Menu.Item key="preview" style={{ color: '#13c2c2' }}>
												<Icon type="video-camera"></Icon>
												<span>预览</span>
											</Menu.Item>
											<Menu.Item key="update" style={{ color: '#1890ff' }}>
												<Icon type="edit"></Icon>
												<span>编辑</span>
											</Menu.Item>
											<Menu.Item key="delete" style={{ color: '#ff4d4f' }}>
												<Icon type="delete"></Icon>
												<span>删除</span>
											</Menu.Item>
										</AppPopover>
										<Button type="link" onClick={() => this.nodeCloudCutover(props.id)}>
											<AppCutover status={props.status}></AppCutover>
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
