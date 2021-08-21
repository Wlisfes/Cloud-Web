import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Layout, BackTop, Icon } from 'ant-design-vue'
import { NodeLink, NodeUser, NodeSider } from '@/Layout/web/common'
import { NodeBanner } from '@/types'

@Component
export default class Container extends Vue {
	$refs!: { nodeSider: NodeSider }

	@Getter('banner/current') current!: NodeBanner
	private distance: boolean = false

	protected mounted() {
		this.useDistance()
		window.addEventListener('scroll', this.useDistance, false)
	}

	private useDistance() {
		this.distance = (document.body.scrollTop || document.documentElement.scrollTop) > 40
	}

	protected render() {
		return (
			<Layout class="app-web-container">
				<Layout.Header class={`app-web-container-header ${this.distance ? 'is-distance' : ''}`}>
					<div class="app-web-container-header-conter">
						<NodeLink onTrigger={() => this.$refs.nodeSider.onTrigger()}></NodeLink>
						<NodeUser></NodeUser>
					</div>
				</Layout.Header>
				<NodeSider ref="nodeSider"></NodeSider>
				{this.current?.cover && (
					<div
						class="app-web-container-cover"
						style={{ backgroundImage: `url(${this.current?.cover})` }}
						onTouchmove={(e: Event) => this.$emit('touchmove', e)}
					></div>
				)}
				{this.current?.cover && <div class="app-web-container-mask"></div>}
				<Layout.Content class="app-web-container-content">
					<router-view></router-view>
				</Layout.Content>
				<BackTop
					style={{
						backgroundColor: 'rgba(50, 50, 50, 0.9)',
						borderRadius: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Icon type="arrow-up" style={{ fontSize: '16px', color: '#ffffff' }}></Icon>
				</BackTop>
			</Layout>
		)
	}
}
