import Vue from 'vue'
import Vuex from 'vuex'
import app, { AppState } from './module/app'

Vue.use(Vuex)

export interface RootState {
	app: AppState
}

export default new Vuex.Store<RootState>({
	modules: {
		app
	}
})
