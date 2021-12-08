import request from '@/utils/request'
import * as types from '@/types'

/**各类总数统计**/
export function nodeComputeTotal() {
	return request<types.NodeComputeTotalResponse>({
		url: `/api/compute/total`,
		method: 'GET'
	})
}

/**各类分组统计**/
export function nodeComputeGroup(params: types.NodeComputeGroupParameter) {
	return request<types.NodeComputeGroupResponse>({
		url: `/api/compute/group`,
		method: 'GET',
		params
	})
}
