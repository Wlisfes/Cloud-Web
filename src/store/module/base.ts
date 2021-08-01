import { Module } from 'vuex'
import type { Route } from 'vue-router'
import { RootState } from '@/store'
import { nodeMenu, nodeMenuRouter } from '@/api'
import { HttpStatus } from '@/types'
import { formatRoutes, formatMenus } from '@/utils/route'
import { bfs } from '@/utils'

export interface BaseState {
	width: number
	mobile: boolean
	collapsed: boolean
	theme: string
	multiple: Array<any>
	menu: Array<any>
	list: Array<any>
	path: string
	openKeys: string[]
	selectedKeys: string[]
}

const base: Module<BaseState, RootState> = {
	namespaced: true,
	state: (): BaseState => ({
		width: 0,
		mobile: false,
		collapsed: false,
		theme: 'light',
		multiple: [],
		menu: [],
		list: [],
		path: '',
		openKeys: [],
		selectedKeys: []
	}),
	getters: {
		width: state => state.width,
		mobile: state => state.mobile,
		collapsed: state => state.collapsed,
		theme: state => state.theme,
		multiple: state => state.multiple,
		menu: state => state.menu,
		list: state => state.list,
		path: state => state.path,
		openKeys: state => state.openKeys,
		selectedKeys: state => state.selectedKeys
	},
	mutations: {
		SET_WIDTH: (state, width) => {
			state.width = width
		},
		SET_MOBILE: (state, mobile: boolean) => {
			state.mobile = mobile
		},
		SET_COLLAPSED: (state, collapsed: boolean) => {
			state.collapsed = collapsed
		},
		SET_THEME: (state, theme: string) => {
			state.theme = theme
		},
		SET_MULTIPLE: (state, route) => {
			const n = state.multiple.some(k => k.path === route.path)
			if (!n) {
				state.multiple.push({ name: route.meta.title, path: route.path })
			}
		},
		SET_MENU: (state, menu) => {
			state.menu = menu
		},
		SET_LIST: (state, list) => {
			state.list = list
		},
		SET_PATH: (state, path: string) => {
			state.path = path
		},
		SET_OPENKEYS: (state, openKeys: string[]) => {
			state.openKeys = openKeys
		},
		SET_SELECTEDKEYS: (state, selectedKeys: string[]) => {
			state.selectedKeys = selectedKeys
		}
	},
	actions: {
		/**动态路由**/
		useRouter: ({ commit }) => {
			return new Promise((resolve, reject) => {
				nodeMenuRouter()
					.then(({ code, data }) => {
						if (code === HttpStatus.OK) {
							const route = formatRoutes(data)
							commit('SET_LIST', data)
							resolve(route)
						}
					})
					.catch(e => reject(e))
			})
		},
		/**根据role获取菜单**/
		nodeMenu: ({ commit }) => {
			return new Promise((resolve, rejcet) => {
				nodeMenu()
					.then(({ code, data }) => {
						if (code == HttpStatus.OK) {
							commit('SET_MENU', data)
							resolve(data)
						}
					})
					.catch(e => rejcet(e))
			})
		},
		setRoute: ({ commit, state }, route: Route) => {
			return new Promise(resolve => {
				const { id } = state.list.find(k => k.router === route.path)
				const props = bfs(state.menu, id)
				const path = props.path.split('-').map((k: any) => Number(k))
				const keys = state.openKeys.concat(path)

				commit('SET_OPENKEYS', Array.from(new Set(keys)))
				commit('SET_SELECTEDKEYS', [id])
				commit('SET_MULTIPLE', route)
				commit('SET_PATH', route.path)

				resolve(route)
			})
		}
	}
}

export default base
