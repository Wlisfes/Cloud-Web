const whiteList: string[] = [
	'/', //首页
	'/multiple', //归档
	'/intense', //视频
	'/minute', //笔记
	'/partner', //友链
	'/main/login', //登录
	'/main/register', //注册
	'/404' //404
]

/**路由白名单验证**/
export function isWhite(path: string): boolean {
	return whiteList.indexOf(path) !== -1
}
