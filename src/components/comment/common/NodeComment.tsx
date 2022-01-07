import { Vue, Component, Prop } from 'vue-property-decorator'
import { AppAvatar } from '@/components/common'
import { NodeReply } from '@/components/comment/common'
import { SVGLike, SVGReply } from '@/components/icons/svg-icon'
import { stopBack } from '@/utils/auth'
import { NodeComment as NodeCommentInter } from '@/types'
import style from '@/style/common/root.comment.module.less'

@Component
export class VNodeReply extends Vue {
	@Prop({ type: Object, default: () => null }) node!: NodeCommentInter
	private visible: boolean = false

	private onContentBlur(e: { target: HTMLDivElement }) {
		if (!e.target.innerHTML) {
			this.visible = !this.visible
		}
	}

	protected render() {
		const { node } = this
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
					</div>
					<div class={style['comment-content']}>{node.comment}</div>
					<div class={style['comment-footer']}>
						<div class={style['comment-footer-place']}>
							<SVGLike />
							<span>点赞</span>
						</div>
						<div
							class={style['comment-footer-place']}
							onClick={(e: Event) => stopBack(e, () => (this.visible = !this.visible))}
						>
							<SVGReply />
							<span>回复</span>
						</div>
					</div>
					{this.visible && (
						<div style={{ marginTop: '12px' }}>
							<NodeReply
								auto-focus
								placeholder={`回复${node.user.nickname}`}
								onBlur={this.onContentBlur}
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
	@Prop({ type: Object, default: () => null }) node!: NodeCommentInter
	private visible: boolean = false
	private total: number = this.node?.reply.total || 0
	private dataSource: Array<NodeCommentInter> = this.node?.reply.list || []

	private onContentBlur(e: { target: HTMLDivElement }) {
		if (!e.target.innerHTML) {
			this.visible = !this.visible
		}
	}

	protected render() {
		const { node } = this
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
					<div class={style['comment-user']}>
						<div class={style['comment-user-nickname']}>
							<span>{node.user.nickname}</span>
						</div>
					</div>
					<div class={style['comment-content']}>{node.comment}</div>
					<div class={style['comment-footer']}>
						<div class={style['comment-footer-place']}>
							<SVGLike />
							<span>点赞</span>
						</div>
						<div
							class={style['comment-footer-place']}
							onClick={(e: Event) => stopBack(e, () => (this.visible = !this.visible))}
						>
							<SVGReply />
							<span>回复</span>
						</div>
					</div>
					{this.visible && (
						<div style={{ marginTop: '12px' }}>
							<NodeReply
								auto-focus
								placeholder={`回复${node.user.nickname}`}
								onBlur={this.onContentBlur}
							></NodeReply>
						</div>
					)}
					{this.total > 0 && (
						<div class={style['comment-reply']}>
							{this.dataSource.map(item => {
								return <VNodeReply {...{ props: { node: item } }}></VNodeReply>
							})}
						</div>
					)}
				</div>
			</div>
		)
	}
}

@Component
export default class NodeComment extends Vue {
	@Prop({ type: Array, default: () => [] }) dataSource!: NodeCommentInter[]

	protected render() {
		return (
			<div style={{ paddingTop: '32px' }}>
				<div class={style['node-comment']}>
					{this.dataSource.map(item => {
						return <VNodeComment {...{ props: { node: item } }}></VNodeComment>
					})}
				</div>
			</div>
		)
	}
}
