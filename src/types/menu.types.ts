import { NodeDate } from '@/types'

export type NodeMenuParameter = {
	id: number
	type: number
	name: string
	router: string
	path: string
	keepAlive: number
	status: number
	redirect: string | null
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
	Partial<Pick<NodeMenuParameter, 'redirect' | 'icon' | 'order' | 'parent'>>
export type NodeCreateMenuResponse = Pick<NodeMenuParameter, 'message'>
