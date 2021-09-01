import { Vue, Component } from 'vue-property-decorator'
import { Table, Button, FormModel, notification } from 'ant-design-vue'
import { NodeRole } from '@/views/admin/setup/common'
import { AppRootNode, AppSatus } from '@/components/common'
import { nodeRoles, nodeRoleCutover } from '@/api'
import { HttpStatus, Source, NodeRoleResponse } from '@/types'

@Component
export default class Action extends Vue {
	protected render() {
		return <div></div>
	}
}
