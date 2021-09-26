import { Vue, Component } from 'vue-property-decorator'
import { Button, FormModel, Select, Spin, notification } from 'ant-design-vue'
import { Image } from 'element-ui'
import { AppRootNode } from '@/components/common'
import { nodePosters } from '@/api'
import { HttpStatus, Source, NodePosterNodeResponse } from '@/types'
import style from '@/style/admin/admin.poster.module.less'

type SourceOption = {
	option: {
		status: number | undefined
		type: number | undefined
	}
}

@Component
export default class Poster extends Vue {
	private source: Source<Array<NodePosterNodeResponse>> & SourceOption = {
		column: [],
		page: 1,
		size: 10,
		total: 0,
		sizeOption: ['5', '10', '15', '20', '30', '40', '50'],
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

	protected render() {
		const { source } = this
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
							<Button type="primary">新增</Button>
						</FormModel.Item>
						<FormModel.Item style={{ marginRight: 0 }}>
							<Button onClick={() => this.source.initSource()}>刷新</Button>
						</FormModel.Item>
					</FormModel>

					<Spin class={`ant-spin-64 ${style['app-spin']}`} spinning={source.loading}>
						<div class={style['node-conter']}>
							{source.dataSource.map(k => (
								<div class={style['node-conter-item']}></div>
							))}
						</div>
					</Spin>
				</div>
			</AppRootNode>
		)
	}
}
