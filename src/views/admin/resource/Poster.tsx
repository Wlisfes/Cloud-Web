import { Vue, Component } from 'vue-property-decorator'
import { Button, FormModel, Select, Tag, Table, Icon, Dropdown, Menu, notification } from 'ant-design-vue'
import { AppRootNode, AppCutover, AppSatus } from '@/components/common'
import { NodeCover } from '@/views/admin/resource/common'
import { nodePosters, nodePosterCutover, nodeDeletePoster } from '@/api'
import { init as initCommon } from '@/components/instance/init-common'
import { init as initCropper } from '@/components/instance/init-cropper'
import { HttpStatus, Source, NodePosterNodeResponse } from '@/types'
import style from '@/style/admin/admin.poster.module.less'

type SourceOption = {
	option: {
		status: number | undefined
		type: number | undefined
	}
}
type cropperKey = 'avatar' | 'upload' | 'cover' | 'photo'

@Component
export default class Poster extends Vue {
	private source: Source<Array<NodePosterNodeResponse>> & SourceOption = {
		column: [
			{ title: '图片预览', align: 'center', width: 150, scopedSlots: { customRender: 'cover' } },
			{ title: '图片类型', align: 'center', width: 150, scopedSlots: { customRender: 'type' } },
			{ title: '图片地址', align: 'center', width: '12%', scopedSlots: { customRender: 'path' } },
			{ title: '图片备注', dataIndex: 'comment', align: 'center' },
			{ title: '图片状态', align: 'center', width: '12%', scopedSlots: { customRender: 'status' } },
			{ title: '创建时间', dataIndex: 'createTime', align: 'center', width: '20%' },
			{ title: '操作', align: 'center', width: '12%', scopedSlots: { customRender: 'action' } }
		],
		page: 1,
		size: 10,
		total: 0,
		sizeOption: ['10', '20', '30', '40', '50'],
		showSize: true,
		loading: true,
		dataSource: [],
		option: {
			status: undefined,
			type: undefined
		},
		initSource: async () => {
			try {
				this.source.loading = true
				const { source } = this
				const { code, data } = await nodePosters({
					page: source.page,
					size: source.size,
					status: source.option.status,
					type: source.option.type
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
			this.source.initSource()
		},
		onReset: () => {
			this.source.option.status = undefined
			this.source.option.type = undefined
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
	}

	/**删除图床**/
	private nodeDeletePoster(id: number) {
		initCommon().then(node => {
			node.$once('close', (done: Function) => done())
			node.$once('submit', (done: Function) => {
				nodeDeletePoster({ id }).then(({ code, data }) => {
					if (code === HttpStatus.OK) {
						done()
						this.source.loading = true
						notification.success({ message: data.message, description: '' })
						this.source.initSource()
					}
				})
			})
		})
	}

	/**切换图床状态**/
	private async nodePosterCutover(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodePosterCutover({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
			}
			this.source.initSource()
		} catch (e) {
			this.source.onClose()
		}
	}

	/**新增图床**/
	private onInitCropper(key: cropperKey) {
		const Map = { avatar: 1, cover: 16 / 9, photo: 1, upload: 1 }
		initCropper({
			path: key,
			ratio: Map[key]
		}).then(node => {
			node.$once('close', (done: Function) => done())
			node.$once('change', (done: Function) => done())
			node.$once('submit', ({ done }: { done: Function }) => {
				this.source.initSource()
				done()
			})
		})
	}

	protected render() {
		const { source } = this

		const maCursor = { margin: 0, cursor: 'pointer', width: '100%', textAlign: 'center' }
		return (
			<AppRootNode>
				<div class={style['app-conter']}>
					<FormModel layout="inline" class={style['node-source']}>
						<div class="node-source-item inline-50">
							<FormModel.Item>
								<Select
									v-model={source.option.type}
									allowClear
									placeholder="图片类型"
									style={{ width: '150px' }}
								>
									<Select.Option value={1}>avatar</Select.Option>
									<Select.Option value={2}>upload</Select.Option>
									<Select.Option value={3}>cover</Select.Option>
									<Select.Option value={4}>photo</Select.Option>
								</Select>
							</FormModel.Item>
							<FormModel.Item>
								<Select
									v-model={source.option.status}
									allowClear
									placeholder="图片状态"
									style={{ width: '150px' }}
								>
									<Select.Option value={0}>已禁用</Select.Option>
									<Select.Option value={1}>已启用</Select.Option>
									<Select.Option value={2}>已删除</Select.Option>
								</Select>
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
							<Dropdown trigger={['click']}>
								<Button type="primary">新增</Button>
								<Menu slot="overlay" onClick={(e: { key: cropperKey }) => this.onInitCropper(e.key)}>
									<Menu.Item key="avatar">
										<Tag color="pink" style={maCursor}>
											Avatar
										</Tag>
									</Menu.Item>
									<Menu.Item key="upload">
										<Tag color="cyan" style={maCursor}>
											Upload
										</Tag>
									</Menu.Item>
									<Menu.Item key="cover">
										<Tag color="blue" style={maCursor}>
											Cover
										</Tag>
									</Menu.Item>
									<Menu.Item key="photo">
										<Tag color="purple" style={maCursor}>
											Photo
										</Tag>
									</Menu.Item>
								</Menu>
							</Dropdown>
						</FormModel.Item>
						<FormModel.Item style={{ marginRight: 0 }}>
							<Button onClick={() => this.source.initSource()}>刷新</Button>
						</FormModel.Item>
					</FormModel>

					<Table
						class="app-source is-title"
						bordered
						rowKey={(record: any) => record.id}
						loading={{ wrapperClassName: 'ant-spin-64', spinning: source.loading }}
						columns={source.column}
						dataSource={source.dataSource}
						scroll={{ x: 840 }}
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
								cover: (props: NodePosterNodeResponse) => (
									<div class={style['app-conter-cover']}>
										<NodeCover url={props.url} type={props.type}></NodeCover>
									</div>
								),
								path: (props: NodePosterNodeResponse) => (
									<a target="_blank" href={props.url}>
										<Tag color="purple">大图预览</Tag>
									</a>
								),
								type: (props: NodePosterNodeResponse) => {
									return props.type === 1 ? (
										<Tag color="pink">Avatar</Tag>
									) : props.type === 2 ? (
										<Tag color="cyan">Upload</Tag>
									) : props.type === 3 ? (
										<Tag color="blue">Cover</Tag>
									) : (
										<Tag color="purple">Photo</Tag>
									)
								},
								status: (props: NodePosterNodeResponse) => <AppSatus status={props.status}></AppSatus>,
								action: (props: NodePosterNodeResponse) => (
									<Button.Group>
										<Button type="link" onClick={() => this.nodePosterCutover(props.id)}>
											<AppCutover status={props.status}></AppCutover>
										</Button>
										<Button type="link" onClick={() => this.nodeDeletePoster(props.id)}>
											<span style={{ color: '#ff4d4f' }}>删除</span>
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
