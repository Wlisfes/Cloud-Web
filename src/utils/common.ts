// import path from 'path'

// /**
//  * @param routes
//  * @param baseUrl
//  * @returns {[]}
//  */
// export function filterRoutes(routes: any[], baseUrl = '/') {
// 	return routes.map(route => {
// 		if (route.path !== '*' && !isExternal(route.path)) route.path = (path as any).resolve(baseUrl, route.path)
// 		route.fullPath = route.path
// 		if (route.children) route.children = filterRoutes(route.children, route.fullPath)
// 		return route
// 	})
// }

export function isExternal(path: string): boolean {
	return /^(https?:|mailto:|tel:)/.test(path)
}
