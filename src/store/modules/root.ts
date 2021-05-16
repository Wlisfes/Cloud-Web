import { createModule } from '@/utils/type'
import { getBanner } from '@/api/banner'
import { BannerInter } from '@/interface/common.interface'

export interface RootState {
	banner: Array<BannerInter>
	current: number
}

export default createModule<RootState, any>({
	namespaced: true,
	state: (): RootState => ({
		banner: [],
		current: 0
	}),
	getters: {
		curr: state => {
			if (state.banner.length) {
				return state.banner[state.current]
			}
			return null
		}
	},
	mutations: {
		SET_BANNER: (state, banner: Array<BannerInter>) => {
			state.banner = banner
		},
		SET_PRVE: state => {
			if (state.banner.length < 1) return false

			if (state.current === 0) {
				state.current = state.banner.length - 1
			} else {
				state.current--
			}
		},
		SET_NEXT: state => {
			if (state.banner.length < 1) return false

			if (state.current < state.banner.length - 1) {
				state.current++
			} else {
				state.current = 0
			}
		}
	},
	actions: {
		banner: ({ commit }) => {
			return new Promise(async (resolve: Function) => {
				try {
					const response = await getBanner()
					if (response.code === 200) {
						commit('SET_BANNER', response.data)
					}
				} catch (e) {}
				resolve()
			})
		}
	}
})
