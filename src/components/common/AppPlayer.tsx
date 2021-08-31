import { Vue, Component } from 'vue-property-decorator'
import { Modal, Spin } from 'ant-design-vue'
import { DPlayer, AppSelectNode } from '@/components/common'
import { nodeCloud, nodeAliyunPlay } from '@/api'
import { HttpStatus, NodeCloud } from '@/types'
import { initPlayer, initCutover } from '@/utils/aliyun-player'
import style from '@/style/common/app.player.module.less'
import { DPlayerEvents } from 'dplayer'

type Current = {
	path: string
	cover: string
	key: string
}

type State = {
	title: string
	type: number
	dataSource: NodeCloud[]
}

@Component
export default class AppPlayer extends Vue {
	$refs!: { player: HTMLElement }

	private player!: DPlayer | null
	private node!: AppSelectNode | null
	private visible: boolean = false
	private loading: boolean = false
	private state: State = {
		title: '',
		type: 0,
		dataSource: []
	}
	private current: Current = {
		path: '',
		cover: '',
		key: ''
	}

	/**音视频信息**/
	private async nodeCloud(id: number) {
		try {
			const { code, data } = await nodeCloud({ id })
			if (code === HttpStatus.OK) {
				if (data.type === 1) {
					this.current = Object.assign(this.current, {
						cover: `${data.cover}?x-oss-process=style/resize`,
						path: data.path,
						key: data.key
					})
				} else if (data.children?.length > 0) {
					const props = data.children[0]
					this.current = Object.assign(this.current, {
						cover: `${props.cover}?x-oss-process=style/resize`,
						path: props.path,
						key: props.key
					})
				}
				this.state = Object.assign(this.state, {
					type: data.type,
					title: data.title,
					dataSource: data.children
				})
			}
			return data
		} catch (e) {
			return e
		}
	}

	/**初始化播放器**/
	private createPlayer() {
		return new Promise(resolve => {
			const { current } = this
			if (this.player) {
				this.player = null
			}

			nodeAliyunPlay({ VideoId: current.key, AuthTimeout: 24 * 60 * 60 })
				.then(({ code, data }) => {
					if (code === HttpStatus.OK) {
						const { list } = data
						if (list?.length > 0) {
							const props = list[0]
							this.current.path = props.PlayURL
						}
					}
				})
				.catch(e => {})
				.finally(() => {
					initPlayer({
						container: this.$refs.player,
						url: current.path,
						cover: current.cover
					}).then(playre => {
						this.player = playre
						resolve(this.player)
					})
				})
		})
	}

	/**初始化选集组件**/
	private createCutover() {
		const { current, state } = this
		if (this.node) {
			this.node.$el.remove()
			this.node = null
		}
		initCutover({
			player: this.$refs.player,
			dataSource: state.dataSource,
			onSubmit: (props: NodeCloud) => {
				this.current = Object.assign(this.current, {
					path: props.path,
					cover: props.cover,
					key: props.key
				})
				this.$nextTick(() => this.createPlayer().then(() => this.createCutover()))
			}
		}).then(({ insert, node }) => {
			insert()
			node.change(current.key)
			this.node = node

			/**播放结束自动下一集**/
			this.$nextTick(() => {
				this.player?.on('ended' as DPlayerEvents, () => {
					const index = state.dataSource.findIndex(k => k.key === current.key)
					if (index < state.dataSource?.length - 1) {
						const props = state.dataSource[index + 1]
						this.current = Object.assign(current, {
							cover: `${props.cover}?x-oss-process=style/resize`,
							path: props.path,
							key: props.key
						})
						this.$nextTick(() => this.createPlayer().then(() => this.createCutover()))
					}
				})
			})
		})
	}

	/**组件调用**/
	public async init(id: number) {
		try {
			this.loading = true
			this.visible = true
			await this.nodeCloud(id).finally(() => {
				const { current, state } = this
				this.$nextTick(() => {
					if (current.key) {
						this.createPlayer().then(() => {
							if (state.type === 2) {
								this.createCutover()
							}
							this.loading = false
						})
					} else {
						this.loading = false
					}
				})
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
				title: '',
				type: 0,
				dataSource: []
			})
			this.current = Object.assign(this.current, {
				cover: '',
				path: '',
				key: ''
			})
		}, 300)
	}

	protected render() {
		return (
			<Modal
				title={this.state.title}
				dialogStyle={{ maxWidth: '95%', paddingBottom: 0 }}
				bodyStyle={{ padding: 0 }}
				v-model={this.visible}
				width={1080}
				centered
				destroyOnClose
				footer={null}
				maskClosable={false}
				onCancel={this.onClose}
			>
				<Spin
					size="large"
					class="ant-spin-64"
					wrapperClassName={style['app-player-wrapper']}
					spinning={this.loading}
				>
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
