import { Vue, Component, Prop } from 'vue-property-decorator'
import { Menu, Icon } from 'ant-design-vue'

@Component
export default class AppMenu extends Vue {
	@Prop({ type: Array, default: () => [] }) dataSource!: Array<any>
	@Prop({ type: Array, default: () => [] }) path!: Array<string>
	@Prop({ type: Boolean, default: false }) collapsed!: boolean
	@Prop({ type: Array, default: () => [] }) subKey!: Array<string>

	protected render() {
		return (
			<Menu
				style={{ width: '100%' }}
				theme="dark"
				mode="inline"
				selectedKeys={this.path}
				openKeys={this.subKey}
				inlineCollapsed={this.collapsed}
				onOpenChange={(keys: Array<string>) => this.$emit('openChange', keys)}
			>
				<Menu.Item key="/admin/home">
					<router-link to="/admin/home">
						<Icon type="home" style={{ fontSize: '18px' }}></Icon>
						<span>首页</span>
					</router-link>
				</Menu.Item>
				<Menu.SubMenu
					key="/admin/user"
					title={
						<div>
							<Icon type="home" style={{ fontSize: '18px' }}></Icon>
							<span>User</span>
						</div>
					}
				>
					<Menu.Item key="/admin/user/list">
						<router-link to="/admin/user/list">
							<span>User</span>
						</router-link>
					</Menu.Item>
					<Menu.Item key="/admin/user/role">
						<router-link to="/admin/user/role">
							<span>Role</span>
						</router-link>
					</Menu.Item>
				</Menu.SubMenu>
			</Menu>
		)
	}
}
