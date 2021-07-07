import { Module } from 'vuex'
import type { Route } from 'vue-router'
import { RootState } from '@/store'
import { nodeMenu } from '@/api'
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
		theme: 'dark',
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
		/**根据role获取菜单**/
		nodeMenu: ({ commit }) => {
			return new Promise((resolve: Function, rejcet: Function) => {
				nodeMenu()
					.then(response => {
						if (response.code == HttpStatus.OK) {
							const menu = formatMenus(response.data)
							const routes = formatRoutes(menu)
							commit('SET_LIST', response.data)
							commit('SET_MENU', menu)
							resolve(routes)
						}
					})
					.catch(e => rejcet(e))
			})
		},
		setRoute: ({ commit, state }, route: Route) => {
			return new Promise((resolve: Function) => {
				const props = bfs(state.menu, route?.meta?.parent)
				const keys = [props.router, ...state.openKeys]

				commit('SET_OPENKEYS', Array.from(new Set(keys)))
				commit('SET_SELECTEDKEYS', [route.path])
				commit('SET_MULTIPLE', route)
				commit('SET_PATH', route.path)
				resolve()
			})
		}
	}
}

export default base
