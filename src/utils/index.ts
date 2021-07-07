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

/**回溯算法**/
export function bfs(target: any[], id: number | string, key = 'children') {
	const quene = [...target]
	do {
		const current = quene.shift()
		if (current[key]) {
			quene.push(
				...current[key].map((x: any) => ({
					...x,
					path: (current.path || current.id) + '-' + x.id
				}))
			)
		}
		if (current.id === id) {
			return {
				...current
			}
		}
	} while (quene.length)
	return undefined
}
