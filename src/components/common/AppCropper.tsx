import { Vue, Component } from 'vue-property-decorator'
import { Modal, Icon, Button } from 'ant-design-vue'
import Cropper from 'cropperjs'
import style from '@/style/common/app.cropper.module.less'

@Component
export default class AppCropper extends Vue {
	private visible: boolean = false
	private loading: boolean = false

	public upload() {
		this.visible = true
	}

	private onClose() {
		this.visible = false
	}

	private onSubmit() {}

	protected render() {
		return (
			<Modal
				title="图片上传"
				dialogStyle={{ maxWidth: 'calc(100vw - 16px)' }}
				v-model={this.visible}
				width={880}
				destroyOnClose
			>
				<div class={style['app-cropper']}></div>
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
