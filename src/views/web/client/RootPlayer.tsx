import { Vue, Component } from 'vue-property-decorator'
import { NodePlayer } from '@/views/web/client/common'
import { DPlayer, AppSelectNode } from '@/components/common'
import { nodeClientCloud, nodeAliyunPlay } from '@/api'
import { initPlayer, initCutover } from '@/utils/aliyun-player'
import { RootComment } from '@/components/comment'
import { DPlayerEvents } from 'dplayer'
import { HttpStatus, NodeCloud } from '@/types'
import style from '@/style/web/web.player.module.less'

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
export default class Player extends Vue {
	$refs!: { player: HTMLElement }

	private player!: DPlayer | null
	private primary: number = 0
	private node!: AppSelectNode | null
	private loading: boolean = true
	private current: Current = { path: '', cover: '', key: '' }
	private state: State = { title: '', type: 0, dataSource: [] }

	protected created() {
		const id = Number(this.$route.params.id)
		if (id) {
			this.init(id)
		}
	}

	/**页面初始化**/
	private init(id: number) {
		this.nodeClientCloud(id).finally(() => {
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
	}

	/**音视频信息-客户端**/
	private nodeClientCloud(id: number) {
		return new Promise((resolve, reject) => {
			nodeClientCloud({ id })
				.then(({ code, data }) => {
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
						this.primary = data.id
						this.state = Object.assign(this.state, {
							type: data.type,
							title: data.title,
							dataSource: data.children
						})
					}
				})
				.catch(e => reject(e))
				.finally(() => resolve(true))
		})
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
		})
			.then(({ insert, node }) => {
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
			.catch(e => console.log(e))
	}

	protected render() {
		return (
			<div class={style['app-conter']}>
				<NodePlayer loading={this.loading}>
					<div id="player" ref="player" slot="player"></div>
				</NodePlayer>
				{!this.loading && (
					<div class={style['app-conter-comment']}>
						<div
							style={{
								padding: '60px 20px 20px',
								backgroundColor: '#ffffff',
								borderRadius: '0 0 4px 4px'
							}}
						>
							<RootComment primary={this.primary} type={2}></RootComment>
						</div>
					</div>
				)}
			</div>
		)
	}
}
