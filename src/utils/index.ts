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
