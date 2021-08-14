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

/**轮播壁纸**/
export function nodeBanner() {
	return request<Array<types.NodeBanner>>({
		url: `/api/banner`,
		method: 'GET'
	})
}
