import { namespace } from 'vuex-class'
import { Vue, Component } from 'vue-property-decorator'
import { Layout, Icon } from 'ant-design-vue'
import { AppMultiple, AppMenu } from '@/Layout/common'
import { AppState } from '@/store/module/app'
const AppModule = namespace('app')

@Component
export default class Index extends Vue {
	@AppModule.State((state: AppState) => state.collapsed) collapsed!: boolean
	@AppModule.State((state: AppState) => state.mobile) mobile!: boolean
	@AppModule.State((state: AppState) => state.multiple) multiple!: Array<any>
	@AppModule.State((state: AppState) => state.path) path!: string
	@AppModule.State((state: AppState) => state.menu) menu!: Array<any>
	@AppModule.State((state: AppState) => state.subKey) subKey!: Array<any>

	protected mounted() {
		this.onLayout()
		window.addEventListener('resize', this.onLayout)
	}

	protected beforeUnmount() {
		window.removeEventListener('resize', this.onLayout)
	}

	//切换菜单收缩
	protected onTrigger() {
		this.$store.commit('app/SET_COLLAPSED', !this.collapsed)
	}

	protected onOpenChange(keys: Array<string>) {
		this.$store.commit('app/SET_SUBKEY', keys)
	}

	//计算屏幕宽度显示mobile界面
	protected onLayout() {
		const width = document.body.getBoundingClientRect().width
		const isMobile = width < 992
		if (isMobile) {
			this.$store.commit('app/SET_COLLAPSED', true)
		}
		this.$store.commit('app/SET_MOBILE', isMobile)
	}

	protected render() {
		return (
			<Layout class={`app-admin-container ${this.mobile ? 'is-mobile' : ''}`}>
				{!this.collapsed && this.mobile && (
					<div class="app-admin-container-mask" onClick={this.onTrigger}></div>
				)}

				<Layout.Sider
					class="app-admin-container-sider"
					theme="dark"
					breakpoint="xl"
					collapsed={this.collapsed}
					collapsedWidth={this.mobile ? 0 : 80}
					width={240}
					trigger={null}
					collapsible
					onBreakpoint={(type: boolean) => this.$store.commit('app/SET_COLLAPSED', type)}
				>
					<div class="app-admin-container-logo">
						<router-link class="app-admin-container-logo-conter" to="/admin">
							<img src="https://oss.lisfes.cn/cloud/stctic/1625035983457.png" />
							{!this.collapsed && <h1 class="app-ellipsis">情雨随风的青春</h1>}
						</router-link>
					</div>
					<AppMenu
						dataSource={this.menu}
						path={[this.path]}
						collapsed={this.collapsed}
						subKey={this.subKey}
						onOpenChange={this.onOpenChange}
					></AppMenu>
				</Layout.Sider>
				<Layout style={{ backgroundColor: '#ededed' }}>
					<Layout.Header style={{ backgroundColor: '#ffffff', padding: 0 }}>
						<Icon
							class="app-admin-container-trigger"
							type={this.collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.onTrigger}
						></Icon>
					</Layout.Header>
					<AppMultiple dataSource={this.multiple} path={this.path}></AppMultiple>
					<Layout.Content style={{ margin: '20px', backgroundColor: '#fff' }}>
						<router-view></router-view>
					</Layout.Content>
				</Layout>
			</Layout>
		)
	}
}
