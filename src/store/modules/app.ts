import { Module, MutationTree, ActionTree } from 'vuex'

export interface AppState {
	width: number
	mobile: boolean
	collapsed: boolean
	theme: string
}

const createState = (): AppState => ({
	width: 0,
	mobile: false,
	collapsed: false,
	theme: 'dark'
})

const mutations: MutationTree<AppState> = {
	SET_WIDTH: (state, width) => {
		state.width = width
	},
	SET_MOBILE: (state, mobile) => {
		state.mobile = mobile
	},
	SET_COLLAPSED: (state, collapsed) => {
		state.collapsed = collapsed
	},
	SET_THEME: (state, theme) => {
		state.theme = theme
	}
}

const actions: ActionTree<AppState, any> = {}

const app: Module<AppState, any> = {
	namespaced: true,
	state: createState(),
	mutations,
	actions
}

export default app
