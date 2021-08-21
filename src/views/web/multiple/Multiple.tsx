import { Vue, Component } from 'vue-property-decorator'
import { AppSearch } from '@/components/common'
import style from '@/style/web/web.multiple.module.less'

@Component
export default class Multiple extends Vue {
	protected render() {
		return (
			<div class={style['app-conter']}>
				<AppSearch></AppSearch>
			</div>
		)
	}
}
