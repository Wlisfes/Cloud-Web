import { Vue, Component } from 'vue-property-decorator'
import { AppRootNode } from '@/components/common'

@Component
export default class Poster extends Vue {
	protected render() {
		return (
			<AppRootNode>
				<div>Poster</div>
			</AppRootNode>
		)
	}
}
