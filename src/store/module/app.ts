import { Module } from 'vuex'
import { RootState } from '@/store'
import { getMenu } from '@/api'
import { HttpStatus } from '@/types'
import { listToTree } from '@/utils'

export interface AppState {
	width: number
	mobile: boolean
	collapsed: boolean
	theme: string
	multiple: Array<any>
	menu: Array<any>
	path: string
	openKeys: string[]
	selectedKeys: string[]
}

const app: Module<AppState, RootState> = {
	namespaced: true,
	state: (): AppState => ({
		width: 0,
		mobile: false,
		collapsed: false,
		theme: 'dark',
		multiple: [],
		menu: [],
		path: '',
		openKeys: [],
		selectedKeys: []
	}),
	mutations: {
		SET_WIDTH: (state, width: number) => {
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
			let target = state.multiple.find((item: any) => item.path === route.path)
			if (target) {
				if (route.fullPath !== target.fullPath) Object.assign(target, route)
				return
			}
			state.multiple.push(Object.assign({}, route))
		},
		SET_MENU: (state, menu) => {
			state.menu = menu
		},
		SET_ROUTE: (state, route) => {
			state.path = route.path
			state.selectedKeys = [route.path]
			if (route.matched?.length) {
				const { path } = route.matched[0]
				state.openKeys = [path]
			}
		},
		SET_SUBKEY: (state, subKey: Array<string>) => {
			state.openKeys = subKey
		}
	},
	actions: {
		setMultiple: ({ commit }, route) => {
			return new Promise((resolve: Function) => {
				commit('SET_MULTIPLE', route)
				resolve()
			})
		},
		setMenu: ({ commit }) => {
			return new Promise((resolve: Function, reject: Function) => {
				getMenu()
					.then(({ code, data }) => {
						if (code === HttpStatus.OK) {
							commit('SET_MENU', listToTree(data))
							resolve(data)
						} else {
							resolve([])
						}
					})
					.catch(e => reject(e))
			})
		}
	}
}

export default app
