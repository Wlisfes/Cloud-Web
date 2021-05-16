import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const service: AxiosInstance = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 30000
})

//错误拦截处理
const useError = (error: AxiosError<any>) => {
	if (error.response) {
		const data = error.response.data
		return Promise.resolve(data)
	}
	return Promise.resolve(error)
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
