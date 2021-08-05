import { Vue, Component } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
import { AppCloud } from '@/components/common'
import style from '@/style/common/node.upload.module.less'

@Component
export default class NodeUpload extends Vue {
	$refs!: { appCloud: AppCloud }

	protected render() {
		return (
			<div>
				<AppCloud ref="appCloud"></AppCloud>
				<div class={style['node-upload']}>
					<div class={style['node-upload-conter']} onClick={() => this.$refs.appCloud.init()}>
						<Icon
							style={{ fontSize: '28px', color: '#afafaf', transition: 'all 300ms' }}
							type="upload"
						></Icon>
					</div>
				</div>
			</div>
		)
	}
}
