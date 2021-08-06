import { Vue, Component } from 'vue-property-decorator'
import { AppRootNode } from '@/components/common'

@Component
export default class Home extends Vue {
	protected render() {
		return (
			<AppRootNode>
				<div>Home</div>
			</AppRootNode>
		)
	}
}
