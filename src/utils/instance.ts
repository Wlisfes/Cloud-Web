import { Vue } from 'vue-property-decorator'
export const vm = new Vue()
export type VMInstance = typeof vm

export interface VMInstanceProps {
	getContainer?: () => Element
}

export function useInstance() {
	return {
		onMounte: (callback?: Function) => {
			return new Promise(resolve => {
				typeof callback === 'function' && callback()
				resolve('mounte')
			})
		},
		onUnmounte: (props: { el: Element; callback?: Function; remove?: boolean; delay?: number }) => {
			return new Promise((resolve, reject) => {
				if (!props.el) {
					reject('el元素不能为空')
				}

				typeof props.callback === 'function' && props.callback()
				const timeout = setTimeout(() => {
					if (props.remove) {
						// el?.previousElementSibling?.remove?.()
						props.el?.remove?.()
						clearTimeout(timeout)
					}
				}, props.delay || 300)
				resolve('unMounte')
			})
		}
	}
}
