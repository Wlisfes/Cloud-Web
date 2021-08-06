import { Vue, Component } from 'vue-property-decorator'
import { Icon, Progress } from 'ant-design-vue'
import { AppCloud } from '@/components/common'
import style from '@/style/common/node.upload.module.less'

type StatusType = 'loading' | 'fail' | 'success'

@Component
export default class NodeUpload extends Vue {
	$refs!: { appCloud: AppCloud }

	private loading: boolean = false
	private percent: number = 0

	private onCloudSubmit(props: { title: string; file: File }) {
		console.log(props)
	}

	protected render() {
		return (
			<div>
				<AppCloud ref="appCloud" onSubmit={this.onCloudSubmit}></AppCloud>
				<div class={style['node-upload']}>
					<div class={style['node-upload-action']} onClick={() => this.$refs.appCloud.init()}>
						<Icon
							style={{ fontSize: '28px', color: '#afafaf', transition: 'all 300ms' }}
							type="file-add"
						></Icon>
					</div>
					<div class={style['node-upload-conter']}>
						<div class={style['app-node']}>
							<div class={style['app-node-label']}>上传状态：</div>
							<div class={style['app-node-content']}>
								<Progress percent={this.percent}></Progress>
							</div>
						</div>
						<div class={style['app-node']}>
							<div class={style['app-node-label']}>文件名称：</div>
							<div class={style['app-node-content']}>55c93c72-17b117509ee-0005-5c87-c9a-697bc.flv</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
