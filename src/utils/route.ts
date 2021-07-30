import Layout from '@/Layout/admin'
import asyncRoutes from '@/router/router.env'

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

/**格式化菜单**/
export function formatMenus(list: any[]) {
	return listToTree(list)
}

/**格式化路由**/
export function formatRoutes(list: any[]) {
	const formatRoutesArr: any[] = []
	list.forEach(route => {
		const router: any = {
			meta: {}
		}

		if (route.path === 'Layout') {
			router['component'] = Layout
		} else {
			router['component'] = asyncRoutes[route.path] //() => import(`@/views/admin/user/User`)
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

	return {
		path: '/admin',
		redirect: '/admin/setup/home',
		component: Layout,
		children: formatRoutesArr
	}
}
