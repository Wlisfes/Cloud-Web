import { Vue, Component } from 'vue-property-decorator'
import { Button } from 'ant-design-vue'
import { NodeMenu } from '@/views/admin/setup/common'

@Component
export default class Menu extends Vue {
	$refs!: { nodeMenu: NodeMenu }

	protected render() {
		return (
			<div>
				<Button onClick={() => this.$refs.nodeMenu.init()}>Create</Button>
				<NodeMenu ref="nodeMenu" onReplay={() => console.log('onReplay')}></NodeMenu>
			</div>
		)
	}
}
