const whiteList: string[] = [
	'/', //首页
	'/multiple', //归档
	'/intense', //视频
	'/minute', //笔记
	'/partner', //友链
	'/player/',
	'/404' //404
]

/**路由白名单验证**/
export function isWhite(path: string): boolean {
	if ('/' === path) {
		return true
	}
	return whiteList.some(k => path.indexOf(k) !== -1)
}
