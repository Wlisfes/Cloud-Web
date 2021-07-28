import { NodeDate, NodeUserResponse } from '@/types'

export type NodeRoleResponse = NodeDate & {
	id: number
	primary: string
	name: string
	status: number
	type: number
	comment: string
	parent: NodeRoleResponse
	children: NodeRoleResponse[]
	page: number
	size: number
	total: number
	uid: number
	message: string
}

/**
 * 角色列表
 */
export type NodeRolesParameter = Pick<NodeRoleResponse, 'page' | 'size'>
export type NodeRolesRespone = Pick<NodeRoleResponse, 'page' | 'size' | 'total'> & { list: NodeRoleResponse[] }

/**
 * 角色信息
 */
export type NodeRoleParameter = Pick<NodeRoleResponse, 'id'>
export type NodeUserRoleRespone = NodeRoleResponse & { user: NodeUserResponse }

/**
 * 角色信息-uid
 */
export type NodeUserUidRoleParameter = Pick<NodeRoleResponse, 'uid'>
export type NodeUserUidRoleRespone = NodeRoleResponse & { user: NodeUserResponse }

/**
 * 修改角色权限
 */
export type NodeUpdateRoleParameter = Pick<NodeRoleResponse, 'id' | 'status' | 'comment'> & { role: number[] }
export type NodeUpdateRoleRespone = Pick<NodeRoleResponse, 'message'>

/**
 * 修改用户角色权限
 */
export type NodeUpdateUserRoleParameter = Pick<NodeRoleResponse, 'uid' | 'status' | 'primary' | 'comment'> & {
	role: number[]
}
export type NodeUpdateUserRoleRespone = Pick<NodeRoleResponse, 'message'>

/**
 * 切换角色状态
 */
export type NodeRoleCutoverParameter = Pick<NodeRoleResponse, 'id'>
export type NodeRoleCutoverRespone = Pick<NodeRoleResponse, 'message'>
