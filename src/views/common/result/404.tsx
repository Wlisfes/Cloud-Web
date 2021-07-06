import { Vue, Component } from 'vue-property-decorator'
import { Result, Button } from 'ant-design-vue'

@Component
export default class App404 extends Vue {
	protected render() {
		return (
			<div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Result status="404" title="页面不存在">
					<Button slot="extra" type="primary">
						<router-link to="/" replace>
							返回首页
						</router-link>
					</Button>
				</Result>
			</div>
		)
	}
}
