<script>
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu } from 'ant-design-vue'
import { BankOutlined, PieChartOutlined, RadarChartOutlined } from '@ant-design/icons-vue'

export default defineComponent({
	name: 'BaseMenu',
	props: {
		menu: {
			type: Array,
			default: () => []
		},
		collapsed: {
			type: Boolean,
			default: false
		},
		path: {
			type: Array,
			default: () => []
		},
		subKey: {
			type: Array,
			default: () => []
		}
	},
	setup(props) {
		return () => {
			return (
				<Menu
					selectedKeys={props.path}
					openKeys={props.subKey}
					style={{ width: '100%' }}
					theme="dark"
					mode="inline"
					inlineCollapsed={props.collapsed}
				>
					{props.menu.map(k => {
						if (k.meta.affix) {
							{
								return [
									'/admin/home/a',
									'/admin/home/b',
									'/admin/home/c',
									'/admin/home/d',
									'/admin/home/e'
								].map(k => (
									<Menu.Item key="/admin/home">
										<RouterLink to="/admin/home">
											<BankOutlined />
											<span>"/admin/home"</span>
										</RouterLink>
									</Menu.Item>
								))
							}
							// return [
							// 	...k.children.map(v => (
							// 		<Menu.Item key={v.path}>
							// 			<RouterLink to={v.path}>
							// 				<BankOutlined />
							// 				<span>{v.meta.title}</span>
							// 			</RouterLink>
							// 		</Menu.Item>
							// 	))
							// ]
						} else {
							if (k.children?.length) {
								return (
									<Menu.SubMenu
										key={k.path}
										title={
											<>
												<RadarChartOutlined />
												<span>{k.meta.title}</span>
											</>
										}
									>
										{k.children.map(v => (
											<Menu.Item key={v.path}>
												<RouterLink to={v.path}>
													<PieChartOutlined />
													<span>{v.meta.title}</span>
												</RouterLink>
											</Menu.Item>
										))}
									</Menu.SubMenu>
								)
							}
							return (
								<Menu.Item key={k.path}>
									<RouterLink to={k.path}>
										<PieChartOutlined />
										<span>{k.meta.title}</span>
									</RouterLink>
								</Menu.Item>
							)
						}
					})}
				</Menu>
			)
		}
	}
})
</script>
