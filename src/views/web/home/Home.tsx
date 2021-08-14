import { Getter } from 'vuex-class'
import { Vue, Component } from 'vue-property-decorator'
import { NodeRoot, NodeHeader } from '@/components/web'
import { NodeBanner } from '@/types'
import style from '@/style/web/web.home.module.less'

@Component
export default class Home extends Vue {
	$refs!: { root: HTMLElement & NodeRoot }

	@Getter('banner/current') current!: NodeBanner

	protected render() {
		return (
			<NodeRoot mask cover={this.current?.cover} class={style['app-conter']}>
				<NodeHeader slot="header"></NodeHeader>
			</NodeRoot>
		)
	}
}
