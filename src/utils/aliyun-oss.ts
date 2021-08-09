import OSS from 'ali-oss'
import day from 'dayjs'

export interface OssOption {
	accessKeyId: string
	accessKeySecret: string
	stsToken: string
	region?: string
	bucket?: string
	refreshSTSToken?: () => Promise<OssOption>
	refreshSTSTokenInterval?: number
}
export class AliyunOSSModule {
	public readonly client: OSS

	constructor(props: OssOption) {
		this.client = new OSS({
			region: props.region || 'oss-cn-shenzhen',
			bucket: props.bucket || 'linvc',
			accessKeyId: props.accessKeyId,
			accessKeySecret: props.accessKeySecret,
			stsToken: props.stsToken,
			secure: true,
			refreshSTSTokenInterval: props.refreshSTSTokenInterval || 300000
		})
	}

	Buffer(blob: Blob): Promise<Buffer> {
		return new Promise(resolve => {
			const reader = new FileReader()
			reader.readAsArrayBuffer(blob)
			reader.onload = (e: any) => {
				resolve((OSS as any).Buffer(e.target.result))
			}
		})
	}

	create(fileName: string, path: 'avatar' | 'upload' | 'cover'): string {
		const name = fileName.split('.').pop()?.toLowerCase() || 'jpg'
		const date = day().format('YYYY-MM-DD')
		return `cloud/${path}/${date}/${Date.now()}.${name}`
	}
}
