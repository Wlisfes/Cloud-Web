import { NodeDate } from '@/types'

export type NodeModule = NodeDate & {
	id: number
	primary: string
	name: string
	comment: string
	status: number
}

export type NodeModuleParameter = NodeModule & {
	total: number
	page: number
	size: number
	action: number[]
	message: string
}

/**
 * 创建模块权限
 */
export type NodeCreateModuleParameter = Pick<NodeModuleParameter, 'name' | 'primary'> &
	Partial<Pick<NodeModuleParameter, 'status' | 'comment' | 'action'>>
export type NodeCreateModuleResponse = Pick<NodeModuleParameter, 'message'>

/**
 * 修改模块权限
 */
export type NodeUpdateModuleParameter = Pick<NodeModuleParameter, 'id' | 'name' | 'primary'> &
	Partial<Pick<NodeModuleParameter, 'status' | 'comment' | 'action'>>
export type NodeUpdateModuleResponse = Pick<NodeModuleParameter, 'message'>

/**
 * 模块权限列表
 */
export type NodeModulesParameter = Pick<NodeModuleParameter, 'page' | 'size'> &
	Partial<Pick<NodeModuleParameter, 'status' | 'name'>>
export type NodeModulesResponse = Pick<NodeModuleParameter, 'page' | 'size' | 'total'> & {
	list: NodeModule & { action: NodeModule }[]
}
