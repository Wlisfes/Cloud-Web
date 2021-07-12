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

/**注册-Parameter*************************************************/
export interface RegisterParameter {
	nickname: string
	password: string
	email: string
	code: string
}
/**注册-Response**/
export interface RegisterResponse {
	message: string
}

/**用户信息-Response*********************************************/
export interface GetUserResponse extends DateInterface {
	id: number
	uid: number
	account: number
	nickname: string
	email: string
	password: string
	avatar: string
	mobile: number
	status: number
}
