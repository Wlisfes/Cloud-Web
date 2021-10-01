import { Vue } from 'vue-property-decorator'
import { Modal, Button } from 'ant-design-vue'

interface NodeComponent {
	name: string
	content: JSX.Element
	confirm?: string
	cancel?: string
	onClose?: (self: any) => Promise<any>
	onSubmit?: (self: any) => Promise<any>
}

export function init(props: NodeComponent): Promise<{ self: any; done: Function }> {
	return new Promise((resolve, reject) => {
		const nodeComponent = Vue.extend({
			name: props.name,
			data() {
				return {
					visible: true,
					loading: false
				}
			},
			methods: {
				remove() {
					this.visible = false
					const timeout = setTimeout(() => {
						const node = this.$el.parentNode as HTMLElement
						node.remove()
						clearTimeout(timeout)
					}, 300)
				},
				async onClose() {
					await props.onClose?.(this)
					reject({ self: this, done: this.remove })
				},
				async onSubmit() {
					await props.onSubmit?.(this)
					resolve({ self: this, done: this.remove })
				}
			},
			render() {
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
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
		})

		const node = new nodeComponent().$mount(document.createElement('div'))
		document.body.appendChild(node.$el)
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
