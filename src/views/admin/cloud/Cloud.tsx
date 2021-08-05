import { Vue, Component } from 'vue-property-decorator'
import { Table, Tag, Button, notification } from 'ant-design-vue'
import { NodeCloud } from '@/views/admin/cloud/common'
import { AppCutover, AppSatus } from '@/components/common'
import { nodeClouds, nodeCloudCutover, nodeDeleteCloud } from '@/api'
import { HttpStatus, Source, NodeCloud as NodeCloudState } from '@/types'
import style from '@/style/admin/admin.cloud.module.less'

@Component
export default class Cloud extends Vue {
	$refs!: { nodeCloud: NodeCloud }

	private source: Source<Array<NodeCloudState>> = {
		column: [
			{ title: '标题', dataIndex: 'title' },
			{ title: '封面', align: 'center', width: 150, scopedSlots: { customRender: 'cover' } },
			{ title: '排序号', dataIndex: 'order', align: 'center' },
			{ title: '分类状态', align: 'center', scopedSlots: { customRender: 'status' } },
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

	protected render() {
		const { source } = this
		return (
			<div class={style['app-conter']}>
				<Button onClick={() => this.$refs.nodeCloud.init('create')}>Create</Button>
				<NodeCloud ref="nodeCloud" onReplay={() => {}}></NodeCloud>

				<Table
					class="app-source"
					bordered
					rowKey={(record: any) => record.id}
					loading={source.loading}
					columns={source.column}
					dataSource={source.dataSource}
					// scroll={{ x: 800 }}
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
							status: (props: NodeCloudState) => <AppSatus status={props.status}></AppSatus>,
							cover: (props: NodeCloudState) => (
								<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
							)
						}
					}}
				></Table>
			</div>
		)
	}
}
