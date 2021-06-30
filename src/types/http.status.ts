export enum HttpStatus {
	OK = 200, //成功
	BAD_REQUEST = 400, //参数错误
	UNAUTHORIZED = 401, //未登陆
	FORBIDDEN = 403, //用户不存在、被禁止
	NOT_FOUND = 404, //资源地址不存在
	INTERNAL_SERVER_ERROR = 500 //服务器异常
}
