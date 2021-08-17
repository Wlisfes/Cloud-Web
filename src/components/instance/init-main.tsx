import { Vue, Component } from 'vue-property-decorator'
import { Modal } from 'ant-design-vue'

@Component
class RootModal extends Vue {
	private visible: boolean = false
	private loading: boolean = false
	private callback: any

	public init(callback?: Function) {
		this.callback = callback
		this.visible = true
	}

	protected render() {
		return <Modal bodyStyle={{ padding: 0 }} closable={false} v-model={this.visible}></Modal>
	}
}

//
let node: any = null
export function initMain(): Promise<RootModal> {
	return new Promise(resolve => {
		if (!node) {
			const Conter = Vue.extend(RootModal)
			node = new Conter().$mount(document.createElement('div'))
			document.body.appendChild(node.$el)
		}
		resolve(node as RootModal)
	})
}
