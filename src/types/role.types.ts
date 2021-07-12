import { DateInterface, GetUserResponse } from '@/types'

export interface RoleInterface extends DateInterface {
	id: number
	primary: string
	name: string
	status: number
}

/**角色列表-Respone*********************************************/
export interface NodeRolesRespone extends RoleInterface {
	children: RoleInterface[]
}

/**角色信息-Parameter*************************************************/
export interface NodeRoleParameter {
	id: number
}

/**用户角色信息-Respone*********************************************/
export interface NodeUserRoleRespone extends RoleInterface {
	children: RoleInterface[]
	user: GetUserResponse
}
