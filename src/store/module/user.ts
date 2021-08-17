import { Module } from 'vuex'
import { RootState } from '@/store'
import { login, register, nodeUser } from '@/api'
import { setToken, delToken } from '@/utils/auth'
import { notification } from 'ant-design-vue'
import * as types from '@/types'

export interface UserState {
	uid: number | null
	account: number | null
	nickname: string | null
	email: string | null
	avatar: string | null
	mobile: number | null
	role: string[]
	token: string | null | undefined
}

const useState = (): UserState => ({
	uid: null,
	account: null,
	nickname: null,
	email: null,
	avatar: null,
	mobile: null,
	role: [],
	token: null
})

const user: Module<UserState, RootState> = {
	namespaced: true,
	state: () => useState(),
	getters: {
		uid: state => state.uid,
		account: state => state.account,
		nickname: state => state.nickname,
		email: state => state.email,
		avatar: state => state.avatar,
		mobile: state => state.mobile,
		role: state => state.role,
		token: state => state.token
	},
	mutations: {
		SET_USE_STATE: state => {
			state = Object.assign(state, { ...useState() })
		},
		SET_USER: (state, user: UserState) => {
			state.uid = user.uid
			state.account = user.account
			state.nickname = user.nickname
			state.email = user.email
			state.avatar = user.avatar
			state.mobile = user.mobile
			state.role = ['admin']
		},
		SET_TOKEN: (state, token: string) => {
			setToken(token)
			state.token = token
		}
	},
	actions: {
		/**登录**/
		login: ({ commit, dispatch }, props: types.LoginParameter) => {
			return new Promise((resolve: Function, reject: Function) => {
				login({ ...props })
					.then(async response => {
						if (response.code === types.HttpStatus.OK) {
							commit('SET_TOKEN', response.data.token)
							await dispatch('nodeUser')
							notification.success({
								message: '登录成功',
								description: '',
								duration: 3
							})
						}
						resolve(response)
					})
					.catch(e => reject(e))
			})
		},
		/**登出**/
		logout: ({ commit, dispatch }) => {
			return new Promise(async resolve => {
				delToken()
				await dispatch('reset')
				resolve(true)
			})
		},
		/**注册**/
		register: ({ commit }, prors: types.RegisterParameter) => {
			return new Promise((resolve: Function, reject: Function) => {
				register({ ...prors })
					.then(response => {
						if (response.code === types.HttpStatus.OK) {
							notification.success({
								message: response.data.message,
								description: '',
								duration: 4.5
							})
						}
						resolve(response)
					})
					.catch(e => reject(e))
			})
		},
		/**拉取用户信息**/
		nodeUser: ({ commit }) => {
			return new Promise((resolve: Function, reject: Function) => {
				nodeUser()
					.then(response => {
						if (response.code === types.HttpStatus.OK) {
							commit('SET_USER', response.data)
						}
						resolve(response)
					})
					.catch(e => reject(e))
			})
		},
		reset: ({ commit }) => {
			return new Promise(resolve => {
				commit('SET_USE_STATE')
				resolve(true)
			})
		}
	}
}

export default user
