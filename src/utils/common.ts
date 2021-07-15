import * as types from '@/types'

/**获取role数据status==1的id**/
export function inteRole(list: types.NodeRoleResponse[]): number[] {
	return list.reduce((curr: number[], next) => {
		return curr
			.concat(Array.isArray(next.children) ? inteRole(next.children) : next.status ? next.id : 0)
			.filter(curr => !!curr)
	}, [])
}
