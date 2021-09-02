import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Select, InputNumber, Button, Switch, Spin, notification } from 'ant-design-vue'
import { AppRootNode, AppCover, AppEditor } from '@/components/common'
import { nodeArticle, nodeSources, nodeCreateArticle } from '@/api'
import { HttpStatus, NodeSource } from '@/types'
import style from '@/style/admin/admin.article.common.module.less'

@Component
export default class Create extends Vue {
	$refs!: { form: FormModel }

	private loading: boolean = false
	private sources: NodeSource[] = []
	private state = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: {
			title: '',
			cover: '',
			content: '',
			html: '',
			url: '',
			status: true,
			order: 0,
			source: []
		},
		rules: {
			title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
			cover: [{ required: true, message: '请上传文章封面', trigger: 'blur' }],
			content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
		}
	}

	protected created() {
		this.init()
	}

	/**初始化**/
	public async init() {
		try {
			this.loading = true
			await this.nodeSources()
			this.loading = false
		} catch (e) {
			this.loading = false
		}
	}

	/**标签列表**/
	private async nodeSources() {
		try {
			const { code, data } = await nodeSources({
				page: 1,
				size: 200
			})
			if (code === HttpStatus.OK) {
				this.sources = data.list
			}
		} catch (e) {
			return e
		}
	}

	/**文章信息**/
	private async nodeArticle(id: number) {
		try {
			const { code, data } = await nodeArticle({ id })
			if (code === HttpStatus.OK) {
				this.state.form = Object.assign(this.state.form, {
					title: data.title,
					cover: data.cover,
					content: data.content,
					html: data.html,
					url: data.url,
					status: data.status === 1,
					order: data.order,
					source: data.source.map(k => k.id)
				})
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**创建文章**/
	private async nodeCreateArticle() {
		try {
			this.loading = true
			const { form } = this.state
			const { code, data } = await nodeCreateArticle({
				title: form.title,
				cover: form.cover,
				content: form.content,
				html: form.html,
				url: form.url,
				status: +form.status,
				order: form.order,
				source: form.source
			})
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
				this.$router.push('/admin/article')
			}
		} catch (e) {
			this.loading = false
		}
	}

	/**组件提交事件**/
	private onSubmit() {
		this.$refs.form.validate(async valid => {
			if (valid) {
				this.nodeCreateArticle()
			}
		})
	}

	protected render() {
		const { form, rules, labelCol, wrapperCol } = this.state

		return (
			<AppRootNode class={style['app-conter']}>
				<Spin size="large" class="ant-spin-64" spinning={this.loading}>
					<FormModel
						ref="form"
						class={`app-form ${style['node-source']}`}
						{...{ props: { model: form, rules } }}
						labelCol={labelCol}
						wrapperCol={wrapperCol}
					>
						<div class="node-source-item inline-920">
							<FormModel.Item label="文章标题" prop="title">
								<Input v-model={form.title} placeholder="文章标题"></Input>
							</FormModel.Item>
							<FormModel.Item label="标签">
								<Select
									v-model={form.source}
									allowClear
									show-search
									maxTagCount={3}
									mode="multiple"
									placeholder="标签"
								>
									{this.sources.map(k => {
										return (
											<Select.Option key={k.id} value={k.id} disabled={!k.status}>
												{k.name}
											</Select.Option>
										)
									})}
								</Select>
							</FormModel.Item>
						</div>
						<div class="node-source-item inline-790">
							<FormModel.Item label="跳转链接">
								<Input v-model={form.url} placeholder="跳转链接"></Input>
							</FormModel.Item>

							<div class="inline-children inline-480">
								<FormModel.Item label="排序号">
									<InputNumber v-model={form.order} placeholder="排序号"></InputNumber>
								</FormModel.Item>
								<FormModel.Item label="文章状态" prop="status">
									<Switch
										v-model={form.status}
										checked-children="开"
										un-checked-children="关"
										default-checked
									></Switch>
								</FormModel.Item>
							</div>
						</div>
						<div class="node-source-item inline-320">
							<FormModel.Item label="文章封面" prop="cover">
								<AppCover
									path="cover"
									ratio={16 / 9}
									cover={form.cover}
									onSubmit={(props: { path: string }) => (form.cover = props.path)}
								></AppCover>
							</FormModel.Item>
							<FormModel.Item class="node-source-submit">
								<Button>取消</Button>
								<Button
									type="primary"
									style={{ marginLeft: '10px' }}
									disabled={this.loading}
									loading={this.loading}
									onClick={this.onSubmit}
								>
									确定
								</Button>
							</FormModel.Item>
						</div>
						<div class="node-source-editor">
							<FormModel.Item label="文章内容" prop="content">
								<AppEditor
									content={form.content}
									onChange={({ content, html }: { content: string; html: string }) => {
										form.html = html
										form.content = content
									}}
								></AppEditor>
							</FormModel.Item>
						</div>
					</FormModel>
				</Spin>
			</AppRootNode>
		)
	}
}
