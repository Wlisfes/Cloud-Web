import { Module } from 'vuex'
import { RootState } from '@/store'

export interface AppState {}

const app: Module<AppState, RootState> = {
	namespaced: true,
	state: (): AppState => ({}),
	mutations: {},
	actions: {}
}

export default app
