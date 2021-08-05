import { Vue, Component } from 'vue-property-decorator'
import { FormModel, Input, InputNumber, Modal, Button, Switch, Spin, notification } from 'ant-design-vue'
import { HttpStatus } from '@/types'

@Component
export default class NodeSource extends Vue {
	$refs!: { form: FormModel }

	private visible: boolean = false
	private loading: boolean = false
	private active: string = 'create'

	/**组件调用**/
	public async init(active: 'create' | 'update', id?: number) {
		try {
			this.loading = true
			this.active = active
			this.visible = true
			if (id) {
			}
			this.loading = false
		} catch (e) {
			this.loading = false
		}
	}

	/**组件初始化**/
	private onClose() {
		this.visible = false
		setTimeout(() => {
			this.loading = false
			this.active = 'create'
		}, 300)
	}

	protected render() {
		return (
			<Modal
				title={this.active === 'create' ? '新增' : '编辑'}
				dialogStyle={{ maxWidth: 'calc(100vw - 16px)' }}
				v-model={this.visible}
				width={680}
				destroyOnClose
				onCancel={this.onClose}
			></Modal>
		)
	}
}
