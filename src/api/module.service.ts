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

/**模块权限信息-授权管理端**/
export function nodeModule(params: types.NodeModuleNodeParameter) {
	return request<types.NodeModuleNodeResponse>({
		url: `/api/module/info`,
		method: 'GET',
		params
	})
}

/**************************************************************************************/
/**创建接口权限-授权管理端**/
export function nodeCreateModuleAction(params: types.NodeCreateModuleActionParameter) {
	return request<types.NodeCreateModuleActionResponse>({
		url: `/api/module/create-action`,
		method: 'POST',
		data: params
	})
}

/**修改接口权限-授权管理端**/
export function nodeUpdateModuleAction(params: types.NodeUpdateModuleActionParameter) {
	return request<types.NodeUpdateModuleActionResponse>({
		url: `/api/module/update-action`,
		method: 'PUT',
		data: params
	})
}

/**接口权限列表-授权管理端**/
export function nodeModuleActions(params: types.NodeModuleActionsParameter) {
	return request<types.NodeModuleActionsResponse>({
		url: `/api/module/action/list-node`,
		method: 'GET',
		params
	})
}

/**接口权限信息-授权管理端**/
export function nodeModuleAction(params: types.NodeModuleActionParameter) {
	return request<types.NodeModuleActionResponse>({
		url: `/api/module/action/info`,
		method: 'GET',
		params
	})
}
