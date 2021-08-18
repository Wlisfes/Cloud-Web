//验证邮箱格式
export function isEmail(email: string) {
	const rule =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return rule.test(email)
}

/**判断浏览器函数**/
export function isMobile() {
	if (
		window.navigator.userAgent.match(
			/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
		)
	) {
		return true // 移动端
	} else {
		return false // PC端
	}
}
