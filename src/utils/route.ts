import Layout from '@/Layout/admin'

/**菜单数组转树结果**/
export function listToTree(list: any[]) {
	var map: any = {},
		node,
		tree = [],
		i
	for (i = 0; i < list.length; i++) {
		map[list[i].id] = list[i]
		list[i].children = []
	}
	for (i = 0; i < list.length; i += 1) {
		node = list[i]
		if (node.parent) {
			if (map[node.parent].children) map[node.parent].children.push(node)
		} else {
			tree.push(node)
		}
	}
	return tree
}

const load = (path: string) => () => import(`@${path}`)

export const loadView = (view: string) => {
	return (resolve: any) => require([`@${view}`], resolve)
}

/**格式化菜单**/
export function formatMenus(routes: any[]) {
	return listToTree(routes)
}

/**格式化路由**/
export function formatRoutes(routes: any[]) {
	const formatRoutesArr: any[] = []
	routes.forEach(route => {
		const router: any = {
			meta: {}
		}

		if (route.path === 'Layout') {
			router['component'] = Layout
		} else {
			// const t = `views/admin/user/User`
			// router['component'] = () => import(`@${t}`)
			router['component'] = () => import(`@/views/admin/user/User`)
		}

		if (route.redirect) {
			router['redirect'] = route.redirect
		}

		if (route.icon) {
			router['meta']['icon'] = route.icon
		}

		router['meta']['id'] = route.id
		router['meta']['parent'] = route.parent
		router['meta']['title'] = route.name
		router['path'] = route.router
		router['meta']['keepAlive'] = !!route.keepAlive
		router['meta']['hidden'] = !!route.visible

		if (route.children && route.children instanceof Array && route.children.length > 0) {
			router['children'] = formatRoutes(route.children)
		}

		formatRoutesArr.push(router)
	})

	return formatRoutesArr
}
