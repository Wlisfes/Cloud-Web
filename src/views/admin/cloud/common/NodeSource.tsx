import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, InputNumber, Modal, Button, Switch, Spin, notification } from 'ant-design-vue'
import { ColorPicker } from 'element-ui'
import { nodeCloudSource, nodeUpdateCloudSource, nodeCreateCloudSource } from '@/api'
import { HttpStatus } from '@/types'

const primaryColor = ['#F5222D', '#FA541C', '#FAAD14', '#13C2C2', '#52C41A', '#1890FF', '#2F54EB', '#722ED1']

@Component
export default class NodeSource extends Vue {
	$refs!: { form: FormModel }

	private primaryColor: string[] = primaryColor
	private visible: boolean = false
	private loading: boolean = false
	private active: string = 'create'
	private state = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: {
			id: 0,
			name: '',
			color: '',
			comment: '',
			status: true,
			order: 0
		},
		rules: {
			name: [{ required: true, message: '请输入分类标签名称', trigger: 'blur' }],
			color: [{ required: true, message: '请选择分类标签颜色', trigger: 'blur' }]
		}
	}

	/**分类标签信息**/
	private async nodeCloudSource(id: number) {
		try {
			const { code, data } = await nodeCloudSource({ id })
			if (code === HttpStatus.OK) {
				this.state.form = Object.assign(this.state.form, {
					name: data.name,
					color: data.color,
					comment: data.comment,
					status: data.status === 1,
					order: data.order
				})
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**创建分类标签**/
	private async nodeCreateCloudSource() {
		try {
			this.loading = true
			const { form } = this.state
			const { code, data } = await nodeCreateCloudSource({
				name: form.name,
				color: form.color,
				comment: form.comment || null,
				status: +form.status,
				order: form.order || 0
			})
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
				this.$emit('replay')
				this.onClose()
			}
		} catch (e) {
			this.loading = false
		}
	}

	/**修改分类标签**/
	private async nodeUpdateCloudSource() {
		try {
			this.loading = true
			const { form } = this.state
			const { code, data } = await nodeUpdateCloudSource({
				id: form.id,
				name: form.name,
				color: form.color,
				comment: form.comment || null,
				status: +form.status,
				order: form.order || 0
			})
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '' })
				this.$emit('replay')
				this.onClose()
			}
		} catch (e) {
			this.loading = false
		}
	}

	/**组件调用**/
	public async init(active: 'create' | 'update', id?: number) {
		try {
			this.loading = true
			this.active = active
			this.visible = true
			if (id) {
				this.state.form.id = id
				await this.nodeCloudSource(id)
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
			this.loading = false
			this.active = 'create'
			this.state.form = Object.assign(this.state.form, {
				id: 0,
				name: '',
				color: '',
				comment: '',
				status: true,
				order: 0
			})
		}, 300)
	}

	/**组件提交事件**/
	private onSubmit() {
		this.$refs.form.validate(async valid => {
			if (valid) {
				switch (this.active) {
					case 'create':
						this.nodeCreateCloudSource()
						break
					case 'update':
						this.nodeUpdateCloudSource()
						break
				}
			}
		})
	}

	protected render() {
		const { form, rules, labelCol, wrapperCol } = this.state
		return (
			<Modal
				title={this.active === 'create' ? '新增' : '编辑'}
				dialogStyle={{ maxWidth: 'calc(100vw - 16px)' }}
				v-model={this.visible}
				width={680}
				destroyOnClose
				onCancel={this.onClose}
			>
				<Spin size="large" spinning={this.loading}>
					<FormModel
						ref="form"
						class="app-form"
						{...{ props: { model: form, rules } }}
						labelCol={labelCol}
						wrapperCol={wrapperCol}
					>
						<FormModel.Item label="标签名称" prop="name">
							<Input v-model={form.name}></Input>
						</FormModel.Item>
						<FormModel.Item class="app-form-color" label="标签颜色" prop="color">
							<ColorPicker
								v-model={form.color}
								size="small"
								style={{ width: '100%', maxWidth: '350px' }}
								predefine={this.primaryColor}
							></ColorPicker>
						</FormModel.Item>
						<FormModel.Item label="标签备注">
							<Input.TextArea
								v-model={form.comment}
								autoSize={{ minRows: 2, maxRows: 3 }}
								style={{ marginBottom: 0 }}
								placeholder="标签备注"
							></Input.TextArea>
						</FormModel.Item>
						<FormModel.Item label="排序号">
							<InputNumber v-model={form.order}></InputNumber>
						</FormModel.Item>
						<FormModel.Item label="标签状态">
							<Switch
								v-model={form.status}
								checked-children="开"
								un-checked-children="关"
								default-checked
							></Switch>
						</FormModel.Item>
					</FormModel>
				</Spin>
				<div slot="footer" style={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={this.onClose}>取消</Button>
					<Button type="primary" disabled={this.loading} loading={this.loading} onClick={this.onSubmit}>
						确定
					</Button>
				</div>
			</Modal>
		)
	}
}
