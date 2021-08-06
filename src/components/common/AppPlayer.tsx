import { Vue, Component } from 'vue-property-decorator'
import { Modal, Spin } from 'ant-design-vue'
import { DPlayer, Flv } from '@/components/common'
import { nodeCloud } from '@/api'
import { HttpStatus } from '@/types'
import style from '@/style/common/app.player.module.less'

@Component
export default class AppPlayer extends Vue {
	$refs!: { player: HTMLElement }

	private visible: boolean = false
	private loading: boolean = false
	private state = {
		title: '',
		cover: '',
		path: ''
	}

	/**音视频信息**/
	private async nodeCloud(id: number) {
		try {
			const { code, data } = await nodeCloud({ id })
			if (code === HttpStatus.OK) {
				console.log(data)
				this.state = Object.assign(this.state, {
					title: data.title,
					cover: `${data.cover}?x-oss-process=style/resize`,
					path: data.path
				})
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**初始化播放器**/
	private initPlayer() {
		const { state } = this
		new DPlayer({
			container: this.$refs.player,
			theme: '#fb7299',
			lang: 'zh-cn',
			video: {
				url: state.path,
				pic: state.cover,
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
		})
	}

	/**组件调用**/
	public async init(id: number) {
		try {
			this.loading = true
			this.visible = true
			await this.nodeCloud(id)
			this.$nextTick(() => {
				this.initPlayer()
				this.loading = false
			})
		} catch (e) {
			this.loading = false
		}
	}

	/**组件初始化**/
	private onClose() {
		this.visible = false
		setTimeout(() => {
			this.loading = false
			this.state = Object.assign(this.state, {
				title: ''
			})
		}, 300)
	}

	protected render() {
		const { state } = this
		return (
			<Modal
				title={state.title}
				dialogStyle={{ maxWidth: '95%' }}
				v-model={this.visible}
				width={1080}
				centered
				destroyOnClose
				footer={null}
				maskClosable={false}
				onCancel={this.onClose}
			>
				<Spin size="large" spinning={this.loading}>
					<div class={style['app-player']}>
						<div class={style['app-player-conter']}>
							<div ref="player" class={style.player}></div>
						</div>
					</div>
				</Spin>
			</Modal>
		)
	}
}
