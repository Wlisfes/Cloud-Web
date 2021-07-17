import { Vue, Component } from 'vue-property-decorator'
import style from '@/style/admin/admin.cloud.module.less'

@Component
export default class Cloud extends Vue {
	protected render() {
		return <div class={style['app-conter']}>Cloud</div>
	}
}
