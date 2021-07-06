import { Module } from 'vuex'
import { RootState } from '@/store'
import { login, register, getUser } from '@/api'
import * as types from '@/types'
import { notification } from 'ant-design-vue'

export interface UserState {
	uid: number | null
	username: string | null
	nickname: string | null
	email: string | null
	avatar: string | null
	mobile: number | null
	token: string | null | undefined
}

const user: Module<UserState, RootState> = {
	namespaced: true,
	state: (): UserState => ({
		uid: null,
		username: null,
		nickname: null,
		email: null,
		avatar: null,
		mobile: null,
		token: null
	}),
	mutations: {
		SET_USER: (state, user: UserState) => {
			state.uid = user.uid
			state.username = user.username
			state.nickname = user.nickname
			state.email = user.email
			state.avatar = user.avatar
			state.mobile = user.mobile
		},
		SET_TOKEN: (state, token: string) => {
			state.token = token
		}
	},
	actions: {
		/**登录**/
		login: ({ commit }, props: types.LoginParameter) => {
			return new Promise((resolve: Function, reject: Function) => {
				login({ ...props })
					.then(response => {
						if (response.code === types.HttpStatus.OK) {
							commit('SET_TOKEN', response.data.token)
							notification.success({
								message: '登录成功',
								description: '',
								duration: 4.5
							})
						}
						resolve(response)
					})
					.catch(e => reject(e))
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
		getUser: ({ commit }) => {
			return new Promise((resolve: Function, reject: Function) => {
				getUser()
					.then(response => {
						if (response.code === types.HttpStatus.OK) {
							commit('SET_USER', response.data)
						}
						resolve(response)
					})
					.catch(e => reject(e))
			})
		}
	}
}

export default user
