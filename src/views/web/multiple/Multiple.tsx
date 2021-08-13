import { Vue, Component } from 'vue-property-decorator'
import { NodeRoot, NodeHeader } from '@/components/web'

@Component
export default class Multiple extends Vue {
	protected render() {
		return (
			<NodeRoot mask cover="https://oss.lisfes.cn/cloud/cover/2021-08/1628483563992.jpg">
				<NodeHeader slot="header"></NodeHeader>
			</NodeRoot>
		)
	}
}
