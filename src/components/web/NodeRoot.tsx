import { Vue, Component, Prop } from 'vue-property-decorator'
import { NodeMask } from '@/components/web'
import style from '@/style/common/node.root.module.less'

@Component
export default class NodeRoot extends Vue {
	@Prop({ type: String, default: '' }) cover!: string
	@Prop({ type: Boolean, default: false }) mask!: boolean

	/**背景图加载**/
	private useCover() {
		if (this.cover) {
			return {
				backgroundImage: `url(${this.cover})`
			}
		}
		return {}
	}

	protected render() {
		return (
			<section style={{ ...this.useCover() }} class={style['node-root']}>
				{this.mask && <NodeMask></NodeMask>}
				{this.$slots.header}
				{this.$slots.content}
			</section>
		)
	}
}
