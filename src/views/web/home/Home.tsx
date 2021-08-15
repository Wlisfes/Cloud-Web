import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { NodeRoot, NodeHeader, NodeFooter } from '@/components/web'
import { Icon, Space } from 'ant-design-vue'
import { NodeBanner } from '@/types'
import style from '@/style/web/web.home.module.less'

@Component
export default class Home extends Vue {
	$refs!: { root: HTMLElement & NodeRoot }

	@Getter('banner/current') current!: NodeBanner

	protected render() {
		return (
			<NodeRoot mask cover={this.current?.cover} onTouchmove={(e: Event) => e.preventDefault()}>
				<NodeHeader slot="header"></NodeHeader>
				<div slot="content" class={style['app-conter']}>
					<div style={{ flex: 1 }}></div>
					<div class={style['root-banner']}>
						<Space size={15}>
							<div class={style['root-banner-item']} onClick={() => this.$store.dispatch('banner/prev')}>
								<Icon type="left" />
							</div>
							<div class={style['root-banner-item']} onClick={() => this.$store.dispatch('banner/next')}>
								<Icon type="right" />
							</div>
						</Space>
					</div>
					<NodeFooter></NodeFooter>
				</div>
			</NodeRoot>
		)
	}
}
