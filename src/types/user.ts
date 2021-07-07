/**登录*************************************************/
export interface LoginParameter {
	account: number
	password: string
	code: string
}
export interface LoginResponse {
	token: string
}

/**注册*************************************************/
export interface RegisterParameter {
	nickname: string
	password: string
	email: string
	code: string
}
export interface RegisterResponse {
	message: string
}

/**用户信息*********************************************/
export interface GetUserResponse {
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
