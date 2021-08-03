import { Vue, Component } from 'vue-property-decorator'
import style from '@/style/admin/admin.source.module.less'

@Component
export default class Source extends Vue {
	protected render() {
		return <div class={style['app-conter']}>Source</div>
	}
}
