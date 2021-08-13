import { Vue, Component } from 'vue-property-decorator'
import { NodeRoot, NodeHeader } from '@/components/web'
import style from '@/style/web/web.home.module.less'

@Component
export default class Home extends Vue {
	$refs!: { root: HTMLElement & NodeRoot }

	protected render() {
		return (
			<NodeRoot
				mask
				cover="https://oss.lisfes.cn/cloud/cover/2021-08/1628497707293.jpg"
				class={style['app-conter']}
			>
				<NodeHeader slot="header"></NodeHeader>
			</NodeRoot>
		)
	}
}
