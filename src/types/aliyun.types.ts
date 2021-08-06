export type NodeAliyun = {
	VideoId: string
	Title: string
	FileName: string
	TemplateGroupId: string

	UploadAddress: string
	RequestId: string
	UploadAuth: string
}

/**转码模板**/
export type NodeTransfer = {
	Name: string
	IsDefault: boolean
	Locked: boolean
	AppId: string
	TranscodeTemplateGroupId: string
	TranscodeMode: string
	ModifyTime: string
	CreationTime: string
}

/**
 * 创建OssSTS授权
 */
export type NodeOssStsResponse = {
	accessKeyId: string
	accessKeySecret: string
	stsToken: string
	path: string
}

/**
 * 创建音视频
 */
export type NodeCreateAliyunUploadParameter = Pick<NodeAliyun, 'Title' | 'FileName' | 'TemplateGroupId'>
export type NodeCreateAliyunUploadResponse = Pick<NodeAliyun, 'VideoId' | 'RequestId' | 'UploadAddress' | 'UploadAuth'>

/**
 * 刷新上传凭证
 */
export type NodeRefreshAliyunUploadParameter = Pick<NodeAliyun, 'VideoId'>
export type NodeRefreshAliyunUploadResponse = Pick<NodeAliyun, 'VideoId' | 'RequestId' | 'UploadAddress' | 'UploadAuth'>

/**
 * 转码模板
 */
export type NodeAliyunTransferResponse = Pick<NodeAliyun, 'VideoId'> & { list: NodeTransfer[] }
