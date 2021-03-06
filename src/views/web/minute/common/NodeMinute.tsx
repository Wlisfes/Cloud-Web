import { Vue, Component, Prop } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
import { Image, Empty, Skeleton, SkeletonItem } from 'element-ui'
import { NodeMinute as NodeMinuteState } from '@/types'
import moment from 'dayjs'
import style from '@/style/web/common/node.minute.module.less'

@Component
export default class NodeMinute extends Vue {
	@Prop({ type: Array, default: () => [] }) dataSource!: NodeMinuteState[]
	@Prop({ type: Boolean, default: true }) loading!: boolean
	@Prop({ type: Number, default: 0 }) total!: number

	protected render() {
		return (
			<div class={style['app-conter']}>
				<Skeleton
					loading={this.loading && this.dataSource.length === 0}
					animated
					count={3}
					class={style['node-skeleton']}
				>
					<div slot="template" class={style['node-skeleton-item']}>
						<div class={style['node-minute-conter']}>
							<div class={style['node-cover']}>
								<div class={style['node-cover-conter']}>
									<SkeletonItem
										variant="image"
										style={{ width: '100%', height: '100%' }}
									></SkeletonItem>
								</div>
							</div>
							<div class={style['node-ctx']}>
								<div class={style['node-ctx-title']}>
									<SkeletonItem
										variant="h1"
										style={{ width: '50%', height: '20px', margin: '2px 0' }}
									/>
								</div>
								<div class={style['node-ctx-content']}>
									<SkeletonItem variant="text" style={{ height: '14px', margin: '5px 0' }} />
									<SkeletonItem variant="text" style={{ height: '14px', margin: '5px 0' }} />
								</div>
								<div class={style['node-ctx-footer']}>
									<div class={style['node-icon']}>
										<SkeletonItem variant="text" style={{ height: '16px', width: '50px' }} />
									</div>
									<div class={style['node-icon']}>
										<SkeletonItem variant="text" style={{ height: '16px', width: '150px' }} />
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
										<div class={style['node-minute-conter']}>
											<div class={style['node-cover']}>
												<div class={style['node-cover-conter']}>
													<Image
														class={style['node-cover-image']}
														alt={k.name}
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
											<div class={style['node-ctx']}>
												<div class={style['node-ctx-title']}>
													<h1 class="app-ellipsis">{k.name}</h1>
												</div>
												<div class={style['node-ctx-content']}>
													<p class="app-ellipsis-2">{k.description}</p>
												</div>
												<div class={style['node-ctx-footer']}>
													<div class={style['node-icon']}>
														<span>{k.user.nickname}</span>
													</div>
													<div class={style['node-icon']}>
														<time datetime={k.createTime}>
															{moment(k.createTime).format('YYYY-MM-DD')}
														</time>
													</div>
													{k.github && (
														<div class={style['node-icon']}>
															<a href={k.github} target="_blank">
																<Icon
																	type="github"
																	style={{ fontSize: '18px', color: '#24292F' }}
																/>
															</a>
														</div>
													)}
													{k.url && (
														<div class={style['node-icon']}>
															<a href={k.url} target="_blank">
																<Icon
																	type="link"
																	style={{ fontSize: '18px', color: '#24292F' }}
																/>
															</a>
														</div>
													)}
													{k.npm && (
														<div class={style['node-icon']}>
															<a href={k.npm} target="_blank">
																<Icon
																	type="medium"
																	style={{ fontSize: '18px', color: '#CB3837' }}
																/>
															</a>
														</div>
													)}
												</div>
											</div>
										</div>
									</li>
								))}
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
