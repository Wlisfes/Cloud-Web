import { Vue, Component } from 'vue-property-decorator'
import { Modal, Icon, Button } from 'ant-design-vue'
import { useInstance, VMInstance } from '@/utils/instance'

export function init(): Promise<VMInstance> {
	const { onMounte, onUnmounte } = useInstance()
	@Component
	class RootModal extends Vue {
		private visible: boolean = false
		private loading: boolean = false

		/**组件挂载**/
		protected mounted() {
			onMounte().finally(() => {
				this.visible = true
			})
		}

		/**组件卸载**/
		protected onUnmounte(key: string) {
			onUnmounte({ el: (this as any)._vnode.elm.parentNode, remove: true }).finally(() => {
				this.$emit(key, () => {
					this.visible = false
				})
			})
		}

		protected onSubmit() {
			this.loading = true
			this.$emit('submit', (delay?: number) => {
				onUnmounte({ el: (this as any)._vnode.elm.parentNode, remove: true, delay }).finally(() => {
					this.loading = false
					this.visible = false
				})
			})
		}

		protected render() {
			return (
				<Modal
					v-model={this.visible}
					width={480}
					closable={false}
					maskClosable={false}
					footer={null}
					onCancel={() => this.onUnmounte('close')}
				>
					<div style={{ display: 'flex', alignItems: 'center', marginBottom: '45px' }}>
						<Icon type="exclamation-circle" style={{ fontSize: '32px', color: '#fa8c16' }} />
						<h2 style={{ margin: '0 0 0 10px', fontSize: '18px' }}>确定要退出吗？</h2>
					</div>
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button type="primary" onClick={() => this.onUnmounte('close')}>
							在看看
						</Button>
						<Button
							type="danger"
							style={{ marginLeft: '10px' }}
							loading={this.loading}
							onClick={this.onSubmit}
						>
							退出登录
						</Button>
					</div>
				</Modal>
			)
		}
	}

	return new Promise(resolve => {
		const Component = Vue.extend(RootModal)
		const node = new Component().$mount(document.createElement('div'))
		document.body.appendChild(node.$el)

		resolve(node as RootModal)
	})
}
