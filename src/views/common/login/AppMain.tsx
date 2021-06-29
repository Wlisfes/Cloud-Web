import { Vue, Component } from 'vue-property-decorator'
import style from '@/style/common/app.main.module.less'

@Component
export default class Main extends Vue {
	protected render() {
		return (
			<div class={style['app-conter']}>
				<div class={style['app-conter-form']}>
					<router-view></router-view>
				</div>
			</div>
		)
	}
}
