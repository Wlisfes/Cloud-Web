import { InjectionKey } from 'vue'
import { createStore, Store, useStore as use } from 'vuex'
import app from '@/store/modules/app'

export interface State {
	app: typeof app.state
}

export const key: InjectionKey<Store<State>> = Symbol('__paker__store__')
const store = createStore({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		app
	}
})

export default store
export function useStore() {
	return use(key)
}

declare module 'vuex' {
	export function useStore<S = State>(): Store<S>
}
