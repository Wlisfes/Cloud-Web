import { Vue, Component } from 'vue-property-decorator'
import { Button, FormModel, Select, Tag, Table, Tooltip, Icon, notification } from 'ant-design-vue'
import { AppRootNode } from '@/components/common'
import { NodeLogger } from '@/views/admin/setup/common'
import { nodeLoggers, nodeDeleteLogger } from '@/api'
import { init } from '@/components/instance/init-common'
import { HttpStatus, Source, LoggerResponse } from '@/types'
import style from '@/style/admin/admin.logger.module.less'
type SourceOption = {
	option: {
		type: number | undefined
	}
}

@Component
export default class Logs extends Vue {
	$refs!: { nodeLogger: NodeLogger }

	private source: Source<Array<LoggerResponse>> & SourceOption = {
		column: [
			{ title: '序号', align: 'center', width: 80, dataIndex: 'id' },
			{ title: '来源ip', align: 'center', width: 120, dataIndex: 'ip' },
			{ title: '请求地址', align: 'center', scopedSlots: { customRender: 'path' } },
			{ title: '请求类型', align: 'center', width: 80, dataIndex: 'method' },
			{ title: '请求状态', width: 100, align: 'center', scopedSlots: { customRender: 'type' } },
			{ title: '状态码', align: 'center', width: 80, dataIndex: 'code' },
			{ title: '状态描述', align: 'center', scopedSlots: { customRender: 'message' } },
			{ title: '创建时间', dataIndex: 'createTime', align: 'center', width: 180 },
			{ title: '操作', align: 'center', width: 130, scopedSlots: { customRender: 'action' } }
		],
		page: 1,
		size: 10,
		total: 0,
		sizeOption: ['10', '20', '30', '40', '50'],
		showSize: true,
		loading: true,
		dataSource: [],
		option: {
			type: undefined
		},
		initSource: async () => {
			try {
				this.source.loading = true
				const { source } = this
				const { code, data } = await nodeLoggers({
					page: source.page,
					size: source.size,
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

	/**删除Logger**/
	private nodeDeleteLogger(id: number) {
		init({
			name: 'Logger-Common',
			content: (
				<div style={{ display: 'flex', alignItems: 'center', marginBottom: '45px' }}>
					<Icon type="exclamation-circle" style={{ fontSize: '32px', color: '#ff4d4f' }} />
					<h2 style={{ margin: '0 0 0 10px', fontSize: '18px' }}>确定要删除吗？</h2>
				</div>
			)
		})
			.then(({ self, done }) => {
				self.loading = true
				nodeDeleteLogger({ id }).then(({ code, data }) => {
					if (code === HttpStatus.OK) {
						done()
						this.source.loading = true
						notification.success({ message: data.message, description: '' })
						this.source.initSource()
					}
				})
			})
			.catch(({ done }) => done())
	}

	protected created() {
		this.source.initSource()
	}

	protected render() {
		const { source } = this
		return (
			<AppRootNode>
				<div class={style['app-conter']}>
					<NodeLogger ref="nodeLogger"></NodeLogger>
					<FormModel layout="inline" class={style['node-source']}>
						<div class="node-source-item inline-50">
							<FormModel.Item>
								<Select
									v-model={source.option.type}
									allowClear
									placeholder="Logger类型"
									style={{ width: '240px' }}
								>
									<Select.Option value={1}>Success</Select.Option>
									<Select.Option value={2}>Fail</Select.Option>
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
								path: (props: LoggerResponse) => (
									<div class={`app-ellipsis ${style['app-conter-pointer']}`}>
										<Tooltip title={props.path}>{props.path}</Tooltip>
									</div>
								),
								message: (props: LoggerResponse) => (
									<div class={`app-ellipsis ${style['app-conter-pointer']}`}>
										<Tooltip title={props.message}>{props.message}</Tooltip>
									</div>
								),
								type: (props: LoggerResponse) => {
									return props.type === 1 ? (
										<Tag color="green">success</Tag>
									) : (
										<Tag color="pink">error</Tag>
									)
								},
								action: (props: LoggerResponse) => (
									<Button.Group>
										<Button type="link" onClick={() => this.$refs.nodeLogger.init(props.id)}>
											查看
										</Button>
										<Button type="link" onClick={() => this.nodeDeleteLogger(props.id)}>
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
