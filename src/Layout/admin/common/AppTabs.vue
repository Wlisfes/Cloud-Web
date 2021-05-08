<script>
import { defineComponent } from 'vue'
import { Tabs } from 'ant-design-vue'

export default defineComponent({
	name: 'AppTabs',
	props: {
		routes: {
			type: Array,
			default: () => []
		}
	},
	setup(props) {
		return () => {
			return (
				<div class="app-tabs">
					<Tabs hideAdd type="editable-card">
						{props.routes.map(k => (
							<Tabs.TabPane key={k.fullPath} tab={k.meta.title}></Tabs.TabPane>
						))}
					</Tabs>
				</div>
			)
		}
	}
})
</script>

<style lang="less" scoped>
.app-tabs {
	padding: 0 20px;
	background-color: #ffffff;
	::v-deep(.ant-tabs-bar) {
		margin: 0;
		border: none;
	}
}
</style>
