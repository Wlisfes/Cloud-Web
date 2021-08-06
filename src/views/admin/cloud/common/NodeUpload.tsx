import { Vue, Component, Prop } from 'vue-property-decorator'
import { Icon, Progress } from 'ant-design-vue'
import { AppCloud } from '@/components/common'
import { AliyunUploadModule } from '@/utils/aliyun-upload'
import style from '@/style/common/node.upload.module.less'

@Component
export default class NodeUpload extends Vue {
	$refs!: { appCloud: AppCloud }

	@Prop({ type: String }) uid!: string
	@Prop({ type: String }) name!: string

	private uploader!: AliyunUploadModule
	private loading: boolean = false
	private status: string = ''
	private percent: number = 0
	private fileNmae: string = ''

	private onCloudSubmit({ transfer, title, file }: { title: string; file: File; transfer: string }) {
		this.fileNmae = file.name
		this.uploader = new AliyunUploadModule({
			title: title,
			fileName: file.name,
			transfer: transfer,
			onUploadstarted: () => {
				this.$emit('start')
				this.percent = 0
				this.status = 'loading'
				this.loading = true
			},
			onUploadSucceed: (props: any) => {
				this.$emit('submit', {
					key: props.videoId,
					path: props.object,
					file
				})
				this.status = 'success'
				this.loading = false
			},
			onUploadProgress: (props: any, size?: number, progress?: number) => {
				this.percent = progress || 0
			},
			onUploadFailed: () => {
				this.loading = false
				this.status = 'fail'
			}
		})
		this.uploader.addFile(file)
		this.uploader.startUpload()
	}

	protected render() {
		return (
			<div>
				<AppCloud ref="appCloud" onSubmit={this.onCloudSubmit}></AppCloud>
				<div class={style['node-upload']}>
					{this.loading ? (
						<div class={style['node-upload-action']} style={{ cursor: 'not-allowed' }}>
							<Icon
								style={{ fontSize: '28px', color: '#1890ff', transition: 'all 300ms' }}
								type="loading"
							></Icon>
						</div>
					) : (
						<div class={style['node-upload-action']} onClick={() => this.$refs.appCloud.init()}>
							<Icon
								style={{ fontSize: '28px', color: '#afafaf', transition: 'all 300ms' }}
								type="file-add"
							></Icon>
						</div>
					)}

					{(this.name || this.fileNmae) && (
						<div class={style['node-upload-conter']}>
							<div class={style['app-node']}>
								<div class={style['app-node-label']}>文件状态：</div>
								<div class={style['app-node-content']}>
									{this.status === 'fail' ? (
										<Progress percent={this.percent} status="exception"></Progress>
									) : (
										<Progress percent={this.name ? 100 : this.percent}></Progress>
									)}
								</div>
							</div>
							<div class={style['app-node']}>
								<div class={style['app-node-label']}>文件名称：</div>
								<div class={`${style['app-node-content']} app-ellipsis`}>
									{this.name || this.fileNmae}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		)
	}
}
