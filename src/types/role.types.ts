import { NodeDate } from '@/types'

export type NodeRole = NodeDate & {
	id: number
	primary: string
	name: string
	status: number
	comment: string
	action: null | string[]
}

export type NodeRoleResponse = NodeRole & {
	page: number
	size: number
	total: number
	message: string
}

/**
 * 创建角色
 */
export type NodeCreateRoleParameter = Pick<NodeRole, 'primary' | 'name'> &
	Partial<Pick<NodeRole, 'comment' | 'status'>> & { action?: null | string[] }
export type NodeCreateRoleRespone = Pick<NodeRoleResponse, 'message'>

/**
 * 角色列表
 */
export type NodeRolesParameter = Pick<NodeRoleResponse, 'page' | 'size'>
export type NodeRolesRespone = Pick<NodeRoleResponse, 'page' | 'size' | 'total'> & { list: NodeRole[] }

/**
 * 角色信息
 */
export type NodeRoleParameter = Pick<NodeRoleResponse, 'id'>
export type NodeUserRoleRespone = NodeRole

/**
 * 修改角色
 */
export type NodeUpdateRoleParameter = Pick<NodeRole, 'id' | 'primary' | 'name'> &
	Partial<Pick<NodeRole, 'comment' | 'status'>> & { action?: null | string[] }
export type NodeUpdateRoleRespone = Pick<NodeRoleResponse, 'message'>

/**
 * 切换角色状态
 */
export type NodeRoleCutoverParameter = Pick<NodeRoleResponse, 'id'>
export type NodeRoleCutoverRespone = Pick<NodeRoleResponse, 'message'>
