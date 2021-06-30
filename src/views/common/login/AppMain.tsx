import { Vue, Component } from 'vue-property-decorator'
import style from '@/style/common/app.main.module.less'

@Component
export default class AppMain extends Vue {
	protected render() {
		return (
			<div class={style['app-conter']}>
				<div class={style['app-conter-form']}>
					<div class={style['app-logo']}>
						<img
							class={style['app-logo-cover']}
							src="https://oss.lisfes.cn/cloud/stctic/1625035983457.png"
						/>
						<h1 style={{ marginBottom: 0 }}>欢迎到来</h1>
					</div>
					<router-view></router-view>
				</div>
			</div>
		)
	}
}
