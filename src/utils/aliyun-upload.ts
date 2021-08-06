import { nodeCreateAliyunUpload, nodeRefreshAliyunUpload } from '@/api'
import { HttpStatus } from '@/types'

export interface UploadOption {
	title: string
	fileName: string
	transfer: string
	/**添加文件成功回调**/
	addFileSuccess?: (props: any) => void
	/**开始上传**/
	onUploadstarted?: (props: any) => void
	/**文件上传成功**/
	onUploadSucceed?: (props: any) => void
	/**文件上传失败**/
	onUploadFailed?: (props: any, code?: number, message?: string) => void
	/**取消文件上传**/
	onUploadCanceled?: (props: any, code?: number, message?: string) => void
	/**文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上**/
	onUploadProgress?: (uploadInfo: any, totalSize?: any, progress?: any) => void
	/**上传凭证超时**/
	onUploadTokenExpired?: (props: any) => void
	/**全部文件上传结束**/
	onUploadEnd?: (props: any) => void
}

export class AliyunUploadModule {
	private uploader: any
	private fileName: string = ''
	private title: string = ''
	private transfer: string = ''
	constructor(props: UploadOption) {
		this.init(props)
	}

	/**初始化**/
	private init(option: UploadOption) {
		this.title = option.title
		this.fileName = option.fileName
		this.transfer = option.transfer
		this.uploader = new window.AliyunUpload.Vod({
			timeout: 60000,
			partSize: 1048576,
			parallel: 5,
			retryCount: 3,
			retryDuration: 2,
			region: 'cn-shanghai',
			userId: 1509113157031868,
			/**添加文件成功回调**/
			addFileSuccess: (props: any) => {
				option.addFileSuccess && option.addFileSuccess(props)
			},
			/**开始上传**/
			onUploadstarted: (props: any) => {
				if (props.videoId) {
					nodeRefreshAliyunUpload({
						VideoId: props.videoId
					})
						.then(({ code, data }) => {
							if (code === HttpStatus.OK) {
								const { UploadAuth, UploadAddress, VideoId } = data
								this.uploader.setUploadAuthAndAddress(props, UploadAuth, UploadAddress, VideoId)
							}
						})
						.catch(e => {
							option.onUploadFailed && option.onUploadFailed(props, 400, e)
						})
				} else {
					option.onUploadstarted && option.onUploadstarted(props)
					nodeCreateAliyunUpload({
						Title: this.title,
						FileName: this.fileName,
						TemplateGroupId: this.transfer
					})
						.then(({ code, data }) => {
							if (code === HttpStatus.OK) {
								const { UploadAuth, UploadAddress, VideoId } = data
								this.uploader.setUploadAuthAndAddress(props, UploadAuth, UploadAddress, VideoId)
							}
						})
						.catch(e => {
							option.onUploadFailed && option.onUploadFailed(props, 400, e)
						})
				}
			},
			/**文件上传成功**/
			onUploadSucceed: (props: any) => {
				option.onUploadSucceed && option.onUploadSucceed(props)
			},
			/**文件上传失败**/
			onUploadFailed: (props: any, code: any, message: any) => {
				option.onUploadFailed && option.onUploadFailed(props, code, message)
			},
			/**取消文件上传**/
			onUploadCanceled: (props: any, code: any, message: any) => {
				option.onUploadCanceled && option.onUploadCanceled(props, code, message)
			},
			/**文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上**/
			onUploadProgress: (props: any, totalSize: any, progress: any) => {
				option.onUploadProgress && option.onUploadProgress(props, totalSize, Math.ceil(progress * 100))
			},
			/**上传凭证超时**/
			onUploadTokenExpired: (props: any) => {
				nodeRefreshAliyunUpload({
					VideoId: props.videoId
				})
					.then(({ code, data }) => {
						if (code === HttpStatus.OK) {
							this.uploader.resumeUploadWithAuth(data.UploadAuth)
						}
					})
					.catch(e => {
						option.onUploadFailed && option.onUploadFailed(props, 400, e)
					})
			},
			/**全部文件上传结束**/
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
