const whiteList: string[] = ['/web/home', '/main/login', '/main/register', '/404']

/**路由白名单验证**/
export function isWhite(path: string): boolean {
	return whiteList.some(k => path.indexOf(k) !== -1)
}
