import type { AxiosStatic } from 'axios'

interface Response<T = any> {
	data: T
	timestamp: string
	message: string
	code: number
	url?: string
	method?: string
}

declare module 'axios' {
	export interface AxiosInstance extends AxiosStatic {
		<T = any, R = Response<T>>(config: AxiosRequestConfig): Promise<R>
	}
}
