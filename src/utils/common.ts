/**
 * 获取role数据status==1的id
 * @param list any[]
 * @returns number[]
 */
export function inteRole(list: any[]): number[] {
	return list.reduce((curr: number[], next) => {
		return curr
			.concat(Array.isArray(next.children) ? inteRole(next.children) : next.status ? next.id : 0)
			.filter(curr => !!curr)
	}, [])
}

/**
 * 创建data对象
 * @param props T
 * @returns T
 */
export function create<T>(props: T): T {
	const result = <T>{}
	for (const key in props) {
		;(<any>result)[key] = (<any>props)[key]
	}
	return result
}

/**
 * 遍历views页面文件
 * @returns string []
 */
export function ctxFile(): string[] {
	const file = require.context('@/views', true, /\.tsx$/)
	return file
		.keys()
		.filter(name => name.indexOf('common') === -1)
		.map(k => k.slice(1, k.lastIndexOf('.')))
}

/**
 * 滚动是否到底
 * @param distance
 */
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

/**
 * 读取静态文件
 * @param path
 * @param name
 */
export function useFile(path: 'icon' | 'static', name: string) {
	return require(`@/assets/${path + '/' + name}`)
}

/**
 * 防抖函数
 * @param { Function } fn
 * @param { Number } delay
 * @returns
 */
export function debounce(fn: Function, delay = 300) {
	let timer: any
	return function () {
		const args = arguments
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			fn.apply(args)
		}, delay)
	}
}

/**
 * 节流函数
 * @param { Function } fn
 * @param {Number} delay
 * @returns
 */
export function throttle(fn: Function, delay: number) {
	let valid = true
	return function () {
		if (!valid) {
			return false
		}
		valid = false
		setTimeout(() => {
			fn()
			valid = true
		}, delay)
	}
}
