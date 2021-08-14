export type NodeDate = {
	createTime: string
	updateTime: string
}
export interface DateInterface {
	createTime: string
	updateTime: string
}

/**邮箱注册验证码****************************************/
export interface NodeEmailCodeParameter {
	email: string
}
export interface NodeEmailCodeResponse {
	message: string
	code: number
}

/**
 * 轮播壁纸
 */
export type NodeBanner = {
	start: string
	end: string
	cover: string
	name: string
	search: string
}
