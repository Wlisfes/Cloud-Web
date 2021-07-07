import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Menu, Icon } from 'ant-design-vue'

@Component
export default class AppMenu extends Vue {
	@Prop({ type: Array, default: () => [] }) dataSource!: Array<any>
	@Prop({ type: Boolean, default: false }) collapsed!: boolean
	@Prop({ type: Array, default: () => [] }) selectedKeys!: Array<string>
	@Prop({ type: Array, default: () => [] }) openKeys!: Array<string>

	private keys: string[] = []

	@Watch('collapsed', { immediate: true })
	onCollapsed() {
		if (this.collapsed) {
			this.keys = this.openKeys
			this.$store.commit('base/SET_OPENKEYS', [])
		} else {
			if (this.keys.length) {
				this.$store.commit('base/SET_OPENKEYS', this.keys)
			}
		}
	}

	protected render() {
		return (
			<Menu
				style={{ width: '100%' }}
				theme="dark"
				mode="inline"
				selectedKeys={this.selectedKeys}
				openKeys={this.openKeys}
				inlineCollapsed={this.collapsed}
				onOpenChange={(keys: string) => {
					this.$store.commit('base/SET_OPENKEYS', keys)
				}}
			>
				{this.dataSource.map(k => {
					if (k.type === 1) {
						return (
							<Menu.SubMenu
								key={k.router}
								title={
									<div>
										<Icon type={k.icon} style={{ fontSize: '18px' }}></Icon>
										<span>{k.name}</span>
									</div>
								}
							>
								{k.children.map((v: any) => (
									<Menu.Item key={v.router}>
										<router-link to={v.router}>
											<Icon type={v.icon} style={{ fontSize: '18px' }}></Icon>
											<span>{v.name}</span>
										</router-link>
									</Menu.Item>
								))}
							</Menu.SubMenu>
						)
					} else if (k.type === 2) {
						return (
							<Menu.Item key={k.router}>
								<router-link to={k.router}>
									<Icon type={k.icon} style={{ fontSize: '18px' }}></Icon>
									<span>{k.name}</span>
								</router-link>
							</Menu.Item>
						)
					}
				})}
			</Menu>
		)
	}
}
