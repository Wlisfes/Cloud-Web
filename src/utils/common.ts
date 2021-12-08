import * as types from '@/types'

/**获取role数据status==1的id**/
export function inteRole(list: any[]): number[] {
	return list.reduce((curr: number[], next) => {
		return curr
			.concat(Array.isArray(next.children) ? inteRole(next.children) : next.status ? next.id : 0)
			.filter(curr => !!curr)
	}, [])
}

/**创建data对象**/
export function create<T>(props: T): T {
	const result = <T>{}
	for (const key in props) {
		;(<any>result)[key] = (<any>props)[key]
	}
	return result
}

/**遍历views页面文件**/
export function ctxFile() {
	const file = require.context('@/views', true, /\.tsx$/)
	return file
		.keys()
		.filter(name => name.indexOf('common') === -1)
		.map(k => k.slice(1, k.lastIndexOf('.')))
}

/**滚动是否到底*****************************/
export function intheEnd(distance = 300) {
	const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
	const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
	const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
	return {
		end: scrollTop + windowHeight >= scrollHeight - distance,
		scrollTop,
		windowHeight,
		scrollHeight
	}
}

/**读取静态文件**/
export function useFile(path: 'icon' | 'static', name: string) {
	return require(`@/assets/${path + '/' + name}`)
}
