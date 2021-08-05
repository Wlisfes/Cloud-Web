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
					<div class={style['node-upload-conter']} onClick={() => this.$refs.appCloud.init()}>
						<Icon
							style={{ fontSize: '28px', color: '#afafaf', transition: 'all 300ms' }}
							type="file-add"
						></Icon>
					</div>
				</div>
			</div>
		)
	}
}
