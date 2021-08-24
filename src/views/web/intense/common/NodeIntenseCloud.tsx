import { Vue, Component, Prop } from 'vue-property-decorator'
import { Spin, Icon } from 'ant-design-vue'
import { Image, Empty, Skeleton, SkeletonItem } from 'element-ui'
import { AppAvatar } from '@/components/common'
import { NodeCloud } from '@/types'
import style from '@/style/web/common/node.intense.cloud.module.less'

@Component
export default class NodeIntenseCloud extends Vue {
	@Prop({ type: Array, default: () => [] }) dataSource!: NodeCloud[]
	@Prop({ type: Boolean, default: true }) loading!: boolean
	@Prop({ type: Number, default: 0 }) total!: number

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
										<router-link to={`/player/${k.id}`} class={style['node-ctx']}>
											<div class={style['node-cover']}>
												<div class={style['node-cover-conter']}>
													<Image
														class="app-image"
														alt={k.title}
														lazy
														fit="cover"
														src={`${k.cover}?x-oss-process=style/resize-16-9`}
													></Image>
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
														<a class="app-ellipsis">{k.user.nickname}</a>
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
						) : (
							<div class={style['node-empty']}>
								<Empty image="https://oss.lisfes.cn/cloud/stctic/1629789570142.png"></Empty>
							</div>
						)}
					</div>
				</Skeleton>
			</div>
		)
	}
}
