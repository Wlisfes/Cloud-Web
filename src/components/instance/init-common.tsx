import { Vue, Component } from 'vue-property-decorator'
import { Modal, Button, Icon } from 'ant-design-vue'
import { useInstance, VMInstance, VMInstanceProps } from '@/utils/instance'

export interface InitCommonProps extends VMInstanceProps {
	content?: JSX.Element
	confirm?: string
	cancel?: string
}

export function init(props?: InitCommonProps): Promise<VMInstance> {
	const { onMounte, onUnmounte } = useInstance()
	@Component
	class NodeCommonModal extends Vue {
		private visible: boolean = false
		private loading: boolean = false

		/**组件挂载**/
		protected mounted() {
			onMounte().finally(() => {
				this.visible = true
			})
		}

		/**组件卸载**/
		protected onUnmounte(key: 'close' | 'submit') {
			if (key === 'submit') {
				this.loading = true
				this.$emit(key, (delay?: number) => {
					onUnmounte({ el: (this as any)._vnode.elm.parentNode, remove: true, delay }).finally(() => {
						this.loading = false
						this.visible = false
					})
				})
			} else {
				onUnmounte({ el: (this as any)._vnode.elm.parentNode, remove: true }).finally(() => {
					this.$emit(key, () => {
						this.visible = false
					})
				})
			}
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
					<div>
						{props?.content ? (
							props?.content
						) : (
							<div style={{ display: 'flex', alignItems: 'center', marginBottom: '45px' }}>
								<Icon type="exclamation-circle" style={{ fontSize: '32px', color: '#ff4d4f' }} />
								<h2 style={{ margin: '0 0 0 10px', fontSize: '18px' }}>确定要删除吗？</h2>
							</div>
						)}
					</div>
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button type="primary" onClick={() => this.onUnmounte('close')}>
							{props?.cancel || '取消'}
						</Button>
						<Button
							type="danger"
							style={{ marginLeft: '10px' }}
							loading={this.loading}
							onClick={() => this.onUnmounte('submit')}
						>
							{props?.confirm || '确定'}
						</Button>
					</div>
				</Modal>
			)
		}
	}

	return new Promise(resolve => {
		const Component = Vue.extend(NodeCommonModal)
		const node = new Component().$mount(document.createElement('div'))
		if (typeof props?.getContainer === 'function') {
			props.getContainer().appendChild?.(node.$el)
		} else {
			document.body.appendChild(node.$el)
		}

		resolve(node as NodeCommonModal)
	})
}
