import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, Modal, Select, Button, Upload, Spin } from 'ant-design-vue'
import { nodeAliyunTransfer } from '@/api'
import { HttpStatus, NodeTransfer } from '@/types'

@Component
export default class AppCloud extends Vue {
	$refs!: { formModel: FormModel }

	private visible: boolean = false
	private loading: boolean = false
	private transfer: NodeTransfer[] = []
	private state = {
		labelCol: { span: 4, style: { width: '100px' } },
		wrapperCol: { span: 20, style: { width: 'calc(100% - 100px)' } },
		form: {
			title: '时光背面的我',
			file: null,
			transfer: undefined,
			name: ''
		},
		rules: {
			title: [{ required: true, message: '请输入媒体名称', trigger: 'blur' }],
			file: [{ required: true, message: '请选择媒体文件', trigger: 'blur' }],
			transfer: [{ required: true, message: '请选择转码模板', trigger: 'blur' }]
		}
	}

	private beforeUpload(file: File) {
		this.state.form = Object.assign(this.state.form, {
			file,
			name: file.name
		})
		return false
	}

	/**转码模板列表**/
	private async nodeAliyunTransfer() {
		try {
			const { code, data } = await nodeAliyunTransfer()
			if (code === HttpStatus.OK) {
				this.transfer = data.list
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**组件调用**/
	public async init() {
		try {
			this.visible = true
			this.loading = true
			await this.nodeAliyunTransfer()
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
			this.state.form = Object.assign(this.state.form, {
				title: ''
				// file: null,
				// name: ''
			})
		}, 300)
	}

	/**组件提交事件**/
	private onSubmit() {
		this.$refs.formModel.validate(valid => {
			if (valid) {
				this.$emit('submit', { ...this.state.form })
				this.onClose()
			}
		})
	}

	protected render() {
		const { form, rules, labelCol, wrapperCol } = this.state
		return (
			<Modal
				title="上传媒体"
				dialogStyle={{ maxWidth: '95%' }}
				v-model={this.visible}
				width={680}
				destroyOnClose
				onCancel={this.onClose}
			>
				<Spin size="large" spinning={this.loading}>
					<FormModel ref="formModel" class="app-form" {...{ props: { model: form, rules } }}>
						<FormModel.Item wrapperCol={wrapperCol} labelCol={labelCol} label="媒体标题" prop="title">
							<Input v-model={form.title} allowClear placeholder="媒体标题"></Input>
						</FormModel.Item>
						<FormModel.Item wrapperCol={wrapperCol} labelCol={labelCol} label="转码模板" prop="transfer">
							<Select v-model={form.transfer} allowClear show-search placeholder="转码模板">
								{this.transfer.map(k => {
									return (
										<Select.Option
											key={k.TranscodeTemplateGroupId}
											value={k.TranscodeTemplateGroupId}
											disabled={k.Locked}
										>
											{k.Name}
										</Select.Option>
									)
								})}
							</Select>
						</FormModel.Item>
						<FormModel.Item wrapperCol={wrapperCol} labelCol={labelCol} label="媒体文件" prop="file">
							<div style={{ display: 'flex' }}>
								<Upload
									accept=".mp4,.flv,.mkv,.mov"
									beforeUpload={this.beforeUpload}
									showUploadList={false}
								>
									<Button type="primary" icon="upload" disabled={this.loading}>
										选择文件
									</Button>
								</Upload>
								<div class="app-ellipsis" style={{ flex: 1, marginLeft: '10px', cursor: 'pointer' }}>
									{form.name}
								</div>
							</div>
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
