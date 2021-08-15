import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { NodeRoot, NodeHeader } from '@/components/web'
import { NodeBanner } from '@/types'

@Component
export default class Partner extends Vue {
	@Getter('banner/current') current!: NodeBanner

	protected render() {
		return (
			<NodeRoot mask cover={this.current?.cover}>
				<NodeHeader slot="header"></NodeHeader>
			</NodeRoot>
		)
	}
}
