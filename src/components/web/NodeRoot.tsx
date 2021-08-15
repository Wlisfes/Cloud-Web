import { Vue, Component, Prop } from 'vue-property-decorator'
import { NodeMask } from '@/components/web'
import style from '@/style/common/node.root.module.less'

@Component
export default class NodeRoot extends Vue {
	@Prop({ type: String, default: '' }) cover!: string
	@Prop({ type: Boolean, default: false }) mask!: boolean

	protected render() {
		return (
			<section class={style['node-root']} onTouchmove={(e: Event) => this.$emit('touchmove', e)}>
				{this.cover && (
					<div
						class={style['node-root-cover']}
						style={{ backgroundImage: `url(${this.cover})` }}
						onTouchmove={(e: Event) => this.$emit('touchmove', e)}
					></div>
				)}
				{this.mask && <NodeMask></NodeMask>}
				{this.$slots.header}
				{this.$slots.content}
			</section>
		)
	}
}
