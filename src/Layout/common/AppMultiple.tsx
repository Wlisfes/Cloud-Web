import { Vue, Component, Prop } from 'vue-property-decorator'
import { Tabs, Dropdown, Menu, Button, Icon } from 'ant-design-vue'

@Component
export default class AppMultiple extends Vue {
	@Prop({ type: Array, required: true, default: () => [] }) dataSource!: Array<any>
	@Prop({ type: String, required: true, default: () => [] }) path!: string

	protected render() {
		return (
			<div class="app-admin-container-tabs">
				<div class="app-admin-container-tabs-left">
					<Tabs
						activeKey={this.path}
						type="editable-card"
						size="small"
						hideAdd
						onTabClick={(path: string) => this.$router.push(path)}
					>
						{Object.keys([...Array(10)]).map(k => (
							<Tabs.TabPane key={k} closable={parseInt(k) > 6} tab={'🐖 猪头'}></Tabs.TabPane>
						))}
						{this.dataSource.map(k => (
							<Tabs.TabPane key={k.fullPath} tab={k.meta.title}></Tabs.TabPane>
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
