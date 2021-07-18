/**创建OssSTS授权**************************************/
export interface NodeOssStsResponse {
	accessKeyId: string
	accessKeySecret: string
	stsToken: string
	path: string
}
