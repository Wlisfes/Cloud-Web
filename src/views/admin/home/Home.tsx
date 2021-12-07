import { Vue, Component } from 'vue-property-decorator'
import { AppRootNode } from '@/components/common'
import { NodeSource } from '@/views/admin/home/common'
import style from '@/style/admin/admin.home.module.less'

@Component
export default class Home extends Vue {
	protected render() {
		return (
			<AppRootNode>
				<div class={style['app-conter']}>
					<NodeSource></NodeSource>
				</div>
			</AppRootNode>
		)
	}
}
