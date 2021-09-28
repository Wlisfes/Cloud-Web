import { Getter } from 'vuex-class'
import { Vue, Component } from 'vue-property-decorator'
import { Layout, Icon } from 'ant-design-vue'
import { AppMultiple, AppMenu, AppTitle, AppUser } from '@/Layout/admin/common'

@Component
export default class Container extends Vue {
	@Getter('base/theme') theme!: string
	@Getter('base/mobile') mobile!: boolean
	@Getter('base/collapsed') collapsed!: boolean

	private distance(): number {
		if (this.mobile) {
			return 0
		} else if (this.collapsed) {
			return 80
		} else {
			return 220
		}
	}

	//切换菜单收缩
	private onTrigger() {
		this.$store.commit('base/SET_COLLAPSED', !this.collapsed)
	}

	protected render() {
		return (
			<Layout class={`app-admin-container ${this.mobile ? 'is-mobile' : ''}`}>
				{!this.collapsed && this.mobile && (
					<div
						class="app-admin-container-mask"
						onTouchmove={(e: Event) => e.preventDefault()}
						onClick={this.onTrigger}
					></div>
				)}

				<Layout.Sider
					class="app-admin-container-sider"
					theme={this.theme}
					breakpoint="xl"
					collapsed={this.collapsed}
					collapsedWidth={this.mobile ? 0 : 80}
					width={220}
					trigger={null}
					collapsible
					onBreakpoint={(type: boolean) => this.$store.commit('base/SET_COLLAPSED', type)}
					onTouchmove={(e: Event) => e.preventDefault()}
				>
					<div class="app-admin-container-logo">
						<router-link class="app-admin-container-logo-conter" to="/admin">
							<img src="https://oss.lisfes.cn/cloud/stctic/1625035983457.png" />
							{!this.collapsed && <h1 class="app-ellipsis">情雨随风的青春</h1>}
						</router-link>
					</div>
					<div class="app-menu">
						<AppMenu></AppMenu>
					</div>
				</Layout.Sider>
				<Layout>
					<Layout.Header style={{ left: this.distance() + 'px' }}>
						<div class="ant-layout-header-conter">
							<div class="app-admin-container-trigger">
								<Icon
									type={this.collapsed ? 'menu-unfold' : 'menu-fold'}
									onClick={this.onTrigger}
								></Icon>
							</div>
							<AppTitle></AppTitle>
							<div
								style={{
									flex: 1,
									display: 'flex',
									justifyContent: 'flex-end',
									margin: '0 30px 0 15px'
								}}
							>
								<AppUser></AppUser>
							</div>
						</div>
						<AppMultiple></AppMultiple>
					</Layout.Header>

					<Layout.Content style={{ marginTop: '87px', backgroundColor: '#ededed' }}>
						<router-view></router-view>
					</Layout.Content>
				</Layout>
			</Layout>
		)
	}
}
