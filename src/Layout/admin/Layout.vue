<script>
import { defineComponent, reactive } from 'vue'
import { RouterView } from 'vue-router'
import { Layout } from 'ant-design-vue'

export default defineComponent({
	name: 'Layout',
	setup() {
		const state = reactive({
			collapsed: false
		})

		return () => {
			return (
				<Layout class="app-layout">
					<Layout.Sider v-model={[state.collapsed, 'collapsed']} width={220} collapsible></Layout.Sider>
					<Layout>
						<Layout.Header></Layout.Header>
						<Layout.Content>
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
}
</style>
