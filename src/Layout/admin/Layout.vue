<script>
import { defineComponent, reactive, watch, computed, onMounted, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore, mapState } from 'vuex'
import { RouterView, useRoute, RouterLink } from 'vue-router'
import { Layout, Menu } from 'ant-design-vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { AppTabs } from '@/Layout/admin/common'
import { routes } from '@/router'
import { filterRoutes } from '@/utils/common'

export default defineComponent({
	name: 'Layout',
	setup() {
		const store = useStore('app')
		const route = useRoute()
		const app = computed(() => store.state)
		const state = reactive({
			width: 0,
			mobile: false,
			collapsed: false,
			menu: [],
			routes: []
		})

		const width = computed(() => store.state)

		console.log(app)
		// state.menu = filterRoutes(routes)
		// onMounted(() => {
		// 	onLayout()
		// 	console.log(state.menu)
		// })
		// onBeforeMount(() => {
		// 	window.addEventListener('resize', onLayout)
		// })
		// onBeforeUnmount(() => {
		// 	window.removeEventListener('resize', onLayout)
		// })

		const onTrigger = () => {
			state.collapsed = !state.collapsed
		}
		// const onLayout = () => {
		// 	const width = document.body.getBoundingClientRect().width
		// 	if (state.width !== width) {
		// 		const isMobile = width < 992
		// 		if (isMobile) {
		// 			state.collapsed = true
		// 		}
		// 		state.mobile = isMobile
		// 		state.width = width
		// 	}
		// }

		// watch(
		// 	() => route,
		// 	async tag => {
		// 		console.log(tag)
		// 		if (tag.name && tag.meta && tag.meta.tagHidden !== true) {
		// 			let matched = [tag.name]
		// 			if (tag.matched) {
		// 				matched = tag.matched.map(item => item.name)
		// 			}
		// 			const params = {
		// 				path: tag.path,
		// 				fullPath: tag.fullPath,
		// 				query: tag.query,
		// 				params: tag.params,
		// 				name: tag.name,
		// 				matched: matched,
		// 				meta: { ...tag.meta }
		// 			}
		// 			const target = state.routes.find(item => item.path === params.path)
		// 			if (target) {
		// 				if (params.fullPath !== target.fullPath) Object.assign(target, params)
		// 				return
		// 			}
		// 			state.routes.push(Object.assign({}, params))
		// 		}
		// 	},
		// 	{ immediate: true }
		// )

		return () => {
			return (
				<Layout class={`app-layout ${state.mobile ? 'is-mobile' : ''}`}>
					{!state.collapsed && state.mobile && <div class="app-sider-mask" onClick={onTrigger}></div>}
					<Layout.Sider
						class="app-sider"
						v-model={[state.collapsed, 'collapsed']}
						theme="dark"
						breakpoint="xl"
						collapsedWidth={state.mobile ? 0 : 80}
						width={220}
						trigger={null}
						collapsible
					>
						<Menu theme="dark" mode="inline">
							{state.menu.map(k => {
								return k.children?.length ? (
									<Menu.SubMenu key={k.path} title={k.meta?.title}>
										{k.children.map(v => (
											<Menu.Item key={v.path}>
												<RouterLink to={v.path}>{v.meta?.title}</RouterLink>
											</Menu.Item>
										))}
									</Menu.SubMenu>
								) : (
									<Menu.Item key={k.path}>{k.meta?.title}</Menu.Item>
								)
							})}
						</Menu>
					</Layout.Sider>
					<Layout>
						<Layout.Header style={{ backgroundColor: '#ffffff', padding: 0 }}>
							<div>
								{state.collapsed ? (
									<MenuUnfoldOutlined class="trigger" onClick={onTrigger} />
								) : (
									<MenuFoldOutlined class="trigger" onClick={onTrigger} />
								)}
							</div>
						</Layout.Header>
						<AppTabs routes={state.routes}></AppTabs>
						<Layout.Content style={{ margin: '12px', backgroundColor: '#fff' }}>
							<RouterView></RouterView>
						</Layout.Content>
					</Layout>
				</Layout>
			)
		}
	}
})
</script>

<style lang="less">
.app-layout {
	height: 100%;
	&.is-mobile {
		.app-sider {
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
			z-index: 999;
		}
	}
	.trigger {
		font-size: 18px;
		cursor: pointer;
		transition: color 0.3s;
		line-height: 64px;
		padding: 0 23px;
		&:hover {
			color: #1890ff;
		}
	}
	.app-sider-mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 998;
		overflow: hidden;
		background: #000;
		opacity: 0.5;
		transition: all 300ms;
	}
}
</style>
