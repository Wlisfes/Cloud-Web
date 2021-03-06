import request from '@/utils/request'
import * as types from '@/types'

/**创建日志-授权管理端**/
export function nodeCreatePartner(params: types.NodeCreatePartnerParameter) {
	return request<types.NodeCreatePartnerResponse>({
		url: `/api/partner/create`,
		method: 'POST',
		data: params
	})
}

/**修改日志-授权管理端**/
export function nodeUpdatePartner(params: types.NodeUpdatePartnerParameter) {
	return request<types.NodeUpdatePartnerResponse>({
		url: `/api/partner/update`,
		method: 'PUT',
		data: params
	})
}

/**切换日志状态-授权管理端**/
export function nodePartnerCutover(params: types.NodePartnerCutoverParameter) {
	return request<types.NodePartnerCutoverResponse>({
		url: `/api/partner/cutover`,
		method: 'PUT',
		data: params
	})
}

/**日志信息-授权管理端**/
export function nodePartner(params: types.NodePartnerParameter) {
	return request<types.NodePartnerResponse>({
		url: `/api/partner/info`,
		method: 'GET',
		params
	})
}

/**日志列表-授权管理端**/
export function nodePartners(params: types.NodePartnersParameter) {
	return request<types.NodePartnersResponse>({
		url: `/api/partner/list-node`,
		method: 'GET',
		params
	})
}

/**日志列表-客户端**/
export function nodeClientPartners(params: types.NodeClientPartnersParameter) {
	return request<types.NodePartnersResponse>({
		url: `/api/partner/client/list-node`,
		method: 'GET',
		params
	})
}

/**删除日志-授权管理端**/
export function nodeDeletePartner(params: types.NodeDeletePartnerParameter) {
	return request<types.NodeDeletePartnerResponse>({
		url: `/api/partner/del`,
		method: 'DELETE',
		params
	})
}
