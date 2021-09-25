import { NodeDate } from '@/types'

export type NodeModule = NodeDate & {
	id: number
	primary: string
	name: string
	comment: string
	status: number
	action: NodeModule[]
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
	list: NodeModule[]
}

/**
 * 模块权限信息
 */
export type NodeModuleNodeParameter = Pick<NodeModuleParameter, 'id'>
export type NodeModuleNodeResponse = NodeModule & {
	action: NodeModule[]
}

/*********************************************************************************************/ /**
 * 创建接口权限
 */
export type NodeCreateModuleActionParameter = Pick<NodeModuleParameter, 'name' | 'primary'> &
	Partial<Pick<NodeModuleParameter, 'status' | 'comment'>>
export type NodeCreateModuleActionResponse = Pick<NodeModuleParameter, 'message'>

/**
 * 修改接口权限
 */
export type NodeUpdateModuleActionParameter = Pick<NodeModuleParameter, 'id' | 'name' | 'primary'> &
	Partial<Pick<NodeModuleParameter, 'status' | 'comment'>>
export type NodeUpdateModuleActionResponse = Pick<NodeModuleParameter, 'message'>

/**
 * 接口权限列表
 */
export type NodeModuleActionsParameter = Pick<NodeModuleParameter, 'page' | 'size'> &
	Partial<Pick<NodeModuleParameter, 'status' | 'name'>>
export type NodeModuleActionsResponse = Pick<NodeModuleParameter, 'page' | 'size' | 'total'> & {
	list: NodeModule[]
}

/**
 *  接口权限信息
 */
export type NodeModuleActionParameter = Pick<NodeModuleParameter, 'id'>
export type NodeModuleActionResponse = NodeModule
