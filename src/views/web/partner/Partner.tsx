import { Vue, Component } from 'vue-property-decorator'
import { NodeRoot, NodeHeader } from '@/components/web'

@Component
export class Partner extends Vue {
	protected render() {
		return (
			<NodeRoot mask cover="https://oss.lisfes.cn/cloud/cover/2021-08/1628153942854.png">
				<NodeHeader slot="header"></NodeHeader>
			</NodeRoot>
		)
	}
}
