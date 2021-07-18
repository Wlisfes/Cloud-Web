import { Vue, Component, Prop } from 'vue-property-decorator'
import { Modal, Icon, Button, Upload } from 'ant-design-vue'
import Cropper from 'cropperjs'
import style from '@/style/common/app.cropper.module.less'
import 'cropperjs/dist/cropper.min.css'

@Component
export default class AppCropper extends Vue {
	$refs!: { cover: HTMLImageElement }

	@Prop({ type: Number, default: 1 }) ratio!: number

	private cropper?: Cropper = undefined
	private visible: boolean = false
	private loading: boolean = false
	private cover: string = ''
	private name: string = ''

	public upload(cover?: string) {
		this.visible = true

		// if (cover) {
		// 	this.cover = cover
		// 	this.name = cover.split('.').pop()?.toLowerCase() || ''
		// 	this.$nextTick(() => {
		// 		if (!this.cropper) {
		// 			this.cropper = new Cropper(this.$refs.cover, {
		// 				aspectRatio: this.ratio,
		// 				initialAspectRatio: 1,
		// 				viewMode: 1,
		// 				dragMode: 'move'
		// 			})
		// 		} else {
		// 			this.cropper.replace(cover)
		// 		}
		// 	})
		// }
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
		this.cropper?.getCroppedCanvas().toBlob(async blob => {
			const cover = URL.createObjectURL(blob)
			this.$emit('submit', {
				cover
			})

			this.onClose()
		})
	}

	private beforeUpload(file: File) {
		const cover = URL.createObjectURL(file)
		this.name = file.name.split('.').pop()?.toLowerCase() || ''
		this.cover = cover
		this.$nextTick(() => {
			if (!this.cropper) {
				this.cropper = new Cropper(this.$refs.cover, {
					aspectRatio: this.ratio,
					initialAspectRatio: 1,
					viewMode: 1,
					dragMode: 'move'
				})
			} else {
				this.cropper.replace(cover)
			}
		})
		return false
	}

	protected render() {
		return (
			<Modal
				title="图片上传"
				dialogStyle={{ maxWidth: 'calc(100vw - 16px)' }}
				v-model={this.visible}
				width={880}
				destroyOnClose
			>
				<div class={style['app-cropper']}>
					<div class={style['app-cropper-ratio']}>
						<div class={style['app-cropper-ratio-absolute']}>
							{this.cover ? (
								<div class={style['app-cropper-conter']}>
									<img class={style['root-cover']} ref="cover" src={this.cover} />
								</div>
							) : (
								<div class={`${style['app-cropper-conter']} cropper-bg`}></div>
							)}
						</div>
					</div>
				</div>
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
