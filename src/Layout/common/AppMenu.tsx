import { Getter } from 'vuex-class'
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Menu, Icon } from 'ant-design-vue'

@Component
export default class AppMenu extends Vue {
	@Getter('base/theme') theme!: string
	@Getter('base/collapsed') collapsed!: boolean
	@Getter('base/mobile') mobile!: boolean
	@Getter('base/menu') dataSource!: Array<any>
	@Getter('base/openKeys') openKeys!: Array<string>
	@Getter('base/selectedKeys') selectedKeys!: Array<string>

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

	private onTrigger() {
		if (this.mobile) {
			this.$store.commit('base/SET_COLLAPSED', true)
		}
	}

	private onChange(keys: string) {
		this.$store.commit('base/SET_OPENKEYS', keys)
	}

	protected render() {
		return (
			<Menu
				style={{ width: '100%' }}
				theme={this.theme}
				mode="inline"
				selectedKeys={this.selectedKeys}
				openKeys={this.openKeys}
				inlineCollapsed={this.collapsed}
				onClick={this.onTrigger}
				onOpenChange={this.onChange}
			>
				{/* <AppMenuSource dataSource={this.dataSource}></AppMenuSource> */}
				{this.dataSource.map(k => {
					if (k.visible === 0) {
						return null
					}
					if (k.type === 1) {
						return (
							<Menu.SubMenu
								key={k.id}
								title={
									<div>
										{k.icon && <Icon type={k.icon} style={{ fontSize: '16px' }}></Icon>}
										<span>{k.name}</span>
									</div>
								}
							>
								{k.children.map((v: any) => {
									if (v.visible === 0) {
										return null
									}
									if (v.type === 1) {
										return (
											<Menu.SubMenu
												key={v.id}
												title={
													<div>
														{v.icon && (
															<Icon type={v.icon} style={{ fontSize: '14px' }}></Icon>
														)}
														<span>{v.name}</span>
													</div>
												}
											>
												{v.children.map((x: any) => {
													if (x.visible === 0) {
														return null
													}
													if (x.type === 1) {
														return (
															<Menu.SubMenu
																key={x.id}
																title={
																	<div>
																		{x.icon && (
																			<Icon
																				type={x.icon}
																				style={{ fontSize: '14px' }}
																			></Icon>
																		)}
																		<span>{x.name}</span>
																	</div>
																}
															></Menu.SubMenu>
														)
													} else {
														return (
															<Menu.Item key={x.id}>
																<router-link to={x.router}>
																	{x.icon && (
																		<Icon
																			type={x.icon}
																			style={{ fontSize: '14px' }}
																		></Icon>
																	)}
																	<span>{x.name}</span>
																</router-link>
															</Menu.Item>
														)
													}
												})}
											</Menu.SubMenu>
										)
									} else {
										return (
											<Menu.Item key={v.id}>
												<router-link to={v.router}>
													{v.icon && <Icon type={v.icon} style={{ fontSize: '14px' }}></Icon>}
													<span>{v.name}</span>
												</router-link>
											</Menu.Item>
										)
									}
								})}
							</Menu.SubMenu>
						)
					} else if (k.type === 2) {
						return (
							<Menu.Item key={k.id}>
								<router-link to={k.router}>
									<Icon type={k.icon} style={{ fontSize: '16px' }}></Icon>
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
