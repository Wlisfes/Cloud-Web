import { Getter } from 'vuex-class'
import { Vue, Component } from 'vue-property-decorator'
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
						<Space size={10}>
							<div class={style['root-banner-item']}>
								<Icon
									type="left"
									style={{ color: '#ffffff', fontSize: '20px' }}
									onClick={() => {
										this.$store.dispatch('banner/prev')
									}}
								/>
							</div>
							<div class={style['root-banner-item']}>
								<Icon
									type="right"
									style={{ color: '#ffffff', fontSize: '20px' }}
									onClick={() => {
										this.$store.dispatch('banner/next')
									}}
								/>
							</div>
						</Space>
					</div>
					<NodeFooter></NodeFooter>
				</div>
			</NodeRoot>
		)
	}
}
