import request from '@/utils/request'
import * as types from '@/types'

/**各类总数统计**/
export function nodeComputeTotal() {
	return request<types.NodeComputeTotalResponse>({
		url: `/api/compute/total`,
		method: 'GET'
	})
}
