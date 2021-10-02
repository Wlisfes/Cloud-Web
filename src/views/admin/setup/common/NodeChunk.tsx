import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Modal, Button, InputNumber, Icon, Upload, Spin, notification } from 'ant-design-vue'
import { nodeCreateChunk, nodeOssSts } from '@/api'
import { AliyunOSSModule } from '@/utils/aliyun-oss'
import { HttpStatus } from '@/types'
import style from '@/style/common/node.chunk.module.less'

@Component
export default class NodeChunk extends Vue {
	$refs!: { formModel: FormModel }

	private loading: boolean = false
	private visible: boolean = false
	private labelCol = { span: 4, style: { width: '100px' } }
	private wrapperCol = { span: 20, style: { width: 'calc(100% - 100px)' } }
	private file: File | null = null
	private form = { name: '', version: undefined }
	private rules = {
		version: [{ required: true, message: '请输入资源版本号', trigger: 'blur' }],
		name: [{ required: true, message: '请上传资源文件', trigger: 'blur' }]
	}

	private beforeUpload(file: File) {
		this.file = file
		this.form.name = file.name
		return false
	}

	/**创建版本资源-授权管理端**/
	private async nodeCreateChunk() {
		try {
			const node = await nodeOssSts()
			if (node.code === HttpStatus.OK) {
				const oss = new AliyunOSSModule({
					accessKeyId: node.data.accessKeyId,
					accessKeySecret: node.data.accessKeySecret,
					stsToken: node.data.stsToken,
					refreshSTSToken: async () => {
						const response = await nodeOssSts()
						return {
							accessKeyId: response.data.accessKeyId,
							accessKeySecret: response.data.accessKeySecret,
							stsToken: response.data.stsToken
						}
					}
				})
				const name = this.form.name.split('.').pop()?.toLowerCase()
				const buffer = await oss.Buffer(this.file as Blob)
				const key = `cloud/root/app-chunk${this.form.version}-${Date.now()}.${name}`
				const response = await oss.client.put(key, buffer)
				if (response.res.status === HttpStatus.OK) {
					const { code, data } = await nodeCreateChunk({
						url: `${node.data.path}/${response.name}`,
						path: response.name,
						name: this.form.name,
						version: this.form.version || 1
					})
					if (code === HttpStatus.OK) {
						notification.success({ message: data.message, description: '' })
						this.$emit('replay')
						this.onClose()
					}
				} else {
					console.error(response)
					throw new Error('上传失败')
				}
			}
		} catch (e) {
			this.loading = false
		}
	}

	/**组件调用**/
	public async init() {
		this.visible = true
	}

	/**组件初始化**/
	private onClose() {
		this.visible = false
		setTimeout(() => {
			Object.assign(this, {
				loading: false,
				file: null,
				form: { name: '', version: undefined }
			})
		}, 300)
	}

	/**组件提交事件**/
	private onSubmit() {
		this.$refs.formModel.validate(valid => {
			if (valid) {
				this.loading = true
				this.nodeCreateChunk()
			}
		})
	}

	protected render() {
		const { form, rules, labelCol, wrapperCol } = this
		return (
			<Modal
				title="新增"
				dialogStyle={{ maxWidth: '95%', padding: '20px 0' }}
				v-model={this.visible}
				width={640}
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
						<FormModel.Item label="资源版本号" prop="version">
							<InputNumber
								v-model={form.version}
								placeholder="资源版本号"
								style={{ width: '100%', maxWidth: '320px' }}
							></InputNumber>
						</FormModel.Item>
						<FormModel.Item label="资源文件" prop="name">
							<div class={style['node-chunk']}>
								<Upload accept=".js,.css,.html" beforeUpload={this.beforeUpload} showUploadList={false}>
									<div class={style['node-chunk-action']}>
										<Icon
											style={{ fontSize: '28px', color: '#afafaf', transition: 'all 300ms' }}
											type="file-add"
										></Icon>
									</div>
								</Upload>
								{(form.name || this.file?.name) && (
									<div class={style['node-chunk-conter']}>
										<div class={style['app-node']}>
											<div class={style['app-node-label']}>文件名称：</div>
											<div class={`${style['app-node-content']} app-ellipsis`}>
												{form.name || this.file?.name}
											</div>
										</div>
									</div>
								)}
							</div>
						</FormModel.Item>
					</FormModel>
				</Spin>
				<div slot="footer" style={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={this.onClose}>取消</Button>
					<Button type="primary" disabled={this.loading} onClick={this.onSubmit}>
						确定
					</Button>
				</div>
			</Modal>
		)
	}
}
