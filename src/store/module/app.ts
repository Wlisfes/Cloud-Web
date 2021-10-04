import { Module } from 'vuex'
import { RootState } from '@/store'
import { setCookie, getCookie } from '@/utils/cookie'
import { nodeUpdateTheme } from '@/theme'

export interface AppState {
	theme: string
	primary: string
}

export enum UNIK {
	theme = 'CLOUD-theme',
	primary = 'CLOUD-primary'
}

const app: Module<AppState, RootState> = {
	namespaced: true,
	state: (): AppState => ({
		theme: '',
		primary: ''
	}),
	getters: {
		theme: state => state.theme,
		primary: state => state.primary
	},
	mutations: {
		SET_THEME: (state, theme: string) => {
			state.theme = theme
			setCookie(UNIK.theme, theme)
		},
		SET_PRIMARY: (state, primary: string) => {
			state.primary = primary
			setCookie(UNIK.primary, primary)
		}
	},
	actions: {
		initApp: ({ state, dispatch }) => {
			return new Promise(resolve => {
				const theme = getCookie(UNIK.theme) || 'dark'
				const primary = getCookie(UNIK.primary) || '#1890FF'
				Promise.all([dispatch('setTheme', theme), dispatch('setPrimary', primary)]).finally(() => {
					resolve(state)
				})
			})
		},
		setTheme: ({ commit }, theme: string) => {
			return new Promise(resolve => {
				commit('SET_THEME', theme)
				resolve(true)
			})
		},
		setPrimary: ({ commit }, primary: string) => {
			return new Promise(resolve => {
				nodeUpdateTheme(primary).then(({ done }) => {
					done()
					commit('SET_PRIMARY', primary)
					resolve(true)
				})
			})
		}
	}
}

export default app
