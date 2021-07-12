import { Vue, Component } from 'vue-property-decorator'
import { Table } from 'ant-design-vue'
import { nodeRoles } from '@/api'
import { HttpStatus, NodeRolesRespone } from '@/types'

type State = {
	common: {
		dataSource: NodeRolesRespone[]
	}
}
@Component
export default class Role extends Vue {
	private state: State = {
		common: {
			dataSource: []
		}
	}

	protected created() {
		this.nodeRoles()
	}

	/**角色列表**/
	public async nodeRoles() {
		try {
			const { code, data } = await nodeRoles()
			if (code === HttpStatus.OK) {
				this.state.common.dataSource = data
			}
		} catch (e) {}
	}

	protected render() {
		return (
			<div>
				<Table></Table>
			</div>
		)
	}
}
