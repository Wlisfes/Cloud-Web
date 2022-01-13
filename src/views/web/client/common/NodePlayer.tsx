import { Vue, Component, Prop } from 'vue-property-decorator'
import style from '@/style/web/web.player.module.less'

@Component
export default class NodePlayer extends Vue {
	@Prop({ type: Boolean, default: true }) loading!: boolean

	protected render() {
		return (
			<div class={style['app-player']}>
				<div class={style['app-player-scale']} v-loading={this.loading}>
					<div class={style['app-player-conter']}>{this.$slots.player}</div>
				</div>
			</div>
		)
	}
}
