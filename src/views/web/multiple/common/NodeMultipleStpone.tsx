import { Vue, Component, Prop } from 'vue-property-decorator'
import { AppAvatar } from '@/components/common'
import { Image, Empty, Skeleton, SkeletonItem } from 'element-ui'
import { NodeArticle } from '@/types'
import style from '@/style/web/common/node.multiple.stpone.module.less'

@Component
export default class NodeMultipleStpone extends Vue {
	@Prop({ type: Object, default: () => null }) state!: NodeArticle
	@Prop({ type: Boolean, default: true }) loading!: boolean

	protected render() {
		const { state } = this

		return (
			<div class={style['app-conter']}>
				<Skeleton loading={this.loading} animated count={1} class={style['node-skeleton']}>
					<div slot="template" class={style['node-skeleton-item']}>
						<div class={style['node-user']}>
							<div class={style['node-user-avatar']}>
								<SkeletonItem variant="circle" style={{ width: '100%', height: '100%' }}></SkeletonItem>
							</div>
							<div class={style['node-user-content']}>
								<SkeletonItem
									variant="h1"
									style={{ width: '120px', marginBottom: '8px' }}
								></SkeletonItem>
								<SkeletonItem variant="text" style={{ width: '80px' }}></SkeletonItem>
							</div>
						</div>
						<div class={style['node-cover']}>
							<div class={style['node-cover-conter']}>
								<SkeletonItem variant="image" style={{ width: '100%', height: '100%' }}></SkeletonItem>
							</div>
						</div>
						<div class={style['node-html-content']}>
							<SkeletonItem
								variant="h1"
								style={{ width: '20%', height: '26px', marginBottom: '20px' }}
							></SkeletonItem>
							<SkeletonItem style={{ height: '16px', marginBottom: '12px' }}></SkeletonItem>
							<SkeletonItem style={{ height: '16px', marginBottom: '12px' }}></SkeletonItem>
							<SkeletonItem style={{ width: '60%', height: '16px' }}></SkeletonItem>
						</div>
					</div>
					<div class={style['node-conter']}>
						<div class={style['node-user']}>
							<div class={style['node-user-avatar']}>
								<AppAvatar
									size={48}
									src={`${state.user.avatar}?x-oss-process=style/resize-1-1`}
									username={state.user.nickname}
									rounded={false}
									style={{ cursor: 'pointer', borderRadius: '50%' }}
								></AppAvatar>
							</div>
							<div class={style['node-user-content']}>
								<SkeletonItem
									variant="h1"
									style={{ width: '120px', marginBottom: '8px' }}
								></SkeletonItem>
								<SkeletonItem variant="text" style={{ width: '80px' }}></SkeletonItem>
							</div>
						</div>
						<div class={style['node-cover']}>
							<div class={style['node-cover-conter']}>
								<Image
									class={style['node-cover-image']}
									alt={state.title}
									lazy
									fit="cover"
									src={`${state.cover}?x-oss-process=style/resize-16-9`}
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
						<div class="node-html" domPropsInnerHTML={state.html}></div>
					</div>
				</Skeleton>
			</div>
		)
	}
}
