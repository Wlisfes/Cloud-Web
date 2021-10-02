import { Vue, Component } from 'vue-property-decorator'
import { Button, FormModel, Select, Tag, Table, Tooltip, notification } from 'ant-design-vue'
import { AppRootNode } from '@/components/common'
import { NodeChunk } from '@/views/admin/setup/common'
import { nodeChunks } from '@/api'
import { HttpStatus, Source, NodeChunkNodeResponse } from '@/types'
import style from '@/style/admin/admin.chunk.module.less'
type SourceOption = {
	option: {
		status: number | undefined
	}
}

@Component
export default class Chunk extends Vue {
	$refs!: { nodeChunk: NodeChunk }

	private source: Source<Array<NodeChunkNodeResponse>> & SourceOption = {
		column: [
			{ title: '资源名称', align: 'center', width: 150, scopedSlots: { customRender: 'name' } },
			{ title: '资源地址', align: 'center', width: '15%', scopedSlots: { customRender: 'url' } },
			{ title: '资源版本号', dataIndex: 'version', align: 'center', width: '12%' },
			{ title: '资源状态', align: 'center', width: '12%', scopedSlots: { customRender: 'status' } },
			{ title: '创建时间', dataIndex: 'createTime', align: 'center', width: '20%' }
		],
		page: 1,
		size: 10,
		total: 0,
		sizeOption: ['10', '20', '30', '40', '50'],
		showSize: true,
		loading: true,
		dataSource: [],
		option: {
			status: undefined
		},
		initSource: async () => {
			try {
				this.source.loading = true
				const { source } = this
				const { code, data } = await nodeChunks({
					page: source.page,
					size: source.size,
					status: source.option.status
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

	protected render() {
		const { source } = this
		return (
			<AppRootNode>
				<div class={style['app-conter']}>
					<NodeChunk ref="nodeChunk" onReplay={() => this.source.initSource()}></NodeChunk>
					<FormModel layout="inline" class={style['node-source']}>
						<div class="node-source-item inline-50">
							<FormModel.Item>
								<Select
									v-model={source.option.status}
									allowClear
									placeholder="版本资源状态"
									style={{ width: '240px' }}
								>
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
							<Button type="primary" onClick={() => this.$refs.nodeChunk.init()}>
								新增
							</Button>
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
								name: (props: NodeChunkNodeResponse) => (
									<div class={`app-ellipsis ${style['app-conter-pointer']}`}>
										<Tooltip title={props.name}>{props.name}</Tooltip>
									</div>
								),
								url: (props: NodeChunkNodeResponse) => (
									<Button type="link" v-copy={props.url}>
										<span>复制地址</span>
									</Button>
								),
								status: (props: NodeChunkNodeResponse) => {
									return props.status === 1 ? (
										<Tag color="green">当前版本</Tag>
									) : (
										<Tag color="purple">历史版本</Tag>
									)
								}
							}
						}}
					></Table>
				</div>
			</AppRootNode>
		)
	}
}
