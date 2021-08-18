import { Vue, Component, Prop } from 'vue-property-decorator'
import { Layout } from 'ant-design-vue'
import { NodeMask, NodeLink, NodeUser, NodeSider } from '@/components/web'
import style from '@/style/common/node.root.module.less'

@Component
export default class NodeRoot extends Vue {
	$refs!: { nodeSider: NodeSider }

	@Prop({ type: String, default: '' }) cover!: string
	@Prop({ type: Boolean, default: false }) mask!: boolean

	protected render() {
		return (
			<Layout class={style['node-root']}>
				<Layout.Header class={style['node-root-header']}>
					<div class={style['node-root-header-conter']}>
						<NodeLink onTrigger={() => this.$refs.nodeSider.onTrigger()}></NodeLink>
						<NodeUser></NodeUser>
					</div>
				</Layout.Header>
				<NodeSider ref="nodeSider"></NodeSider>
				{this.cover && (
					<div
						class={style['node-root-cover']}
						style={{ backgroundImage: `url(${this.cover})` }}
						onTouchmove={(e: Event) => this.$emit('touchmove', e)}
					></div>
				)}
				{this.mask && <NodeMask></NodeMask>}
				<Layout.Content style={{ marginTop: '50px', zIndex: 9 }}>
					<router-view></router-view>
				</Layout.Content>
			</Layout>
		)
	}
}
