import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { notification } from 'ant-design-vue'

const service: AxiosInstance = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 30000
})

//错误拦截处理
function useError(error: AxiosError) {
	if (error?.response) {
		const { data, status } = error.response
		switch (status) {
			case 400:
				notification.error({ message: '管道拦截', description: data.message })
				break
			case 401:
				notification.error({ message: '守卫拦截', description: data.message })
				break
			case 403:
				notification.error({ message: '账号异常', description: data.message })
				break
			default:
				notification.error({ message: '服务器开了小个差', description: data.message })
				break
		}
		return Promise.reject(data)
	} else {
		return Promise.reject(error)
	}
}

//请求拦截
service.interceptors.request.use((config: AxiosRequestConfig) => {
	return config
}, useError)

//响应拦截
service.interceptors.response.use((response: AxiosResponse) => {
	return response.data
}, useError)

export default service
