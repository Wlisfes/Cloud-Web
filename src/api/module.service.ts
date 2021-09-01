import request from '@/utils/request'
import * as types from '@/types'

/**创建模块权限-授权管理端**/
export function nodeCreateModule(params: types.NodeCreateModuleParameter) {
	return request<types.NodeCreateModuleResponse>({
		url: `/api/module/create`,
		method: 'POST',
		data: params
	})
}

/**修改模块权限-授权管理端**/
export function nodeUpdateModule(params: types.NodeUpdateModuleParameter) {
	return request<types.NodeUpdateModuleResponse>({
		url: `/api/module/update`,
		method: 'PUT',
		data: params
	})
}

/**模块权限列表-授权管理端**/
export function nodeModules(params: types.NodeModulesParameter) {
	return request<types.NodeModulesResponse>({
		url: `/api/module/list-node`,
		method: 'GET',
		params
	})
}
