export function useInstance() {
	return {
		onMounte: (callback?: Function) => {
			return new Promise(resolve => {
				typeof callback === 'function' && callback()
				resolve('mounte')
			})
		},
		onUnmounte: ({ el, callback, remove }: { el: Element; callback?: Function; remove?: boolean }) => {
			return new Promise((resolve, reject) => {
				if (!el) {
					reject('el元素不能为空')
				}

				typeof callback === 'function' && callback()
				const timeout = setTimeout(() => {
					if (remove) {
						// el?.previousElementSibling?.remove?.()
						el?.remove?.()
						clearTimeout(timeout)
					}
				}, 300)
				resolve('unMounte')
			})
		}
	}
}
