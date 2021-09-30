import { Vue, Component } from 'vue-property-decorator'
import { Modal, Button } from 'ant-design-vue'

interface NodeComponent {
	content: JSX.Element
	confirm?: string
	cancel?: string
	onClose?: (self: any) => Promise<any>
	onSubmit?: (self: any) => Promise<any>
}

export function createComponent(props: NodeComponent) {
	@Component
	class NodeComponent extends Vue {
		private visible: boolean = true
		private loading: boolean = false

		private remove() {
			this.visible = false
			const timeout = setTimeout(() => {
				const node = this.$el.parentNode as HTMLElement
				node.remove()
				clearTimeout(timeout)
			}, 300)
		}

		private async onClose() {
			await props.onClose?.(this)
			this.remove()
		}

		private async onSubmit() {
			await props.onSubmit?.(this)
			this.remove()
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
					<div>{props.content}</div>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button type="primary" onClick={this.onClose}>
							{props.cancel || '取消'}
						</Button>
						<Button
							type="danger"
							style={{ marginLeft: '10px' }}
							loading={this.loading}
							onClick={this.onSubmit}
						>
							{props.confirm || '确定'}
						</Button>
					</div>
				</Modal>
			)
		}
	}

	return Vue.extend(NodeComponent)
}

export function init(props: NodeComponent) {
	return new Promise(resolve => {
		const nodeComponent = createComponent(props)
		const node = new nodeComponent().$mount(document.createElement('div'))
		document.body.appendChild(node.$el)
		resolve(node)
	})
}

// init({
//     content: <div>Holle</div>,
//     onClose: self => {
//         self.loading = true
//         return new Promise(resolve => {
//             setTimeout(() => {
//                 resolve(true)
//             }, 3000)
//         })
//     }
// }).then(() => {})
