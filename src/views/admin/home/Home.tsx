import { Vue, Component } from 'vue-property-decorator'
import { AppRootNode } from '@/components/common'
import { NodeSource, NodeCompute } from '@/views/admin/home/common'
import { nodeComputeTotal } from '@/api'
import { HttpStatus, NodeComputeTotalResponse } from '@/types'
import style from '@/style/admin/admin.home.module.less'

@Component
export default class Home extends Vue {
	private node: NodeComputeTotalResponse | null = null

	protected created() {
		this.nodeComputeTotal()
	}

	/**各类总数统计**/
	private async nodeComputeTotal() {
		try {
			const { code, data } = await nodeComputeTotal()
			if (code === HttpStatus.OK) {
				this.node = data
			}
		} catch (e) {}
	}

	protected render() {
		return (
			<AppRootNode>
				<div class={style['app-conter']}>
					<NodeSource node={this.node}></NodeSource>
					<NodeCompute></NodeCompute>
				</div>
			</AppRootNode>
		)
	}
}
