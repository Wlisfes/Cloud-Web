import { Vue, Component, Prop } from 'vue-property-decorator'
import { Spin, Icon } from 'ant-design-vue'
import { Image, Empty, Skeleton, SkeletonItem } from 'element-ui'
import { AppAvatar } from '@/components/common'
import { nodeCreateStar, nodeCancelStar } from '@/api'
import { isToken } from '@/directives/command/is-login'
import { NodeCloud, HttpStatus } from '@/types'
import style from '@/style/web/common/node.intense.cloud.module.less'

@Component
export default class NodeIntenseCloud extends Vue {
	@Prop({ type: Array, default: () => [] }) dataSource!: NodeCloud[]
	@Prop({ type: Boolean, default: true }) loading!: boolean
	@Prop({ type: Number, default: 0 }) total!: number

	/**收藏、取消**/
	private async onNodeStar(props: NodeCloud, e?: Event) {
		e?.preventDefault()
		e?.stopPropagation()

		const code = await isToken()
		if (code === 2) {
			this.$emit('refresh')
		} else if (code === 1 && props.star.where) {
			//已收藏
			this.nodeCancelStar(props.id)
		} else if (code === 1 && !props.star.where) {
			//未收藏
			this.nodeCreateStar(props.id)
		}
	}

	/**创建收藏**/
	private async nodeCreateStar(one: number) {
		try {
			const { code } = await nodeCreateStar({ one, type: 2 })
			if (code === HttpStatus.OK) {
				this.$emit('refresh')
			}
		} catch (e) {}
	}

	/**取消收藏**/
	private async nodeCancelStar(one: number) {
		try {
			const { code } = await nodeCancelStar({ one, type: 2 })
			if (code === HttpStatus.OK) {
				this.$emit('refresh')
			}
		} catch (e) {}
	}

	protected render() {
		return (
			<div class={style['app-conter']}>
				<Skeleton
					loading={this.loading && this.dataSource.length === 0}
					animated
					count={8}
					class={style['node-skeleton']}
				>
					<div slot="template" class={style['node-skeleton-item']}>
						<div class={style['node-ctx']}>
							<div class={style['node-cover']}>
								<div class={style['node-cover-conter']}>
									<SkeletonItem
										variant="image"
										style={{ width: '100%', height: '100%' }}
									></SkeletonItem>
								</div>
							</div>
							<div class={style['node-footer']}>
								<div>
									<SkeletonItem variant="text" style={{ width: '70%' }}></SkeletonItem>
									<SkeletonItem variant="text"></SkeletonItem>
								</div>
								<div style={{ display: 'flex' }}>
									<SkeletonItem
										variant="circle"
										style={{ width: '32px', height: '32px' }}
									></SkeletonItem>
									<div style={{ flex: 1, display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
										<SkeletonItem variant="h3" style={{ width: '50%' }}></SkeletonItem>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div>
						{this.dataSource.length > 0 ? (
							<ul class={style['node-conter']}>
								{this.dataSource.map(k => (
									<li key={k.id} class={style['node-conter-item']}>
										<router-link to={`/player/${k.id}`} target="_blank" class={style['node-ctx']}>
											<div class={style['node-cover']}>
												<div class={style['node-cover-conter']}>
													<Image
														class={style['node-cover-image']}
														alt={k.title}
														lazy
														fit="cover"
														src={`${k.cover}?x-oss-process=style/resize-16-9`}
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
													<a class="app-ellipsis-2">{k.title}</a>
												</div>
												<div class={style['node-user']}>
													<AppAvatar
														size={32}
														src={`${k.user.avatar}?x-oss-process=style/resize-1-1`}
														username={k.user.nickname}
														rounded={false}
														style={{ cursor: 'pointer', borderRadius: '50%' }}
													></AppAvatar>
													<div class={style['node-user-nickname']}>
														<div style={{ flex: 1, overflow: 'hidden' }}>
															<a class="app-ellipsis">{k.user.nickname}</a>
														</div>
														<div class={style['node-play']}>
															<i class="el-icon-view"></i>
															<span style={{ marginLeft: '5px' }}>{k.browse || 0}</span>
														</div>
														<div
															class={style['node-play']}
															onClick={(e: Event) => this.onNodeStar(k, e)}
														>
															<i
																class="el-icon-star-on"
																style={{
																	fontSize: '18px',
																	color: k.star.where ? '#1989fa' : '#999999'
																}}
															></i>
															<span style={{ marginLeft: '5px' }}>
																{k.star.total || 0}
															</span>
														</div>
														<div class={style['node-play']}>
															<i class="el-icon-chat-dot-square"></i>
															<span style={{ marginLeft: '5px' }}>{k.comment || 0}</span>
														</div>
													</div>
												</div>
											</div>
										</router-link>
									</li>
								))}
								{this.total > this.dataSource.length && (
									<div class={style['node-conter-more']}>
										<Spin
											indicator={<Icon spin type="loading" style={{ fontSize: '42px' }} />}
										></Spin>
									</div>
								)}
							</ul>
						) : !this.loading && this.dataSource.length === 0 ? (
							<div class={style['node-empty']}>
								<Empty image={require('@/assets/icon/1629789570141.png')}></Empty>
							</div>
						) : null}
					</div>
				</Skeleton>
			</div>
		)
	}
}
