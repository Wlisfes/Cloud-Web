/**邮箱注册验证码****************************************/
export interface NodeEmailCodeParameter {
	email: string
}
export interface NodeEmailCodeResponse {
	message: string
	code: number
}
