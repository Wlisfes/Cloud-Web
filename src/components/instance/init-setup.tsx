import { Vue } from 'vue-property-decorator'
import { Drawer, Tooltip, Icon } from 'ant-design-vue'
import { Image } from 'element-ui'
import { primaryTheme } from '@/utils/theme'
import style from '@/style/instance/init-setup.module.less'

export function init(): Promise<{ self: any; done: Function }> {
	return new Promise((resolve, reject) => {
		const nodeComponent = Vue.extend({
			name: 'NodeDrawer',
			data() {
				return {
					visible: true
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
				onUpdate(color: string) {
					console.log(color)
				},
				onClose() {
					reject({ self: this, done: this.remove })
				},
				onSubmit() {
					resolve({ self: this, done: this.remove })
				}
			},
			render() {
				return (
					<Drawer visible={this.visible} width={300} destroyOnClose onClose={this.onClose}>
						<div class={style['node-theme']}>
							<h3 class={style['node-theme-title']}>整体风格设置</h3>
							<div class={style['node-theme-conter']}>
								<div class={style['node-theme-style']}>
									<Tooltip title="亮色菜单">
										<Image src={require('@/assets/icon/1633248922181.svg')}></Image>
									</Tooltip>
								</div>
								<div class={style['node-theme-style']}>
									<Tooltip title="暗色菜单">
										<Image src={require('@/assets/icon/1633248922182.svg')}></Image>
									</Tooltip>
								</div>
								<div class={`${style['node-theme-style']} ${style['node-not-allowed']}`}>
									<Tooltip title="暗黑模式">
										<Image src={require('@/assets/icon/1633248922183.svg')}></Image>
									</Tooltip>
								</div>
							</div>

							<h3 class={style['node-theme-title']}>主题色</h3>
							<div class={style['node-color-conter']}>
								{primaryTheme.map(k => (
									<Tooltip title={k.theme}>
										<div
											class={style['node-color']}
											style={{ backgroundColor: k.color }}
											onClick={() => this.onUpdate(k.color)}
										>
											{/* <Icon type="check"></Icon> */}
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
