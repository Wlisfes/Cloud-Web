import { Module } from 'vuex'
import type { Route } from 'vue-router'
import { RootState } from '@/store'
import { getMenu } from '@/api'
import { HttpStatus } from '@/types'
import { listToTree } from '@/utils'

export interface BaseState {
	mobile: boolean
	collapsed: boolean
	theme: string
	multiple: Array<any>
	menu: Array<any>
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
		path: '',
		openKeys: [],
		selectedKeys: []
	}),
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
		setRoute: ({ commit }, route: Route) => {
			return new Promise((resolve: Function) => {
				console.log(route)

				resolve()
			})
		}
	}
}

export default base
