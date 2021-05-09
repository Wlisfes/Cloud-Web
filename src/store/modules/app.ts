import { createModule } from '@/utils/type'

export interface AppState {
	width: number
	mobile: boolean
	collapsed: boolean
	theme: string
	routes: Array<any>
	menu: Array<any>
	path: string
	subKey: Array<string>
}
export default createModule<AppState, any>({
	namespaced: true,
	state: (): AppState => ({
		width: 0,
		mobile: false,
		collapsed: false,
		theme: 'dark',
		routes: [],
		menu: [],
		path: '',
		subKey: []
	}),
	getters: {
		collapsed: state => state.collapsed
	},
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
		SET_ROUTES: (state, route) => {
			let target = state.routes.find((item: any) => item.path === route.path)
			if (target) {
				if (route.fullPath !== target.fullPath) Object.assign(target, route)
				return
			}
			state.routes.push(Object.assign({}, route))
		},
		SET_MENU: (state, menu) => {
			state.menu = menu
		},
		SET_PATH: (state, path: string) => {
			state.path = path
		},
		SET_SUBKEY: (state, subKey: Array<string>) => {
			state.subKey = subKey
		},
		SET_ROUTE: (state, route) => {
			state.path = route.path
			if (route.matched?.length) {
				const { path } = route.matched[0]
				state.subKey = [path]
			}
		}
	},
	actions: {
		setRoutes: ({ commit }, route) => {
			return new Promise((resolve: Function) => {
				commit('SET_ROUTES', route)
				resolve()
			})
		}
	}
})
