import request from '@/utils/request'
import * as types from '@/types'

/**创建OssSTS授权**/
export function nodeOssSts(params?: any) {
	return request<types.NodeOssStsResponse>({
		url: `/api/aliyun/node-oss-sts`,
		method: 'POST',
		data: params
	})
}
