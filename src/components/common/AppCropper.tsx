import { Vue, Component, Prop } from 'vue-property-decorator'
import { Modal, Spin, Button, Upload } from 'ant-design-vue'
import Cropper from 'cropperjs'
import { nodeOssSts, nodeCreatePoster } from '@/api'
import { HttpStatus } from '@/types'
import { AliyunOSSModule } from '@/utils/aliyun-oss'
import style from '@/style/common/app.cropper.module.less'
import 'cropperjs/dist/cropper.min.css'

enum Path {
	avatar = 1,
	upload = 2,
	cover = 3,
	photo = 4
}

@Component
export default class AppCropper extends Vue {
	$refs!: { cover: HTMLImageElement }

	@Prop({ type: Number, default: 1 }) ratio!: number
	@Prop({ type: String, default: 'avatar' }) path!: 'avatar' | 'upload' | 'cover' | 'photo'

	private cropper?: Cropper = undefined
	private visible: boolean = false
	private loading: boolean = false
	private cover: string = ''
	private name: string = ''

	public upload(cover?: string) {
		this.visible = true

		if (cover) {
			this.loading = true
			this.cover = cover
			this.name = cover.split('.').pop()?.toLowerCase() || ''
			this.$nextTick(() => {
				this.cropper = new Cropper(this.$refs.cover, {
					aspectRatio: this.ratio,
					initialAspectRatio: 1,
					viewMode: 1,
					dragMode: 'move',
					ready: () => {
						this.loading = false
					}
				})
			})
		}
	}

	private onClose() {
		this.visible = false
		this.$nextTick(() => {
			this.cropper = undefined
			this.loading = false
			this.cover = ''
			this.name = ''
		})
	}

	private onSubmit() {
		this.loading = true
		nodeOssSts()
			.then(({ code, data }) => {
				if (code === HttpStatus.OK) {
					try {
						const oss = new AliyunOSSModule({
							accessKeyId: data.accessKeyId,
							accessKeySecret: data.accessKeySecret,
							stsToken: data.stsToken,
							refreshSTSToken: async () => {
								const response = await nodeOssSts()
								return {
									accessKeyId: response.data.accessKeyId,
									accessKeySecret: response.data.accessKeySecret,
									stsToken: response.data.stsToken
								}
							}
						})

						this.cropper?.getCroppedCanvas().toBlob(async blob => {
							const buffer = await oss.Buffer(blob as Blob)
							const key = oss.create(this.name, this.path)
							const response = await oss.client.put(key, buffer)
							if (response.res.status === HttpStatus.OK) {
								await nodeCreatePoster({
									type: Path[this.path],
									path: response.name,
									url: `${data.path}/${response.name}`
								})
								this.$emit('submit', {
									name: response.name,
									path: `${data.path}/${response.name}`
								})
								this.onClose()
							}
						})
					} catch (e) {
						this.loading = false
						console.log(e)
					}
				}
			})
			.catch(() => {
				this.loading = false
			})
	}

	private beforeUpload(file: File) {
		const cover = URL.createObjectURL(file)
		this.loading = true
		this.name = file.name
		this.cover = cover
		this.$nextTick(() => {
			if (!this.cropper) {
				this.cropper = new Cropper(this.$refs.cover, {
					aspectRatio: this.ratio,
					initialAspectRatio: 1,
					viewMode: 1,
					dragMode: 'move',
					ready: () => {
						this.loading = false
					}
				})
			} else {
				this.cropper.replace(cover)
				this.loading = false
			}
		})
		return false
	}

	protected render() {
		return (
			<Modal title="图片上传" dialogStyle={{ maxWidth: '95%' }} v-model={this.visible} width={880} destroyOnClose>
				<Spin size="large" class="ant-spin-64" spinning={this.loading}>
					<div class={style['app-cropper']}>
						<div class={style['app-cropper-ratio']}>
							<div class={style['app-cropper-ratio-absolute']}>
								{this.cover ? (
									<div class={`${style['app-cropper-conter']} cropper-bg`}>
										<img class={style['root-cover']} ref="cover" src={this.cover} />
									</div>
								) : (
									<div class={`${style['app-cropper-conter']} cropper-bg`}></div>
								)}
							</div>
						</div>
					</div>
				</Spin>
				<div slot="footer" style={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={this.onClose}>取消</Button>
					<Upload
						accept="image/jpeg,image/png,image/jpg"
						beforeUpload={this.beforeUpload}
						showUploadList={false}
						style={{ margin: '0 5px' }}
					>
						<Button
							type="danger"
							icon="upload"
							disabled={this.loading}
							style={{ width: '60px', backgroundColor: '#07c160', borderColor: '#07c160' }}
						></Button>
					</Upload>
					<Button
						type="primary"
						disabled={!this.cover || this.loading}
						loading={this.loading}
						onClick={this.onSubmit}
					>
						确定
					</Button>
				</div>
			</Modal>
		)
	}
}
