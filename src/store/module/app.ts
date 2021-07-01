import { Module } from 'vuex'
import { RootState } from '@/store'

export interface AppState {
	width: number
	mobile: boolean
	collapsed: boolean
	theme: string
	multiple: Array<any>
	menu: Array<any>
	path: string
	subKey: Array<string>
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
		subKey: []
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
		SET_ROUTE: (state, route) => {
			state.path = route.path
			if (route.matched?.length) {
				const { path } = route.matched[0]
				state.subKey = [path]
			}
		},
		SET_SUBKEY: (state, subKey: Array<string>) => {
			state.subKey = subKey
		}
	},
	actions: {
		setMultiple: ({ commit }, route) => {
			return new Promise((resolve: Function) => {
				commit('SET_MULTIPLE', route)
				resolve()
			})
		}
	}
}

export default app
