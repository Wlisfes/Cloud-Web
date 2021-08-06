import { Vue, Component } from 'vue-property-decorator'
import { Popover, Button, Menu } from 'ant-design-vue'

@Component
export default class AppPopover extends Vue {
	private visible: boolean = false

	private onChange(props: any) {
		this.visible = false
		this.$emit('change', props)
	}

	protected render() {
		return (
			<Popover v-model={this.visible} trigger="click" placement="topRight" overlayClassName="app-popover">
				<Menu slot="content" onClick={this.onChange}>
					{this.$slots.default}
				</Menu>
				<Button type="link">操作</Button>
			</Popover>
		)
	}
}
