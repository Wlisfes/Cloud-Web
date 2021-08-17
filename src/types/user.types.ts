import { NodeDate, NodeRoleResponse } from '@/types'

export type NodeUserParameter = {
	id: number
	uid: number
	account: number
	nickname: string
	email: string | null
	avatar: string | null
	comment: string | null
	mobile: number | string | null
	password: string
	status: number
	code: string
	token: string
	message: string
	page: number
	size: number
	total: number
}

/**
 * 登录
 */
export type LoginParameter = Pick<NodeUserParameter, 'account' | 'password' | 'code'>
export type LoginResponse = Pick<NodeUserParameter, 'token'>

/**
 * 注册
 */
export type RegisterParameter = Pick<NodeUserParameter, 'nickname' | 'password' | 'email' | 'code'>
export type RegisterResponse = Pick<NodeUserParameter, 'token' | 'message'>

/**
 * 创建用户
 */
export type NodeCreateUserParameter = Pick<NodeUserParameter, 'nickname' | 'password' | 'status'> &
	Partial<Pick<NodeUserParameter, 'email' | 'avatar' | 'mobile' | 'comment'>> & { role: number }
export type NodeCreateUserResponse = Pick<NodeUserParameter, 'message'>

/**
 * 用户信息
 */
export type NodeUidUserParameter = Pick<NodeUserParameter, 'uid'>
export type NodeUserResponse = Pick<
	NodeUserParameter,
	'id' | 'uid' | 'account' | 'nickname' | 'email' | 'password' | 'avatar' | 'mobile' | 'status' | 'comment'
> & { role: NodeRoleResponse } & NodeDate

/**
 * 用户列表
 */
export type NodeUsersParameter = Pick<NodeUserParameter, 'page' | 'size'> & {
	status?: number
	primary?: string
	keyword?: string
}
export type NodeUsersResponse = Pick<NodeUserParameter, 'page' | 'size' | 'total'> & { list: NodeUserResponse[] }

/**
 * 切换用户状态
 */
export type NodeUserCutoverParameter = Pick<NodeUserParameter, 'uid'>
export type NodeUserCutoverResponse = Pick<NodeUserParameter, 'message'>

/**
 * 修改用户信息
 */
export type NodeUpdateUserParameter = Pick<NodeUserParameter, 'uid' | 'nickname' | 'status'> &
	Partial<Pick<NodeUserParameter, 'password' | 'email' | 'avatar' | 'mobile' | 'comment'>>
export type NodeUpdateUserResponse = Pick<NodeUserParameter, 'message'>

/**
 * 重置用户密码
 */
export type NodeUpdatePwsUserParameter = Pick<NodeUserParameter, 'uid' | 'password'>
export type NodeUpdatePwsUserResponse = Pick<NodeUserParameter, 'message'>
