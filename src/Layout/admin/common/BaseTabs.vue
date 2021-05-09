<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Tabs } from 'ant-design-vue'

export default defineComponent({
	name: 'AppTabs',
	props: {
		routes: {
			type: Array,
			default: () => []
		},
		path: {
			type: String
		}
	},
	setup(props) {
		const router = useRouter()

		return () => {
			return (
				<div class="app-tabs">
					<Tabs activeKey={props.path} hideAdd type="editable-card" onTabClick={path => router.push(path)}>
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
		.ant-tabs-tab {
			height: 32px !important;
			margin-right: 5px !important;
			line-height: 32px !important;
			background: #ffffff !important;
			border: 1px solid #dedede;
			&.ant-tabs-tab-active {
				border: 1px solid #1890ff;
				.ant-tabs-close-x {
					color: #1890ff;
				}
			}
		}
		.ant-tabs-tab-prev,
		.ant-tabs-tab-next {
			height: 32px !important;
			line-height: 32px !important;
		}
	}
}
</style>
