<script>
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { Layout } from 'ant-design-vue'

export default defineComponent({
	name: 'Layout',
	setup() {
		return () => {
			return (
				<Layout class="app-layout">
					<RouterView></RouterView>
				</Layout>
			)
		}
	}
})
</script>

<style lang="less" scoped>
.app-layout {
	height: 100%;
}
</style>
