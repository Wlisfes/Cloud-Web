import { DateInterface } from '@/types'

/**登录-Parameter*************************************************/
export interface LoginParameter {
	account: number
	password: string
	code: string
}
/**登录-Response**/
export interface LoginResponse {
	token: string
}

/**注册用户-Parameter*************************************************/
export interface RegisterParameter {
	nickname: string
	password: string
	email: string
	code: string
}
/**注册用户-Response**/
export interface RegisterResponse {
	message: string
}

/**创建用户-Parameter*************************************************/
export interface NodeCreateUserParameter {
	nickname: string
	password: string
	status: number
	role: number
	email?: string | null
	avatar?: string | null
	mobile?: number | string | null
	comment?: string | null
}
/**创建用户-Response**/
export interface NodeCreateUserResponse {
	message: string
}

/**用户信息-Parameter**/
export interface NodeUidUserParameter {
	uid: number
}
/**用户信息-Response*********************************************/
export interface NodeUserResponse extends DateInterface {
	id: number
	uid: number
	account: number
	nickname: string
	email: string
	password: string
	avatar: string
	mobile: number
	status: number
	comment: string
}

/**用户列表-Parameter*********************************************/
export interface NodeUsersParameter {
	page: number
	size: number
}
/**用户列表-Response**/
export interface NodeUsersResponse extends NodeUsersParameter {
	total: number
	list: NodeUserResponse[]
}

/**切换用户状态-Parameter*********************************************/
export interface NodeUserCutoverParameter {
	uid: number
}
/**切换用户状态-Response**/
export interface NodeUserCutoverResponse {
	message: string
}

/**修改用户信息-Parameter*********************************************/
export interface NodeUpdateUserParameter {
	uid: number
	nickname: string
	status: number
	password?: string | null
	email?: string | null
	avatar?: string | null
	mobile?: number | string | null
	comment?: string | null
}
/**修改用户信息-Response**/
export interface NodeUpdateUserResponse {
	message: string
}
