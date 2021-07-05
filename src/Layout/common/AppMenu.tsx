import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Menu, Icon } from 'ant-design-vue'

@Component
export default class AppMenu extends Vue {
	@Prop({ type: Array, default: () => [] }) dataSource!: Array<any>
	@Prop({ type: Boolean, default: false }) collapsed!: boolean
	@Prop({ type: Array, default: () => [] }) selectedKeys!: Array<string>
	@Prop({ type: Array, default: () => [] }) openKeys!: Array<string>

	private state = {
		openKeys: []
	}

	@Watch('collapsed', { immediate: true })
	onCollapsed() {
		if (this.collapsed) {
			this.state.openKeys = this.openKeys as never[]
			this.$store.state.app.openKeys = []
		} else {
			this.$store.state.app.openKeys = this.state.openKeys
		}
	}

	private onOpenChange(keys: Array<string>) {
		this.$store.commit('app/SET_SUBKEY', keys)
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
				onOpenChange={this.onOpenChange}
			>
				{this.dataSource.map(k => {
					if (k.type === 1) {
						return (
							<Menu.SubMenu
								key={k.id}
								title={
									<div>
										<Icon type={k.icon} style={{ fontSize: '18px' }}></Icon>
										<span>{k.name}</span>
									</div>
								}
							>
								{k.children.map((v: any) => (
									<Menu.Item key={v.id}>
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
							<Menu.Item key={k.id}>
								<router-link to={k.router}>
									<Icon type={k.icon} style={{ fontSize: '18px' }}></Icon>
									<span>{k.name}</span>
								</router-link>
							</Menu.Item>
						)
					}
				})}
				{/* <Menu.Item key="1" onClick={(a: any) => console.log(a)}>
					<router-link to="/admin/home">
						<Icon type="home" style={{ fontSize: '18px' }}></Icon>
						<span>首页</span>
					</router-link>
				</Menu.Item>
				<Menu.SubMenu
					key="2"
					title={
						<div>
							<Icon type="user" style={{ fontSize: '18px' }}></Icon>
							<span>User</span>
						</div>
					}
				>
					<Menu.Item key="3">
						<router-link to="/admin/user/list">
							<span>User</span>
						</router-link>
					</Menu.Item>
					<Menu.Item key="4">
						<router-link to="/admin/user/role">
							<span>Role</span>
						</router-link>
					</Menu.Item>
				</Menu.SubMenu>
				<Menu.SubMenu
					key="5"
					title={
						<div>
							<Icon type="cloud" style={{ fontSize: '18px' }}></Icon>
							<span>Cloud</span>
						</div>
					}
				>
					<Menu.Item key="6">
						<router-link to="/admin/cloud/list">
							<span>Cloud</span>
						</router-link>
					</Menu.Item>
				</Menu.SubMenu> */}
			</Menu>
		)
	}
}
