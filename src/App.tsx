import { Vue, Component } from 'vue-property-decorator'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

@Component
export default class App extends Vue {
	protected mounted() {
		this.onLayout()
		window.addEventListener('resize', this.onLayout)
	}

	protected beforeUnmount() {
		window.removeEventListener('resize', this.onLayout)
	}

	//计算屏幕宽度显示mobile界面
	private onLayout() {
		const width = document.body.getBoundingClientRect().width
		const isMobile = width < 992
		if (isMobile) {
			this.$store.commit('base/SET_COLLAPSED', true)
		}
		this.$store.commit('base/SET_WIDTH', width)
		this.$store.commit('base/SET_MOBILE', isMobile)
	}

	protected render() {
		return (
			<div id="app" style={{ height: '100%' }}>
				<ConfigProvider locale={zhCN}>
					<router-view></router-view>
				</ConfigProvider>
			</div>
		)
	}
}
