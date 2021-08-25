import { Vue, Component, Prop } from 'vue-property-decorator'
import { Spin, Icon } from 'ant-design-vue'
import { Image, Empty, Skeleton, SkeletonItem } from 'element-ui'
import { AppAvatar } from '@/components/common'
import { NodeArticle } from '@/types'
import style from '@/style/web/common/node.multiple.article.module.less'

@Component
export default class NodeMultipleArticle extends Vue {
	@Prop({ type: Array, default: () => [] }) dataSource!: NodeArticle[]
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
						<div class={style['node-ctx']}>
							<div class={style['node-ctx-title']}>
								<SkeletonItem variant="h1" style={{ width: '50%', height: '20px', margin: '2px 0' }} />
							</div>
							<div class={style['node-ctx-content']}>
								<SkeletonItem
									variant="text"
									style={{ height: '14px', width: '80%', margin: '5px 0' }}
								/>
								<SkeletonItem variant="text" style={{ height: '14px', margin: '5px 0' }} />
								<SkeletonItem variant="text" style={{ height: '14px', margin: '5px 0' }} />
							</div>
							<div class={style['node-ctx-footer']}>
								<div class={style['node-icon']}>
									<SkeletonItem variant="text" style={{ height: '16px', width: '50px' }} />
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
					<div>
						{this.dataSource.length > 0 ? (
							<ul class={style['node-conter']}>
								{this.dataSource.map(k => (
									<li key={k.id} class={style['node-conter-item']}>
										<div class={style['node-ctx']}>
											<div class={style['node-ctx-title']}>
												<a class="app-ellipsis">{k.title}</a>
											</div>
											<div class={style['node-ctx-content']}>
												<p class="app-ellipsis-2">{k.description}</p>
											</div>
											<div class={style['node-ctx-footer']}>
												<div class={style['node-icon']}>
													<span>{k.user.nickname}</span>
												</div>
												<div class={style['node-icon']}>
													<i class="el-icon-view" style={{ fontSize: '16px' }}></i>
													<span style={{ marginLeft: '5px' }}>{k.browse || 0}</span>
												</div>
												<div class={style['node-icon']}>
													<i class="el-icon-star-on" style={{ fontSize: '18px' }}></i>
													<span style={{ marginLeft: '5px' }}>{k.browse || 0}</span>
												</div>
												<div class={style['node-icon']}>
													<i class="el-icon-chat-dot-square" style={{ fontSize: '16px' }}></i>
													<span style={{ marginLeft: '5px' }}>{k.browse || 0}</span>
												</div>
											</div>
										</div>
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
									</li>
								))}
							</ul>
						) : !this.loading && this.dataSource.length === 0 ? (
							<div></div>
						) : null}
					</div>
				</Skeleton>
			</div>
		)
	}
}
