import { Module } from 'vuex'
import { Loading } from 'element-ui'
import { RootState } from '@/store'
import { nodeBanner } from '@/api'
import { HttpStatus, NodeBanner } from '@/types'

export interface BannerState {
	list: Array<NodeBanner>
	current: number
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
		initBanner: ({ commit, state }) => {
			return new Promise((resolve, reject) => {
				const loading = Loading.service({ lock: true, background: 'rgba(0, 0, 0, 0.7)' })
				nodeBanner()
					.then(async ({ code, data }) => {
						if (code === HttpStatus.OK) {
							const image = new Image()
							image.src = data[0].cover
							image.onload = () => {
								commit('SET_LIST', data)
								resolve(data)
							}
							image.onerror = e => reject(e)
						}
					})
					.catch(e => reject(e))
					.finally(() => {
						loading.close()
						setTimeout(() => {
							state.list.map(k => {
								const image = new Image()
								image.src = k.cover
								image.alt = k.name
								image.style.display = 'none'
								document.body.appendChild(image)
							})
						})
					})
			})
		}
	}
}

export default banner
