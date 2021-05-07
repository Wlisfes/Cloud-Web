<script>
import { defineComponent, reactive, onMounted, onBeforeMount, onBeforeUnmount } from 'vue'
import { RouterView } from 'vue-router'
import { Layout } from 'ant-design-vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

export default defineComponent({
	name: 'Layout',
	setup() {
		const state = reactive({
			width: 0,
			mobile: false,
			collapsed: false
		})
		onMounted(() => onLayout())
		onBeforeMount(() => {
			window.addEventListener('resize', onLayout)
		})
		onBeforeUnmount(() => {
			window.removeEventListener('resize', onLayout)
		})

		const onTrigger = () => {
			state.collapsed = !state.collapsed
		}
		const onLayout = () => {
			const width = document.body.getBoundingClientRect().width
			if (state.width !== width) {
				const isMobile = width < 992
				if (isMobile) {
					state.collapsed = true
				}
				state.mobile = isMobile
				state.width = width
			}
		}

		return () => {
			return (
				<Layout class={`app-layout ${state.mobile ? 'is-mobile' : ''}`}>
					{!state.collapsed && state.mobile && <div class="app-sider-mask" onClick={onTrigger}></div>}
					<Layout.Sider
						class="app-sider"
						v-model={[state.collapsed, 'collapsed']}
						theme="light"
						breakpoint="xl"
						collapsedWidth={state.mobile ? 0 : 80}
						width={220}
						trigger={null}
						collapsible
					></Layout.Sider>
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
