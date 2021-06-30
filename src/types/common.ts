/**登录*************************************************/
export interface LoginParameter {
	username: string
	password: string
	code: string
}
export interface LoginResponse {
	token: string
}

/**注册*************************************************/
export interface RegisterParameter {
	username: string
	nickname: string
	password: string
	email: string
	code: string
}
export interface RegisterResponse {
	message: string
}

/**邮箱注册验证码****************************************/
export interface NodeEmailCodeParameter {
	email: string
}
export interface NodeEmailCodeResponse {
	message: string
	code: number
}
