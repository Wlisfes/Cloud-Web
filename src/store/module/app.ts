import { Module } from 'vuex'
import { RootState } from '@/store'

export interface AppState {
	theme: string
	primary: string
}

const app: Module<AppState, RootState> = {
	namespaced: true,
	state: (): AppState => ({
		theme: 'dark',
		primary: '#1890FF'
	}),
	getters: {
		theme: state => state.theme,
		primary: state => state.primary
	},
	mutations: {
		SET_THEME: (state, theme: string) => {
			state.theme = theme
		},
		SET_PRIMARY: (state, primary: string) => {
			state.primary = primary
		}
	},
	actions: {
		setTheme: ({ commit }, theme: string) => {
			return new Promise(resolve => {
				commit('SET_THEME', theme)
				resolve(true)
			})
		},
		setPrimary: ({ commit }, primary: string) => {
			return new Promise(resolve => {
				commit('SET_PRIMARY', primary)
				resolve(true)
			})
		}
	}
}

export default app
