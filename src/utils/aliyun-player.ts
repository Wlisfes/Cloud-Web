import { Vue } from 'vue-property-decorator'
import { DPlayer, Flv, AppSelectNode } from '@/components/common'

export type OptionPlayer = {
	container: HTMLElement
	url: string
	cover: string
}
export type OptionCutover = {
	dataSource: Array<any>
	onSubmit: Function
	player: HTMLElement
}

/**创建播放器**/
export function initPlayer(option: OptionPlayer): Promise<DPlayer> {
	return new Promise(resolve => {
		const format = option.url.slice(option.url.lastIndexOf('.') + 1)
		let video: any = { url: option.url, pic: option.cover }
		switch (format.toLocaleUpperCase()) {
			case 'FLV':
				video = {
					...video,
					type: 'customFlv',
					customType: {
						customFlv: (video: HTMLVideoElement) => {
							const player = Flv.createPlayer({
								type: 'flv',
								url: video.src
							})
							player.attachMediaElement(video)
							player.load()
						}
					}
				}
				break
		}
		const dplayer = new DPlayer({
			container: option.container,
			theme: '#fb7299',
			lang: 'zh-cn',
			autoplay: true,
			video
		})
		resolve(dplayer)
	})
}

/**创建选集组件**/
export function initCutover(option: OptionCutover): Promise<{ node: AppSelectNode; insert: () => void }> {
	return new Promise(resolve => {
		const Conter = Vue.extend(AppSelectNode)
		const node = new Conter({
			propsData: {
				maxHeight: option.player.clientHeight * 0.65,
				dataSource: option.dataSource,
				submit: (props?: any) => {
					option.onSubmit(props)
				}
			}
		}).$mount(document.createElement('div'))
		resolve({
			node: node as AppSelectNode,
			insert: () => {
				const container = option.player.querySelector('.dplayer-icons-right')
				if (container) {
					container.insertBefore(node.$el, document.querySelector('.dplayer-airplay-icon'))
				}
			}
		})
	})
}
