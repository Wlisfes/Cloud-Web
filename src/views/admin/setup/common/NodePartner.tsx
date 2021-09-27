import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, Spin, notification } from 'ant-design-vue'
import { AppEditor } from '@/components/common'
import { NodeAppCover } from '@/components/multiple'
import { HttpStatus } from '@/types'

@Component
export default class NodePartner extends Vue {
	$refs!: { formModel: FormModel }

	private loading: boolean = true
	private visible: boolean = false
	private active: string = 'create'
	private labelCol = { span: 4, style: { width: '100px' } }
	private wrapperCol = { span: 20, style: { width: 'calc(100% - 100px)' } }
	private form = {
		id: 0,
		title: '',
		content: '',
		html: '',
		status: 1,
		cover: []
	}
	private rules = {
		title: [{ required: true, message: '请输入日志标题', trigger: 'blur' }],
		content: [{ required: true, message: '请输入日志内容', trigger: 'blur' }]
	}

	/**组件调用**/
	public async init(active: 'create' | 'update', id?: number) {
		try {
			this.loading = true
			this.active = active
			this.visible = true
			// await this.initNodeModules()
			if (id) {
				this.form.id = id
				// await this.nodeRole(id)
			}
			this.loading = false
		} catch (e) {
			this.loading = false
		}
	}

	/**组件初始化**/
	private onClose() {
		this.visible = false
		setTimeout(() => {
			this.form = Object.assign(this.form, {
				id: 0,
				title: '',
				content: '',
				html: '',
				status: 1,
				cover: []
			})
		}, 300)
	}

	protected render() {
		const { form, rules, labelCol, wrapperCol } = this
		return (
			<Modal
				title={this.active === 'create' ? '新增' : '编辑'}
				dialogStyle={{ maxWidth: '95%', paddingBottom: 0 }}
				v-model={this.visible}
				width={1080}
				centered
				destroyOnClose
				onCancel={this.onClose}
			>
				<Spin class="ant-spin-64" spinning={this.loading}>
					<FormModel
						ref="formModel"
						class="app-form"
						{...{ props: { model: form, rules: rules } }}
						labelCol={labelCol}
						wrapperCol={wrapperCol}
					>
						<FormModel.Item prop="title" label="日志标题">
							<Input v-model={form.title} placeholder="日志标题"></Input>
						</FormModel.Item>
						<FormModel.Item label="封面列表" prop="cover">
							<NodeAppCover
								ratio={16 / 9}
								dataSource={form.cover}
								onSubmit={(props: never) => {
									form.cover.push(props)
								}}
							></NodeAppCover>
						</FormModel.Item>
						<FormModel.Item label="日志内容" prop="content">
							<AppEditor
								height={480}
								defaultOpen="edit"
								content={form.content}
								onChange={({ content, html }: { content: string; html: string }) => {
									form.html = html
									form.content = content
								}}
							></AppEditor>
						</FormModel.Item>
					</FormModel>
				</Spin>
			</Modal>
		)
	}
}
