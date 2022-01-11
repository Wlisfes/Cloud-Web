import { Vue, Component, Prop } from 'vue-property-decorator'
import { notification, Popconfirm, Empty } from 'ant-design-vue'
import { AppAvatar } from '@/components/common'
import { NodeReply } from '@/components/comment/common'
import { SVGLike, SVGReply } from '@/components/icons/svg-icon'
import { stopAuth } from '@/utils/auth'
import { useFormer } from '@/utils/moment'
import { nodeChildComments, nodeCreateComment, nodeDeleteComment } from '@/api'
import { HttpStatus, NodeComment as NodeCommentInter } from '@/types'
import style from '@/style/common/root.comment.module.less'

@Component
export class VNodeReply extends Vue {
	@Prop({ type: Number }) super!: number
	@Prop({ type: Number }) primary!: number
	@Prop({ type: Number, default: 1 }) type!: number
	@Prop({ type: Number, default: () => 0 }) total!: number
	@Prop({ type: Object, default: () => null }) node!: NodeCommentInter
	private visible: boolean = false
	private delete: boolean = this.node?.status === 2

	private onContentBlur(e: { target: HTMLDivElement }) {
		if (!e.target.innerHTML) {
			this.visible = !this.visible
		}
	}

	/**创建评论**/
	private async onContentSubmit(props: { value: string; done: Function }) {
		try {
			const { code } = await nodeCreateComment({
				one: this.primary,
				type: this.type,
				super: this.super,
				parent: this.node?.id || null,
				comment: props.value
			})
			if (code === HttpStatus.OK) {
				this.$emit('refresh')
			}
			props.done()
		} catch (e) {
			props.done()
		}
	}

	/**删除评论**/
	private async initNodeDeleteComment(props: NodeCommentInter) {
		try {
			const { code, data } = await nodeDeleteComment({ id: props.id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '', duration: 1 })
				this.delete = true
				if (this.$el.parentElement?.children?.length === 1) {
					this.$el.parentElement.style.display = 'none'
				}
			}
		} catch (e) {}
	}

	protected render() {
		const { node } = this
		if (this.delete) {
			return null
		}

		return (
			<div key={node.id} class={style['comment-reply-item']}>
				<div class={style['comment-reply-avatar']}>
					<AppAvatar
						size={26}
						src={`${node.user.avatar}?x-oss-process=style/resize-1-1`}
						username={node.user.nickname}
						style={{ cursor: 'pointer', borderRadius: '50%' }}
					/>
				</div>
				<div class={style['comment-reply-container']}>
					<div class={style['comment-user']}>
						<div class={style['comment-user-nickname']}>
							<span>{node.user.nickname}</span>
						</div>
						<div>{useFormer(node.createTime)}</div>
					</div>
					<div class={style['comment-content']} domPropsInnerHTML={node.comment}></div>
					{node.parent && !(node.parent.id === this.super) && (
						<div
							class={`${style['comment-content']} ${style['is-parent-content']}`}
							domPropsInnerHTML={node.parent.comment}
						></div>
					)}
					<div class={style['comment-footer']}>
						<div class={style['comment-footer-place']}>
							<SVGLike />
							<span>点赞</span>
						</div>
						<div
							class={style['comment-footer-place']}
							onClick={(e: Event) => stopAuth(() => (this.visible = !this.visible))}
						>
							<SVGReply />
							<span>回复</span>
						</div>
						<div style={{ marginLeft: 'auto' }}>
							<Popconfirm
								placement="topRight"
								title="确定要删除吗？"
								ok-text="确定"
								cancel-text="取消"
								onConfirm={() => stopAuth(() => this.initNodeDeleteComment(node))}
							>
								<button class="delete-button" v-user={{ uid: node.user.uid }}>
									删除
								</button>
							</Popconfirm>
						</div>
					</div>
					{this.visible && (
						<div style={{ marginTop: '12px' }}>
							<NodeReply
								auto-focus
								placeholder={`回复${node.user.nickname}`}
								onBlur={this.onContentBlur}
								onSubmit={this.onContentSubmit}
							></NodeReply>
						</div>
					)}
				</div>
			</div>
		)
	}
}

@Component
export class VNodeComment extends Vue {
	@Prop({ type: Number }) primary!: number
	@Prop({ type: Number, default: 1 }) type!: number
	@Prop({ type: Object, default: () => null }) node!: NodeCommentInter
	private visible: boolean = false
	private page: number = 1
	private size: number = 5
	private loading: boolean = false
	private delete: boolean = this.node?.status === 2
	private total: number = this.node?.reply.total || 0
	private dataSource: Array<NodeCommentInter> = this.node?.reply.list || []

