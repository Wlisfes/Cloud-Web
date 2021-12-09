import { Vue, Component } from 'vue-property-decorator'
import { useInstance, VMInstance, VMInstanceProps } from '@/utils/instance'
import { Modal, Spin, Button, Upload } from 'ant-design-vue'
import Cropper from 'cropperjs'
import { nodeOssSts, nodeCreatePoster } from '@/api'
import { HttpStatus } from '@/types'
import { AliyunOSSModule } from '@/utils/aliyun-oss'
import style from '@/style/common/app.cropper.module.less'
import 'cropperjs/dist/cropper.min.css'

export enum Path {
	avatar = 1,
	upload = 2,
	cover = 3,
	photo = 4
}
export interface InitCropperProps extends VMInstanceProps {
	ratio?: number
	path: 'avatar' | 'upload' | 'cover' | 'photo'
	cover?: string
}

export function init(props?: InitCropperProps): Promise<VMInstance> {
	const { onMounte, onUnmounte } = useInstance()

	@Component
	class NodeCropperModal extends Vue {
		$refs!: { cover: HTMLImageElement }

		private cropper?: Cropper = undefined
		private visible: boolean = false
		private loading: boolean = false
		private cover: string = ''
		private name: string = ''

		/**初始化Cropper对象**/
		private initCropper() {
			this.cropper = new Cropper(this.$refs.cover, {
				aspectRatio: props?.ratio || 1,
				initialAspectRatio: 1,
				viewMode: 1,
				dragMode: 'move',
				ready: () => {
					this.loading = false
				}
			})
			return this.cropper
		}

		/**初始化OSS对象**/
		private initOSS(node: { accessKeyId: string; accessKeySecret: string; stsToken: string }) {
			return new AliyunOSSModule({
				accessKeyId: node.accessKeyId,
				accessKeySecret: node.accessKeySecret,
				stsToken: node.stsToken,
				refreshSTSToken: async () => {
					const response = await nodeOssSts()
					return {
						accessKeyId: response.data.accessKeyId,
						accessKeySecret: response.data.accessKeySecret,
						stsToken: response.data.stsToken
					}
				}
			})
		}

		/**组件挂载后图片注入**/
		public upload(cover?: string) {
			if (cover) {
				this.loading = true
				this.cover = cover
				this.name = cover.split('.').pop()?.toLowerCase() || ''
				this.$nextTick(() => this.initCropper())
			}
		}

		/**图片替换后注入**/
		private beforeUpload(file: File) {
			const cover = URL.createObjectURL(file)
			this.loading = true
			this.name = file.name
			this.cover = cover
			this.$nextTick(() => {
				if (!this.cropper) {
					this.initCropper()
				} else {
					this.cropper.replace(cover)
					this.loading = false
				}
			})
			return false
		}

		/**照片类型立即上传**/
		private async immediateBeforeUpload(file: File) {
			if (this.cropper) {
				this.cropper.destroy()
				this.cropper = undefined
			}

			const cover = URL.createObjectURL(file)
			this.loading = true
			this.name = file.name
			this.cover = cover

			try {
				const { code, data } = await nodeOssSts()
				if (code === HttpStatus.OK) {
					const { accessKeyId, accessKeySecret, stsToken } = data
					const oss = this.initOSS({ accessKeyId, accessKeySecret, stsToken })

					const buffer = await oss.Buffer(file)
					const key = oss.create(this.name, props?.path || 'photo')
					const response = await oss.client.put(key, buffer)

					if (response.res.status === HttpStatus.OK) {
						const node = await nodeCreatePoster({
							type: Path[props?.path || 'photo'],
							path: response.name,
							url: `${data.path}/${response.name}`
						})
						this.$emit('submit', {
							props: {
								id: node.data.id,
								type: node.data.type,
								name: response.name,
								path: `${data.path}/${response.name}`
							},
							done: (delay?: number) => {
								onUnmounte({
									el: (this as any)._vnode.elm.parentNode,
									remove: true,
									delay
								}).finally(() => {
									this.loading = false
									this.visible = false
								})
							}
						})
					}
				}
				return false
			} catch (e) {
				this.loading = false
				return false
			}
		}

		/**图片裁剪上传**/
		private async initCropperUpload() {
			try {
				this.loading = true
				const { code, data } = await nodeOssSts()
				if (code === HttpStatus.OK) {
					const { accessKeyId, accessKeySecret, stsToken } = data
					const oss = this.initOSS({ accessKeyId, accessKeySecret, stsToken })

					this.cropper?.getCroppedCanvas().toBlob(async blob => {
						const buffer = await oss.Buffer(blob as Blob)
						const key = oss.create(this.name, props?.path || 'avatar')
						const response = await oss.client.put(key, buffer)
						if (response.res.status === HttpStatus.OK) {
							const node = await nodeCreatePoster({
								type: Path[props?.path || 'avatar'],
								path: response.name,
								url: `${data.path}/${response.name}`
							})
							this.$emit('submit', {
								props: {
									id: node.data.id,
									type: node.data.type,
									name: response.name,
									path: `${data.path}/${response.name}`
								},
								done: (delay?: number) => {
									onUnmounte({
										el: (this as any)._vnode.elm.parentNode,
										remove: true,
										delay
									}).finally(() => {
										this.loading = false
										this.visible = false
									})
								}
							})
						}
					})
				}
			} catch (e) {
				this.loading = false
			}
		}

		/**组件挂载**/
		protected mounted() {
			onMounte().finally(() => {
				this.visible = true
				this.$nextTick(() => {
					this.upload(props?.cover)
				})
			})
		}

		/**组件卸载**/
		private onUnmounte(key: 'change' | 'cropper' | 'submit' | 'close') {
			if (key === 'cropper') {
				this.initCropperUpload()
			} else if (key === 'submit') {
			} else {
				onUnmounte({ el: (this as any)._vnode.elm.parentNode, remove: true }).finally(() => {
					this.$emit(key, () => {
						this.visible = false
					})
				})
			}
		}

		protected render() {
			return (
				<Modal
					title="图片上传"
					dialogStyle={{ maxWidth: '95%' }}
					v-model={this.visible}
					width={880}
					destroyOnClose
					onCancel={() => this.onUnmounte('close')}
				>
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
						<Button onClick={() => this.onUnmounte('close')}>取消</Button>
						<Button
							icon="download"
							style={{
								width: '40px',
								color: '#ffffff',
								backgroundColor: '#ff5500',
								borderColor: '#ff5500'
							}}
							onClick={() => this.onUnmounte('change')}
						></Button>
						<Upload
							accept="image/jpeg,image/png,image/jpg"
							beforeUpload={this.beforeUpload}
							showUploadList={false}
							style={{ margin: '0 5px' }}
						>
							<Button
								type="danger"
								icon="scissor"
								disabled={this.loading}
								style={{ width: '40px', backgroundColor: '#07c160', borderColor: '#07c160' }}
							></Button>
						</Upload>
						<Upload
							accept="image/jpeg,image/png,image/jpg"
							beforeUpload={this.immediateBeforeUpload}
							showUploadList={false}
							style={{ margin: '0 8px 0 0' }}
						>
							<Button
								type="danger"
								icon="upload"
								disabled={this.loading}
								style={{ width: '40px', backgroundColor: '#07c160', borderColor: '#07c160' }}
							></Button>
						</Upload>
						<Button
							type="primary"
							disabled={!this.cover || this.loading}
							loading={this.loading}
							onClick={() => this.onUnmounte('cropper')}
						>
							确定
						</Button>
					</div>
				</Modal>
			)
		}
	}

	return new Promise(resolve => {
		const NodeComponent = Vue.extend(NodeCropperModal)
		const node = new NodeComponent().$mount(document.createElement('div'))
		if (typeof props?.getContainer === 'function') {
			props.getContainer().appendChild?.(node.$el)
		} else {
			document.body.appendChild(node.$el)
		}

		resolve(node as NodeCropperModal)
	})
}
