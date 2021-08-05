export interface UploadOption {
	/**添加文件成功回调**/
	addFileSuccess?: (props: any) => void
	/**开始上传**/
	onUploadstarted?: (props: any) => void
	/**文件上传成功**/
	onUploadSucceed: (props: any) => void
	/**文件上传失败**/
	onUploadFailed: (props: any, code?: number, message?: string) => void
	/**取消文件上传**/
	onUploadCanceled: (props: any, code?: number, message?: string) => void
	/**文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上**/
	onUploadProgress: (uploadInfo: any, totalSize?: any, progress?: any) => void
	/**上传凭证超时**/
	onUploadTokenExpired: (props: any) => void
	/**全部文件上传结束**/
	onUploadEnd: (props: any) => void
}

export class AliyunUploadModule {
	private uploader: any
	constructor(props: UploadOption) {
		this.init(props)
	}

	/**初始化**/
	private init(option: UploadOption) {
		this.uploader = new window.AliyunUpload.Vod({
			timeout: 60000,
			partSize: 1048576,
			parallel: 5,
			retryCount: 3,
			retryDuration: 2,
			region: 'cn-shanghai',
			userId: 1509113157031868,
			addFileSuccess: (props: any) => {
				option.addFileSuccess && option.addFileSuccess(props)
			},
			onUploadstarted: (props: any) => {
				option.onUploadstarted && option.onUploadstarted(props)
			},
			onUploadSucceed: (props: any) => {
				option.onUploadSucceed && option.onUploadSucceed(props)
			},
			onUploadFailed: (props: any) => {
				option.onUploadFailed && option.onUploadFailed(props)
			},
			onUploadCanceled: (props: any) => {
				option.onUploadCanceled && option.onUploadCanceled(props)
			},
			onUploadProgress: (props: any) => {
				option.onUploadProgress && option.onUploadProgress(props)
			},
			onUploadTokenExpired: (props: any) => {
				option.onUploadTokenExpired && option.onUploadTokenExpired(props)
			},
			onUploadEnd: (props: any) => {
				option.onUploadEnd && option.onUploadEnd(props)
			}
		})
	}

	/**添加文件**/
	public addFile(file: File) {
		const userData = '{"Vod":{}}'
		this.uploader.addFile(file, null, null, null, userData)
	}

	/**开始上传**/
	public startUpload() {
		this.uploader.startUpload()
	}

	/**暂停上传**/
	public stopUpload() {
		this.uploader.stopUpload()
	}

	/**恢复上传**/
	public resumeUpload() {
		this.uploader.startUpload()
	}
}
