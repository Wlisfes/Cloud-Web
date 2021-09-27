import { Vue, Component } from 'vue-property-decorator'
import { AppRootNode } from '@/components/common'

@Component
export default class Logs extends Vue {
	protected render() {
		return (
			<AppRootNode>
				<div>Partner</div>
			</AppRootNode>
		)
	}
}
