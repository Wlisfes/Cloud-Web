import { Getter } from 'vuex-class'
import { Vue, Component } from 'vue-property-decorator'
import { NodeRoot, NodeHeader } from '@/components/web'
import { NodeBanner } from '@/types'

@Component
export default class Multiple extends Vue {
	@Getter('banner/current') current!: NodeBanner

	protected render() {
		return (
			<NodeRoot mask cover={this.current?.cover}>
				<NodeHeader slot="header"></NodeHeader>
			</NodeRoot>
		)
	}
}
