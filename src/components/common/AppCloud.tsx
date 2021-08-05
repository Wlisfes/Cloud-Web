import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, Upload, Spin } from 'ant-design-vue'

@Component
export default class AppCloud extends Vue {
	$refs!: { form: FormModel }

	private visible: boolean = false
	private loading: boolean = false
	private state = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: {
			title: '',
			file: null
		},
		rules: {
			name: [{ required: true, message: '请输入分类标签名称', trigger: 'blur' }],
			color: [{ required: true, message: '请选择分类标签颜色', trigger: 'blur' }]
		}
	}

	private beforeUpload(file: File) {
		console.log(file)
		return false
	}

	public init() {
		this.visible = true
	}

	/**组件初始化**/
	private onClose() {
		this.visible = false
		setTimeout(() => {
			this.loading = false
		}, 300)
	}

	/**组件提交事件**/
	private onSubmit() {
		this.$refs.form.validate(valid => {
			if (valid) {
			}
		})
	}

	protected render() {
		const { form, rules, labelCol, wrapperCol } = this.state
		return (
			<Modal
				title="上传媒体"
				dialogStyle={{ maxWidth: 'calc(100vw - 16px)' }}
				v-model={this.visible}
				width={680}
				destroyOnClose
				onCancel={this.onClose}
			>
				<Spin size="large" spinning={this.loading}>
					<FormModel
						ref="form"
						layout="horizontal"
						{...{ props: { model: form, rules } }}
						labelCol={labelCol}
						wrapperCol={wrapperCol}
					>
						<FormModel.Item label="媒体标题" prop="title">
							<Input v-model={form.title} allowClear placeholder="媒体标题"></Input>
						</FormModel.Item>
						<FormModel.Item label="媒体标题" prop="file"></FormModel.Item>
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
