import { Module } from 'vuex'
import { Loading } from 'element-ui'
import { RootState } from '@/store'
import { nodeBanner } from '@/api'
import { HttpStatus, NodeBanner } from '@/types'

export interface BannerState {
	list: Array<NodeBanner>
	current: number
}

const useCover = (url: string) => {
	return new Promise(resolve => {
		const image = new Image()
		image.src = url
		image.onload = () => resolve(image)
	})
}

const banner: Module<BannerState, RootState> = {
	namespaced: true,
	state: (): BannerState => ({
		list: [],
		current: 0
	}),
	mutations: {
		SET_LIST: (state, list) => {
			state.list = list
		},
		SET_CURRENT: (state, current) => {
			state.current = current
		}
	},
	getters: {
		current: state => {
			if (state.list?.length > 0) {
				return state.list[state.current]
			}
			return null
		}
	},
	actions: {
		/**轮播壁纸**/
		initBanner: ({ commit }) => {
			return new Promise((resolve, reject) => {
				const loading = Loading.service({ lock: true, background: 'rgba(0, 0, 0, 0.7)' })
				nodeBanner()
					.then(async ({ code, data }) => {
						if (code === HttpStatus.OK) {
							await useCover(data[0].cover)
							commit('SET_LIST', data)
							resolve(data)
						}
					})
					.catch(e => reject(e))
					.finally(() => loading.close())
			})
		},
		prev: async ({ commit, state }) => {
			const loading = Loading.service({ lock: true, background: 'rgba(0, 0, 0, 0.7)' })
			let current = 0
			if (state.current > 0) {
				current = state.current - 1
			} else {
				current = state.list.length - 1
			}
			const { cover } = state.list[current]
			await useCover(cover)
			commit('SET_CURRENT', current)
			loading.close()
		},
		next: async ({ commit, state }) => {
			const loading = Loading.service({ lock: true, background: 'rgba(0, 0, 0, 0.7)' })
			let current = 0
			if (state.current < state.list.length - 1) {
				current = state.current + 1
			}
			const { cover } = state.list[current]
			await useCover(cover)
			commit('SET_CURRENT', current)
			loading.close()
		}
	}
}

export default banner
