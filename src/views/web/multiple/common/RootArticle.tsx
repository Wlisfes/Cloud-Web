import { Vue, Component, Prop } from 'vue-property-decorator'
import { Image, Skeleton, SkeletonItem } from 'element-ui'
import { nodeCreateStar, nodeCancelStar } from '@/api'
import { isToken } from '@/directives/command/is-login'
import { NodeArticle, HttpStatus } from '@/types'
import style from '@/style/web/common/node.multiple.module.less'

@Component
export default class RootArticle extends Vue {
	@Prop({ type: Object, default: null }) node!: NodeArticle
	private star = {
		total: this.node?.star.total || 0,
		where: this.node?.star.where || false
	}

	/**收藏、取消**/
	private async onNodeStar(props: NodeArticle, e?: Event) {
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
			const { code } = await nodeCreateStar({ one, type: 1 })
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
			const { code } = await nodeCancelStar({ one, type: 1 })
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
			<Skeleton loading={node === null} animated class={style['node-skeleton']}>
				<div slot="template" class={style['node-skeleton-item']}>
					<div class={style['node-ctx']}>
						<div class={style['node-ctx-title']}>
							<SkeletonItem variant="h1" style={{ width: '50%', height: '20px', margin: '2px 0' }} />
						</div>
						<div class={style['node-ctx-content']}>
							<SkeletonItem variant="text" style={{ height: '14px', width: '80%', margin: '5px 0' }} />
							<SkeletonItem variant="text" style={{ height: '14px', margin: '5px 0' }} />
							<SkeletonItem variant="text" style={{ height: '14px', margin: '5px 0' }} />
						</div>
						<div class={style['node-ctx-footer']}>
							<div class={style['node-icon']}>
								<SkeletonItem variant="text" style={{ height: '16px', width: '50px' }} />
							</div>
							<div class={style['node-icon']}>
								<SkeletonItem variant="text" style={{ height: '16px', width: '100px' }} />
							</div>
							<div class={style['node-icon']}>
								<SkeletonItem variant="text" style={{ height: '16px', width: '40px' }} />
							</div>
							<div class={style['node-icon']}>
								<SkeletonItem variant="text" style={{ height: '16px', width: '40px' }} />
							</div>
							<div class={style['node-icon']}>
								<SkeletonItem variant="text" style={{ height: '16px', width: '40px' }} />
							</div>
						</div>
					</div>
					<div class={style['node-cover']}>
						<div class={style['node-cover-conter']}>
							<SkeletonItem variant="image" style={{ width: '100%', height: '100%' }}></SkeletonItem>
						</div>
					</div>
				</div>
				{node !== null && (
					<div class={style['node-conter-item']}>
						<div class={style['node-ctx']}>
							<router-link
								to={`/multiple/${node.id}`}
								target="_blank"
								style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
							>
								<div class={style['node-ctx-title']}>
									<h1 class="app-ellipsis">{node.title}</h1>
								</div>
								<div class={style['node-ctx-content']}>
									<p class="app-ellipsis-2">{node.description}</p>
								</div>
							</router-link>
							<div class={style['node-ctx-footer']}>
								<div class={style['node-icon']}>
									<span>{node.user.nickname}</span>
								</div>
								<div class={style['node-icon']}>
									<time datetime={node.createTime}>{node.createTime}</time>
								</div>
								<div class={style['node-icon']}>
									<i class="el-icon-view" style={{ fontSize: '16px' }}></i>
									<span style={{ marginLeft: '5px' }}>{node.browse || 0}</span>
								</div>
								<div class={style['node-icon']} onClick={(e: Event) => this.onNodeStar(node, e)}>
									<i
										class="el-icon-star-on"
										style={{ fontSize: '18px', color: star.where ? '#1989fa' : '#999999' }}
									></i>
									<span style={{ marginLeft: '5px' }}>{star.total || 0}</span>
								</div>
								<div class={style['node-icon']}>
									<i class="el-icon-chat-dot-square" style={{ fontSize: '16px' }}></i>
									<span style={{ marginLeft: '5px' }}>{node.comment || 0}</span>
								</div>
							</div>
						</div>
						<router-link to={`/multiple/${node.id}`} target="_blank" style={{ overflow: 'hidden' }}>
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
						</router-link>
					</div>
				)}
			</Skeleton>
		)
	}
}