	private onContentBlur(e: { target: HTMLDivElement }) {
		if (!e.target.innerHTML) {
			this.visible = !this.visible
		}
	}

	/**评论列表**/
	private async initNodeComments() {
		try {
			const { code, data } = await nodeChildComments({
				one: this.primary,
				type: this.type,
				page: this.page,
				size: this.size,
				super: this.node?.id
			})
			if (code === HttpStatus.OK) {
				this.dataSource = data.list
				this.total = data.total
			}
			return (this.loading = false)
		} catch (e) {
			return (this.loading = false)
		}
	}

	/**创建评论**/
	private async onContentSubmit(props: { value: string; done: Function }) {
		try {
			const { code } = await nodeCreateComment({
				one: this.primary,
				type: this.type,
				super: this.node?.id,
				parent: this.node?.id || null,
				comment: props.value
			})
			if (code === HttpStatus.OK) {
				this.loading = true
				await this.initNodeComments()
			}
			props.done()
		} catch (e) {
			props.done()
		}
	}

	/**删除评论**/
	private async initNodeDeleteComment({ id }: NodeCommentInter) {
		try {
			const { code, data } = await nodeDeleteComment({ id })
			if (code === HttpStatus.OK) {
				notification.success({ message: data.message, description: '', duration: 1 })
				this.delete = true
			}
		} catch (e) {}
	}

	protected render() {
		const { node } = this
		if (this.delete) {
			return null
		}

		return (
			<div key={node.id} class={style['node-comment-item']}>
				<div class={style['node-comment-avatar']}>
					<AppAvatar
						size={40}
						src={`${node.user.avatar}?x-oss-process=style/resize-1-1`}
						username={node.user.nickname}
						style={{ cursor: 'pointer', borderRadius: '50%' }}
					/>
				</div>
				<div class={style['node-comment-container']}>
					<div class={style['comment-parent-container']}>
						<div class={style['comment-user']}>
							<div class={style['comment-user-nickname']}>
								<span>{node.user.nickname}</span>
							</div>
							<div>{useFormer(node.createTime)}</div>
						</div>
						<div class={style['comment-content']} domPropsInnerHTML={node.comment}></div>
						<div class={style['comment-footer']}>
							<div class={style['comment-footer-place']}>
								<SVGLike />
								<span>点赞</span>
							</div>
							<div
								class={style['comment-footer-place']}
								onClick={(e: Event) => stopAuth(() => (this.visible = !this.visible))}
							>
								<SVGReply />
								<span>回复</span>
							</div>
							<div style={{ marginLeft: 'auto' }}>
								<Popconfirm
									placement="topRight"
									title="确定要删除吗？"
									ok-text="确定"
									cancel-text="取消"
									onConfirm={() => stopAuth(() => this.initNodeDeleteComment(node))}
								>
									<button class="delete-button" v-user={{ uid: node.user.uid }}>
										删除
									</button>
								</Popconfirm>
							</div>
						</div>
						{this.visible && (
							<div style={{ marginTop: '12px' }}>
								<NodeReply
									auto-focus
									placeholder={`回复${node.user.nickname}`}
									onBlur={this.onContentBlur}
									onSubmit={this.onContentSubmit}
								></NodeReply>
							</div>
						)}
					</div>
					<keep-alive>
						{this.total > 0 && (
							<div class={style['comment-reply']}>
								{this.dataSource.map(item => {
									return (
										<VNodeReply
											key={item.id}
											total={this.total}
											super={this.node.id}
											primary={this.primary}
											type={this.type}
											node={item}
											onRefresh={this.initNodeComments}
										></VNodeReply>
									)
								})}
							</div>
						)}
					</keep-alive>
				</div>
			</div>
		)
	}
}

@Component
export default class NodeComment extends Vue {
	@Prop({ type: Number }) primary!: number
	@Prop({ type: Number, default: 1 }) type!: number
	@Prop({ type: Number, default: 0 }) total!: number
	@Prop({ type: Boolean, default: true }) loading!: boolean
	@Prop({ type: Array, default: () => [] }) dataSource!: NodeCommentInter[]

	protected render() {
		return (
			<div style={{ paddingTop: '32px' }} v-loading={this.loading}>
				{this.total === 0 ? (
					<Empty image={(Empty as any).PRESENTED_IMAGE_SIMPLE} description="暂无评论"></Empty>
				) : (
					<div class={style['node-comment']}>
						{this.dataSource.map(item => {
							return (
								<VNodeComment
									key={item.id}
									node={item}
									primary={this.primary}
									type={this.type}
									onRefresh={() => this.$emit('refresh')}
								></VNodeComment>
							)
						})}
					</div>
				)}
			</div>
		)
	}
}
