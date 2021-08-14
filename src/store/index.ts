import Vue from 'vue'
import Vuex from 'vuex'
import app, { AppState } from './module/app'
import base, { BaseState } from './module/base'
import user, { UserState } from './module/user'
import banner, { BannerState } from './module/banner'

Vue.use(Vuex)

export interface RootState {
	app: AppState
	base: BaseState
	user: UserState
	banner: BannerState
}

export default new Vuex.Store<RootState>({
	modules: {
		app,
		base,
		user,
		banner
	}
})
