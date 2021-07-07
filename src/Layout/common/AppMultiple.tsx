import { Getter } from 'vuex-class'
import { Vue, Component } from 'vue-property-decorator'
import { Tabs, Dropdown, Menu, Icon } from 'ant-design-vue'

@Component
export default class AppMultiple extends Vue {
	@Getter('base/multiple') multiple!: Array<any>
	@Getter('base/path') path!: string

	protected render() {
		return (
			<div class="app-admin-container-tabs">
				<div class="app-admin-container-tabs-left">
					<Tabs
						activeKey={this.path}
						type="editable-card"
						size="small"
						hideAdd
						tabBarStyle={{ borderBottom: 'none', marginBottom: '10px' }}
						onTabClick={(path: string) => this.$router.push(path)}
					>
						{this.multiple.map(k => (
							<Tabs.TabPane key={k.path} closable={!(k.path === '/admin/home')}>
								<span slot="tab">
									<Dropdown trigger={['contextmenu']}>
										<Menu slot="overlay">
											<Menu.Item key="closeOthersTabs">
												<a>关闭其他</a>
											</Menu.Item>
											<Menu.Item key="closeLeftTabs">
												<a>关闭左侧</a>
											</Menu.Item>
											<Menu.Item key="closeRightTabs">
												<a>关闭右侧</a>
											</Menu.Item>
											<Menu.Item key="closeAllTabs">
												<a>关闭全部</a>
											</Menu.Item>
										</Menu>
										<span>{k.name}</span>
									</Dropdown>
								</span>
							</Tabs.TabPane>
						))}
					</Tabs>
				</div>
				<div class="app-admin-container-tabs-right">
					<Dropdown>
						<Menu slot="overlay">
							<Menu.Item key="closeOthersTabs">
								<a>关闭其他</a>
							</Menu.Item>
							<Menu.Item key="closeLeftTabs">
								<a>关闭左侧</a>
							</Menu.Item>
							<Menu.Item key="closeRightTabs">
								<a>关闭右侧</a>
							</Menu.Item>
							<Menu.Item key="closeAllTabs">
								<a>关闭全部</a>
							</Menu.Item>
						</Menu>
						<Icon type="appstore" class="app-admin-container-tabs-trigger"></Icon>
					</Dropdown>
				</div>
			</div>
		)
	}
}
