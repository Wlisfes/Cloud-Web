import { NodeDate } from '@/types'

export type NodeMenuParameter = NodeDate & {
	id: number
	type: number
	name: string
	router: string
	path: string
	keepAlive: number
	status: number
	icon: string | null
	order: number | null
	parent: NodeMenuParameter | null
	children: NodeMenuParameter[]
	message: string
}

/**
 * 创建菜单节点
 */
export type NodeCreateMenuParameter = Pick<
	NodeMenuParameter,
	'type' | 'name' | 'router' | 'path' | 'status' | 'keepAlive'
> &
	Partial<Pick<NodeMenuParameter, 'icon' | 'order' | 'parent'>>
export type NodeCreateMenuResponse = Pick<NodeMenuParameter, 'message'>

/**
 * 菜单信息
 */
export type NodeIDMenuParameter = Pick<NodeMenuParameter, 'id'>

/**
 * 修改菜单
 */
export type NodeUpdateMenuParameter = Pick<
	NodeMenuParameter,
	'id' | 'name' | 'router' | 'path' | 'status' | 'keepAlive'
> &
	Partial<Pick<NodeMenuParameter, 'icon' | 'order' | 'parent'>>
export type NodeUpdateMenuResponse = Pick<NodeMenuParameter, 'message'>

/**
 * 删除菜单
 */
export type NodeDeleteMenuParameter = Pick<NodeMenuParameter, 'id'>
export type NodeDeleteMenuResponse = Pick<NodeMenuParameter, 'message'>
