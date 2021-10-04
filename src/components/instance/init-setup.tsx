import { Vue } from 'vue-property-decorator'
import { Drawer, Tooltip, Icon } from 'ant-design-vue'
import { Image } from 'element-ui'
import { primaryTheme } from '@/theme'
import store from '@/store'
import style from '@/style/instance/init-setup.module.less'

export function init(): Promise<{ self: any; done: Function }> {
	return new Promise((resolve, reject) => {
		const nodeComponent = Vue.extend({
			name: 'NodeDrawer',
			data() {
				return {
					visible: true,
					themes: [
						{ title: '亮色菜单', theme: 'dark', icon: require('@/assets/icon/1633248922181.svg') },
						{ title: '暗色菜单', theme: 'light', icon: require('@/assets/icon/1633248922182.svg') },
						{ title: '暗黑模式', theme: 'diablo', icon: require('@/assets/icon/1633248922183.svg') }
					]
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
				onUpdatePrimary(color: string) {
					store.dispatch('app/setPrimary', color)
				},
				onUpdateTheme(theme: string) {
					store.dispatch('app/setTheme', theme)
				},
				onClose() {
					reject({ self: this, done: this.remove })
				},
				onSubmit() {
					resolve({ self: this, done: this.remove })
				}
			},
			render() {
				const { app } = store.state
				return (
					<Drawer visible={this.visible} width={300} destroyOnClose onClose={this.onClose}>
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
													<Image
														src={k.icon}
														onClick={() => this.onUpdateTheme(k.theme)}
													></Image>
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
		})
		const node = new nodeComponent().$mount(document.createElement('div'))
		document.body.appendChild(node.$el)
	})
}
