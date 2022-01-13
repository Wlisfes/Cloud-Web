import { Vue, Component, Prop } from 'vue-property-decorator'
import { Image, Skeleton, SkeletonItem } from 'element-ui'
import { AppAvatar } from '@/components/common'
import { nodeCreateStar, nodeCancelStar } from '@/api'
import { isToken } from '@/directives/command/is-login'
import { NodeCloud, HttpStatus } from '@/types'
import style from '@/style/web/common/node.client.module.less'

@Component
export default class NodeMatter extends Vue {
	@Prop({ type: Object, default: null }) node!: NodeCloud
	private star = {
		total: this.node?.star.total || 0,
		where: this.node?.star.where || false
	}

	/**收藏、取消**/
	private async onNodeStar(props: NodeCloud, e?: Event) {
		e?.preventDefault()
		e?.stopPropagation()

		const code = await isToken()
		if (code === 2) {
			this.$emit('refresh')
		} else if (code === 1 && this.star.where) {
			//已收藏
			this.nodeCancelStar(props.id)
		} else if (code === 1 && !this.star.where) {
			//未收藏
			this.nodeCreateStar(props.id)
		}
	}

	/**创建收藏**/
	private async nodeCreateStar(one: number) {
		try {
			const { code } = await nodeCreateStar({ one, type: 2 })
			if (code === HttpStatus.OK) {
				// this.$emit('refresh')
				this.star.where = true
				this.star.total++
			}
		} catch (e) {}
	}

	/**取消收藏**/
	private async nodeCancelStar(one: number) {
		try {
			const { code } = await nodeCancelStar({ one, type: 2 })
			if (code === HttpStatus.OK) {
				// this.$emit('refresh')
				this.star.where = false
				this.star.total--
			}
		} catch (e) {}
	}

	protected render() {
		const { node, star } = this
		return (
			<Skeleton loading={node === null} animated class={style['node-conter-item']}>
				<div slot="template">
					<div class={style['node-ctx']}>
						<div class={style['node-cover']}>
							<div class={style['node-cover-conter']}>
								<SkeletonItem variant="image" style={{ width: '100%', height: '100%' }}></SkeletonItem>
							</div>
						</div>
						<div class={style['node-footer']}>
							<div>
								<SkeletonItem variant="text" style={{ width: '70%' }}></SkeletonItem>
								<SkeletonItem variant="text"></SkeletonItem>
							</div>
							<div style={{ display: 'flex' }}>
								<SkeletonItem variant="circle" style={{ width: '32px', height: '32px' }}></SkeletonItem>
								<div style={{ flex: 1, display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
									<SkeletonItem variant="h3" style={{ width: '50%' }}></SkeletonItem>
								</div>
							</div>
						</div>
					</div>
				</div>

				{node !== null && (
					<div>
						<router-link to={`/player/${node.id}`} target="_blank" class={style['node-ctx']}>
							<div class={style['node-cover']}>
								<div class={style['node-cover-conter']}>
									<Image
										class={style['node-cover-image']}
										alt={node.title}
										lazy
										fit="cover"
										src={`${node.cover}?x-oss-process=style/resize-16-9`}
									>
										<SkeletonItem
											slot="placeholder"
											variant="image"
											style={{ width: '100%', height: '100%' }}
										></SkeletonItem>
										<SkeletonItem
											slot="error"
											variant="image"
											style={{ width: '100%', height: '100%' }}
										></SkeletonItem>
									</Image>
								</div>
							</div>
							<div class={style['node-footer']}>
								<div class={style['node-title']}>
									<a class="app-ellipsis-2">{node.title}</a>
								</div>
								<div class={style['node-user']}>
									<AppAvatar
										size={32}
										src={`${node.user.avatar}?x-oss-process=style/resize-1-1`}
										username={node.user.nickname}
										rounded={false}
										style={{ cursor: 'pointer', borderRadius: '50%' }}
									></AppAvatar>
									<div class={style['node-user-nickname']}>
										<div style={{ flex: 1, overflow: 'hidden' }}>
											<a class="app-ellipsis">{node.user.nickname}</a>
										</div>
										<div class={style['node-play']}>
											<i class="el-icon-view"></i>
											<span style={{ marginLeft: '5px' }}>{node.browse || 0}</span>
										</div>
										<div
											class={style['node-play']}
											onClick={(e: Event) => this.onNodeStar(node, e)}
										>
											<i
												class="el-icon-star-on"
												style={{
													fontSize: '18px',
													color: star.where ? '#1989fa' : '#999999'
												}}
											></i>
											<span style={{ marginLeft: '5px' }}>{star.total || 0}</span>
										</div>
										<div class={style['node-play']}>
											<i class="el-icon-chat-dot-square"></i>
											<span style={{ marginLeft: '5px' }}>{node.comment || 0}</span>
										</div>
									</div>
								</div>
							</div>
						</router-link>
					</div>
				)}
			</Skeleton>
		)
	}
}
