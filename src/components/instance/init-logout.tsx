import { Vue, Component } from 'vue-property-decorator'
import { Modal, Icon, Button } from 'ant-design-vue'
import { vm } from '@/utils/event'

@Component
class RootModal extends Vue {
	private visible: boolean = false
	private loading: boolean = false

	/**组件调用**/
	public async init() {
		this.visible = true
		return this
	}

	/**组件重置**/
	public onClose() {
		this.loading = false
		this.visible = false
		vm.$emit('logout-close')
	}

	public onSubmit() {
		this.loading = true
		vm.$emit('logout-submit')
	}

	protected render() {
		return (
			<Modal
				v-model={this.visible}
				width={480}
				closable={false}
				maskClosable={false}
				footer={null}
				onClose={this.onClose}
			>
				<div style={{ display: 'flex', alignItems: 'center', marginBottom: '45px' }}>
					<Icon type="exclamation-circle" style={{ fontSize: '32px', color: '#fa8c16' }} />
					<h2 style={{ margin: '0 0 0 10px', fontSize: '18px' }}>确定要退出吗？</h2>
				</div>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button type="primary" onClick={this.onClose}>
						在看看
					</Button>
					<Button type="danger" style={{ marginLeft: '10px' }} loading={this.loading} onClick={this.onSubmit}>
						退出登录
					</Button>
				</div>
			</Modal>
		)
	}
}

/**单例模式调用**/
let node: any = null
export function init(): Promise<{ node: RootModal; vm: typeof vm }> {
	return new Promise(resolve => {
		if (!node) {
			const Conter = Vue.extend(RootModal)
			node = new Conter().$mount(document.createElement('div'))
			document.body.appendChild(node.$el)
		}
		resolve({ vm, node: node as RootModal })
	})
}
