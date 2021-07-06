import { Module } from 'vuex'
import type { Route } from 'vue-router'
import { RootState } from '@/store'
import { nodeMenu } from '@/api'
import { HttpStatus } from '@/types'
import { formatRoutes } from '@/utils'
import Layout from '@/Layout/admin'

export interface BaseState {
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
		SET_MOBILE: (state, mobile: boolean) => {
			state.mobile = mobile
		},
		SET_COLLAPSED: (state, collapsed: boolean) => {
			state.collapsed = collapsed
		},
		SET_THEME: (state, theme: string) => {
			state.theme = theme
		},
		SET_MULTIPLE: state => {},
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
						console.log(response)
						if (response.code == HttpStatus.OK) {
							const menu = formatRoutes(response.data, Layout)
							commit('SET_LIST', response.data)
							resolve(menu)
						}
					})
					.catch(e => rejcet(e))
			})
		},
		setRoute: ({ commit }, route: Route) => {
			return new Promise((resolve: Function) => {
				resolve()
			})
		}
	}
}

export default base
