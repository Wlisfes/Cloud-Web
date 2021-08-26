import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { AppAvatar } from '@/components/common'
import { Tag, notification } from 'ant-design-vue'
import { Image, Empty, Skeleton, SkeletonItem } from 'element-ui'
import { NodeArticle } from '@/types'
import Clipboard from 'clipboard'
import style from '@/style/web/common/node.multiple.stpone.module.less'

@Component
export default class NodeMultipleStpone extends Vue {
	$refs!: { html: HTMLElement }

	@Prop({ type: Object, default: () => null }) state!: NodeArticle
	@Prop({ type: Boolean, default: true }) loading!: boolean

	@Watch('loading', { immediate: true })
	private onMounte() {
		this.$nextTick(() => {
			if (this.$refs.html) {
				const pre = Array.from(this.$refs.html.getElementsByTagName('pre')) || []
				pre.forEach(element => {
					const node = document.createElement('span')
					node.innerHTML = '复制代码'
					node.setAttribute('class', 'pre-copy')
					element.appendChild(node)
					const instance = new Clipboard(node, {
						text: trigger => element.querySelector('code')?.innerText || ''
					})
					instance.on('success', e => {
						e.clearSelection()
						notification.success({ message: '复制成功', description: '', duration: 1 })
					})
				})
			}
		})
	}

	protected render() {
		const { state } = this
		return (
			<div class={style['app-conter']}>
				<Skeleton loading={this.loading} animated count={1} class={style['node-skeleton']}>
					<div slot="template" class={style['node-skeleton-item']}>
						<h1 class={style['node-h-title']} style={{ display: 'flex' }}>
							<SkeletonItem
								variant="h1"
								style={{ height: '32px', width: '60%', margin: '5px 0' }}
							></SkeletonItem>
						</h1>
						<div class={style['node-user']}>
							<div class={style['node-user-avatar']}>
								<SkeletonItem variant="circle" style={{ height: '48px', width: '48px' }}></SkeletonItem>
							</div>
							<div class={style['node-user-content']}>
								<div class={style['node-user-nick']}>
									<div class={style['nick-conter']}>
										<SkeletonItem style={{ height: '16px', width: '50px' }}></SkeletonItem>
									</div>
									<div class={style['nick-conter']}>
										<SkeletonItem style={{ height: '14px', width: '280px' }}></SkeletonItem>
									</div>
								</div>
								<div class={style['node-user-source']}>
									<SkeletonItem style={{ height: '14px', width: '60px' }}></SkeletonItem>
									<SkeletonItem
										style={{ height: '14px', width: '180px', marginLeft: '8px' }}
									></SkeletonItem>
								</div>
							</div>
						</div>
						<div class={style['node-cover']}>
							<div class={style['node-cover-conter']}>
								<SkeletonItem variant="rect" style={{ height: '100%', width: '100%' }} />
							</div>
						</div>
						<div class={style['node-html-content']}>
							<SkeletonItem
								variant="h1"
								style={{ width: '40%', height: '24px', marginBottom: '20px' }}
							></SkeletonItem>
							<SkeletonItem style={{ height: '16px', marginBottom: '12px' }}></SkeletonItem>
							<SkeletonItem style={{ height: '16px', marginBottom: '12px' }}></SkeletonItem>
							<SkeletonItem style={{ width: '60%', height: '16px' }}></SkeletonItem>
						</div>
					</div>
					<div class={style['node-conter']}>
						<h1 class={style['node-h-title']}>{state?.title}</h1>
						<div class={style['node-user']}>
							<div class={style['node-user-avatar']}>
								<AppAvatar
									size={48}
									src={`${state?.user?.avatar}?x-oss-process=style/resize-1-1`}
									username={state?.user?.nickname}
									rounded={false}
									style={{ cursor: 'pointer', borderRadius: '50%' }}
								></AppAvatar>
							</div>
							<div class={style['node-user-content']}>
								<div class={style['node-user-nick']}>
									<div class={style['nick-conter']} style={{ color: '#444', fontSize: '16px' }}>
										<span>{state?.user?.nickname}</span>
									</div>
									<div class={style['nick-conter']}>
										<time datetime={state?.createTime}>{state?.createTime}</time>
									</div>
									<div class={style['nick-conter']}>
										<i class="el-icon-view" style={{ fontSize: '16px', marginTop: '2px' }}></i>
										<span style={{ marginLeft: '5px' }}>{state?.browse || 0}</span>
									</div>
									<div class={style['nick-conter']}>
										<i class="el-icon-star-on" style={{ fontSize: '18px' }}></i>
										<span style={{ marginLeft: '5px' }}>{state?.browse || 0}</span>
									</div>
								</div>
								<div class={style['node-user-source']}>
									<span>分类标签:</span>
									{state?.source?.length > 0 ? (
										<div class={style['node-tags']}>
											{state?.source.map(k => (
												<Tag color={k.color}>{k.name}</Tag>
											))}
										</div>
									) : (
										<div class={style['node-tags']}>----</div>
									)}
								</div>
							</div>
						</div>
						<div class="node-html markdown-body" ref="html" domPropsInnerHTML={state.html}></div>
					</div>
				</Skeleton>
			</div>
		)
	}
}
