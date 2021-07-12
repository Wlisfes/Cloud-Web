import { Vue, Component } from 'vue-property-decorator'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

@Component
export default class App extends Vue {
	render() {
		return (
			<div id="app" style={{ height: '100%' }}>
				<ConfigProvider locale={zhCN}>
					<router-view></router-view>
				</ConfigProvider>
			</div>
		)
	}
}
