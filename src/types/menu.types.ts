import { NodeDate, NodeRoleResponse } from '@/types'

export type NodeMenu = NodeDate & {
	id: number
	type: number
	role: NodeRoleResponse[]
	name: string
	router: string
	path: string | undefined
	keepAlive: number
	status: number
	visible: number
	icon: string | null
	order: number | null
	parent: NodeMenuParameter | null
	children: NodeMenuParameter[]
}

export type NodeMenuParameter = NodeMenu & {
	message: string
}

/**
 * 创建菜单节点
 */
export type NodeCreateMenuParameter = Pick<
	NodeMenuParameter,
	'type' | 'name' | 'router' | 'path' | 'visible' | 'keepAlive'
> &
	Partial<Pick<NodeMenuParameter, 'icon' | 'order' | 'parent'>> & {
		role: number[]
	}
export type NodeCreateMenuResponse = Pick<NodeMenuParameter, 'message'>

/**
 * 菜单信息
 */
export type NodeMenuNodeParameter = Pick<NodeMenuParameter, 'id'>
export type NodeMenuNodeResponse = NodeMenu

/**
 * 修改菜单
 */
export type NodeUpdateMenuParameter = Pick<
	NodeMenuParameter,
	'id' | 'type' | 'name' | 'router' | 'path' | 'visible' | 'keepAlive'
> &
	Partial<Pick<NodeMenuParameter, 'icon' | 'order' | 'parent'>> & {
		role: number[]
	}
export type NodeUpdateMenuResponse = Pick<NodeMenuParameter, 'message'>

/**
 * 切换菜单状态
 */
export type NodeMenuCutoverParameter = Pick<NodeMenuParameter, 'id'>
export type NodeMenuCutoverResponse = Pick<NodeMenuParameter, 'message'>

/**
 * 删除菜单
 */
export type NodeDeleteMenuParameter = Pick<NodeMenuParameter, 'id'>
export type NodeDeleteMenuResponse = Pick<NodeMenuParameter, 'message'>
