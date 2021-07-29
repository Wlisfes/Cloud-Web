import request from '@/utils/request'
import * as types from '@/types'

/**邮箱注册验证码**/
export function nodeEmailCode(params: types.NodeEmailCodeParameter) {
	return request<types.NodeEmailCodeResponse>({
		url: `/api/nodemailer/register-code`,
		method: 'POST',
		data: params
	})
}

/**获取菜单列表**/
export function nodeMenu1(params?: any) {
	return request({
		url: `/api/menu/list`,
		method: 'GET',
		data: params
	})
}
