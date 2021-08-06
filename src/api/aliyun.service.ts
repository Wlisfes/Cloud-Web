import request from '@/utils/request'
import * as types from '@/types'

/**创建OssSTS授权**/
export function nodeOssSts() {
	return request<types.NodeOssStsResponse>({
		url: `/api/aliyun/node-oss-sts`,
		method: 'POST'
	})
}

/**创建上传凭证**/
export function nodeCreateAliyunUpload(params: types.NodeCreateAliyunUploadParameter) {
	return request<types.NodeCreateAliyunUploadResponse>({
		url: `/api/aliyun/node-create`,
		method: 'POST',
		data: params
	})
}

/**刷新上传凭证**/
export function nodeRefreshAliyunUpload(params: types.NodeRefreshAliyunUploadParameter) {
	return request<types.NodeRefreshAliyunUploadResponse>({
		url: `/api/aliyun/node-refresh`,
		method: 'POST',
		data: params
	})
}

/**转码模板列表**/
export function nodeAliyunTransfer() {
	return request<types.NodeAliyunTransferResponse>({
		url: `/api/aliyun/node-transfer`,
		method: 'GET'
	})
}
