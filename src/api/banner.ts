import request from '@/utils/request'
import { BannerInter } from '@/interface/common.interface'

//获取bing壁纸
export function getBanner() {
	return request<Array<BannerInter>>({
		url: `/api/banner/bing`,
		method: 'GET'
	})
}
