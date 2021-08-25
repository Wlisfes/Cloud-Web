import { Vue, Component } from 'vue-property-decorator'
import style from '@/style/web/web.stpone.module.less'

@Component
export default class Stpone extends Vue {
	protected render() {
		return <div class={style['app-conter']}></div>
	}
}
