import { Vue, Component } from 'vue-property-decorator'
import { Drawer, Tooltip, Icon } from 'ant-design-vue'
import { Image } from 'element-ui'
import { primaryTheme } from '@/theme'
import { useInstance, VMInstance, VMInstanceProps } from '@/utils/instance'
import store from '@/store'
import style from '@/style/instance/init-setup.module.less'

export function init(props?: VMInstanceProps): Promise<VMInstance> {
	const { onMounte, onUnmounte } = useInstance()

	@Component
	class SetupDrawer extends Vue {
		private visible: boolean = false
		private themes = [
			{ title: '亮色菜单', theme: 'dark', icon: require('@/assets/icon/1633248922181.svg') },
			{ title: '暗色菜单', theme: 'light', icon: require('@/assets/icon/1633248922182.svg') },
			{ title: '暗黑模式', theme: 'diablo', icon: require('@/assets/icon/1633248922183.svg') }
		]

		private onUpdatePrimary(color: string) {
			store.dispatch('app/setPrimary', { primary: color, loading: true })
		}

		private onUpdateTheme(theme: string) {
			store.dispatch('app/setTheme', theme)
		}

		/**组件挂载**/
		protected mounted() {
			onMounte().finally(() => {
				this.visible = true
			})
		}

		/**组件卸载**/
		protected onUnmounte(key: 'close' | 'submit') {
			onUnmounte({ el: (this as any)._vnode.elm.parentNode, remove: true }).finally(() => {
				this.$emit(key, () => {
					this.visible = false
				})
			})
		}

		protected render() {
			const { app } = store.state
			return (
				<Drawer visible={this.visible} width={300} onClose={() => this.onUnmounte('close')}>
					<div class={style['node-theme']}>
						<h3 class={style['node-theme-title']}>整体风格设置</h3>
						<div class={style['node-theme-conter']}>
							{this.themes.map(k => {
								if (k.theme === 'diablo') {
									return (
										<div class={`${style['node-theme-style']} ${style['node-not-allowed']}`}>
											<Tooltip title={k.title}>
												<Image src={k.icon}></Image>
											</Tooltip>
										</div>
									)
								} else {
									return (
										<div class={style['node-theme-style']}>
											<Tooltip title={k.title}>
												<Image src={k.icon} onClick={() => this.onUpdateTheme(k.theme)}></Image>
											</Tooltip>
											{app.theme === k.theme && (
												<div class={style['node-theme-check']}>
													<Icon type="check" class="primary-icon"></Icon>
												</div>
											)}
										</div>
									)
								}
							})}
						</div>

						<h3 class={style['node-theme-title']}>主题色</h3>
						<div class={style['node-color-conter']}>
							{primaryTheme.map(k => (
								<Tooltip title={k.theme}>
									<div
										class={style['node-color']}
										style={{ backgroundColor: k.color }}
										onClick={() => this.onUpdatePrimary(k.color)}
									>
										{app.primary === k.color && <Icon type="check"></Icon>}
									</div>
								</Tooltip>
							))}
						</div>
					</div>
				</Drawer>
			)
		}
	}

	return new Promise(resolve => {
		const Component = Vue.extend(SetupDrawer)
		const node = new Component().$mount(document.createElement('div'))
		if (typeof props?.getContainer === 'function') {
			props.getContainer().appendChild?.(node.$el)
		} else {
			document.body.appendChild(node.$el)
		}
		resolve(node as SetupDrawer)
	})
}
