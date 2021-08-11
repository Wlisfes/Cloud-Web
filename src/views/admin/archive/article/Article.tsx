import { Vue, Component } from 'vue-property-decorator'
import { Table, Button, Tooltip, Tag, Menu, Icon, FormModel, Input, Select, notification } from 'ant-design-vue'
import { Image } from 'element-ui'
import { AppRootNode, AppSatus, AppPopover, AppCutover } from '@/components/common'
import { nodeArticles, nodeArticleCutover, nodeDeleteArticle } from '@/api'
import { HttpStatus, Source, NodeArticle } from '@/types'
import style from '@/style/admin/admin.article.module.less'

type SourceOption = {
	option: {
		status: number | undefined
		title: string | undefined
	}
}

@Component
export default class Article extends Vue {
	private source: Source<Array<NodeArticle>> & SourceOption = {
		column: [
			{ title: '文章封面', align: 'center', width: 125, scopedSlots: { customRender: 'cover' } },
			{ title: '文章标题', scopedSlots: { customRender: 'title' } },
			{ title: '浏览量', dataIndex: 'browse', align: 'center', width: '8.5%' },
			{ title: '排序号', dataIndex: 'order', align: 'center', width: '8.5%' },
			{ title: '文章状态', align: 'center', width: '8.5%', scopedSlots: { customRender: 'status' } },
			{ title: '创建时间', dataIndex: 'createTime', align: 'center', width: '15%' },
			{ title: '操作', align: 'center', width: '15%', scopedSlots: { customRender: 'action' } }
		],
		page: 1,
		size: 10,
		total: 0,
		sizeOption: ['5', '10', '15', '20', '30', '40', '50'],
		showSize: true,
		loading: true,
		dataSource: [],
		option: {
			status: undefined,
			title: undefined
		},
		initSource: async () => {
			try {
				this.source.loading = true
				const { source } = this
				const { code, data } = await nodeArticles({
					page: source.page,
					size: source.size,
					status: source.option.status,
					title: source.option.title
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
			this.source.option.title = undefined
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

	/**删除文章**/
	private async nodeDeleteArticle(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeDeleteArticle({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
				this.source.initSource()
			}
		} catch (e) {
			this.source.loading = false
		}
	}

	/**切换文章状态**/
	private async nodeArticleCutover(id: number) {
		try {
			this.source.loading = true
			const { code, data } = await nodeArticleCutover({ id })
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
				this.$router.push(`/admin/article/update?id=${id}`)
				break
			case 'delete':
				this.nodeDeleteArticle(id)
				break
			case 'preview':
				// this.$refs.player.init(id)
				break
		}
	}

	protected render() {
		const { source } = this
		return (
			<AppRootNode class={style['app-conter']}>
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
							cover: (props: NodeArticle) => (
								<div class={style['app-conter-cover']}>
									<Image
										alt={props.title}
										fit="cover"
										src={`${props.cover}?x-oss-process=style/resize`}
										style={{ width: '96px', height: '54px', cursor: 'pointer' }}
									></Image>
								</div>
							),
							title: (props: NodeArticle) => (
								<div class={`app-ellipsis-2 ${style['app-conter-pointer']}`}>
									<Tooltip title={props.title}>{props.title}</Tooltip>
								</div>
							),
							status: (props: NodeArticle) => <AppSatus status={props.status}></AppSatus>,
							action: (props: NodeArticle) => (
								<Button.Group>
									<AppPopover
										onChange={(option: { key: string }) => this.onChange(option.key, props.id)}
									>
										<Menu.Item key="preview" style={{ color: '#13c2c2' }}>
											<Icon type="eye"></Icon>
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
									<Button type="link" onClick={() => this.nodeArticleCutover(props.id)}>
										<AppCutover status={props.status}></AppCutover>
									</Button>
								</Button.Group>
							)
						}
					}}
				></Table>
			</AppRootNode>
		)
	}
}
