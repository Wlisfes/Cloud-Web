import { Vue, Component, Prop } from 'vue-property-decorator'
import { FormModel, Input, Modal, Button, Spin, notification } from 'ant-design-vue'
import style from '@/style/common/app.poster.module.less'

@Component
export default class AppPoster extends Vue {
	private loading: boolean = true
	private visible: boolean = false

	/**组件调用**/
	public init() {
		this.visible = true
	}

	/**组件初始化**/
	private onClose() {
		this.loading = true
		this.visible = false
	}

	protected render() {
		return (
			<Modal
				dialogStyle={{ maxWidth: '95%', paddingBottom: 0 }}
				v-model={this.visible}
				width={840}
				centered
				destroyOnClose
				onCancel={this.onClose}
			>
				<div slot="footer" style={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={this.onClose}>取消</Button>
					<Button type="primary" disabled={this.loading} loading={this.loading}>
						确定
					</Button>
				</div>
			</Modal>
		)
	}
}
