import { Vue, Component, Prop } from 'vue-property-decorator'
import { Tabs } from 'ant-design-vue'

@Component
export default class AppMultiple extends Vue {
	@Prop({ type: Array, required: true, default: () => [] }) dataSource!: Array<any>
	@Prop({ type: String, required: true, default: () => [] }) path!: string

	protected render() {
		return (
			<div class="app-tabs">
				<Tabs
					activeKey={this.path}
					hideAdd
					type="editable-card"
					onTabClick={(path: string) => this.$router.push(path)}
				>
					{this.dataSource.map(k => (
						<Tabs.TabPane key={k.fullPath} tab={k.meta.title}></Tabs.TabPane>
					))}
				</Tabs>
			</div>
		)
	}
}
