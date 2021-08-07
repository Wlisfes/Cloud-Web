export type NodeAliyun = {
	VideoId: string
	Title: string
	FileName: string
	TemplateGroupId: string
	AuthTimeout: number
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

/**基础信息**/
export type NodeBaseAliyun = {
	VideoId: string
	CoverURL: string
	Duration: number
	MediaType: string
	OutputType: string
	Status: string
	Title: string
	TranscodeMode: string
	CreationTime: string
}
/**播放信息列表**/
export type NodeAliyunPlay = {
	Bitrate: string
	CreationTime: string
	Definition: string
	Duration: string
	Encrypt: number
	Format: string
	Fps: string
	Height: number
	JobId: string
	ModificationTime: string
	NarrowBandType: string
	PlayURL: string
	PreprocessStatus: string
	Size: number
	Specification: string
	Status: string
	StreamType: string
	Width: number
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

/**
 * 获取播放信息
 */
export type NodeAliyunPlayParameter = Pick<NodeAliyun, 'VideoId' | 'AuthTimeout'>
export type NodeAliyunPlayResponse = Pick<NodeAliyun, 'RequestId'> & {
	base: NodeBaseAliyun
	list: NodeAliyunPlay[]
}
