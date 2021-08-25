import { Vue, Component, Prop } from 'vue-property-decorator'
import style from '@/style/web/common/node.multiple.stpone.module.less'

@Component
export default class NodeMultipleStpone extends Vue {
	@Prop({ type: String, default: '' }) html!: string

	protected render() {
		return (
			<div class={style['app-conter']}>
				<div class="node-html" domPropsInnerHTML={this.html}></div>
			</div>
		)
	}
}
