<script>
import { defineComponent, onMounted, onBeforeMount, onBeforeUnmount } from 'vue'
import { RouterView } from 'vue-router'
import { Layout } from 'ant-design-vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useStore } from '@/store'
import { BaseTabs, BaseMenu } from '@/Layout/admin/common'
import { routes } from '@/router'
import web from '@/router/common/web'

export default defineComponent({
	name: 'Layout',
	setup() {
		const store = useStore()

		store.commit('app/SET_MENU', routes)
		console.log(web.filter(k => k.meta.menu))

		onMounted(() => onLayout())
		onBeforeMount(() => window.addEventListener('resize', onLayout))
		onBeforeUnmount(() => window.removeEventListener('resize', onLayout))

		//切换菜单收缩
		const onTrigger = () => store.commit('app/SET_COLLAPSED', !store.state.app.collapsed)

		//计算屏幕宽度显示mobile界面
		const onLayout = () => {
			const width = document.body.getBoundingClientRect().width
			const isMobile = width < 992
			if (isMobile) {
				store.commit('app/SET_COLLAPSED', true)
			}
			store.commit('app/SET_MOBILE', isMobile)
		}

		//菜单展开事件
		const onOpenChange = keys => store.commit('app/SET_SUBKEY', keys)

		return () => {
			return (
				<Layout class={`app-layout ${store.state.app.mobile ? 'is-mobile' : ''}`}>
					{!store.state.app.collapsed && store.state.app.mobile && (
						<div class="app-sider-mask" onClick={onTrigger}></div>
					)}

					<Layout.Sider
						class="app-sider"
						style={{ overflow: 'hidden' }}
						v-model={[store.state.app.collapsed, 'collapsed']}
						theme="dark"
						breakpoint="xl"
						collapsedWidth={store.state.app.mobile ? 0 : 80}
						width={220}
						trigger={null}
						collapsible
					>
						<BaseMenu
							path={[store.state.app.path]}
							subKey={store.state.app.subKey}
							menu={store.state.app.menu}
							collapsed={store.state.app.collapsed}
							onOpenChange={onOpenChange}
						></BaseMenu>
					</Layout.Sider>
					<Layout>
						<Layout.Header style={{ backgroundColor: '#ffffff', padding: 0 }}>
							<div>
								{store.state.app.collapsed ? (
									<MenuUnfoldOutlined class="trigger" onClick={onTrigger} />
								) : (
									<MenuFoldOutlined class="trigger" onClick={onTrigger} />
								)}
							</div>
						</Layout.Header>
						{true && <BaseTabs routes={store.state.app.routes} path={store.state.app.path}></BaseTabs>}
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

<style lang="less" scoped>
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
