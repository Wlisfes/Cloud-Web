import { Vue, Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Avatar, Button } from 'ant-design-vue'
import { AppAvatar } from '@/components/common'
import { SVGEmoji, SVGImage } from '@/components/icons/svg-icon'
import style from '@/style/common/root.comment.module.less'

@Component
export default class NodeReply extends Vue {
	$refs!: { reply: HTMLDivElement }

	@Prop({ type: Boolean, default: false }) avatar!: boolean
	@Prop({ type: String }) placeholder!: string

	@Getter('user/uid') uid!: number
	@Getter('user/nickname') nickname!: string
	@Getter('user/avatar') userAvatar!: string

	private content: string = ''
	private loading: boolean = false

	/**文本域Focus事件**/
	private onContentFocus(e: { target: HTMLDivElement }) {
		if (!e.target.classList.contains(style['is-form-conter-focus'])) {
			e.target.classList.add(style['is-form-conter-focus'])
		}
	}

	/**文本域Blur事件**/
	private onContentBlur(e: { target: HTMLDivElement }) {
		if (!e.target.innerHTML) {
			if (e.target.classList.contains(style['is-form-conter-focus'])) {
				e.target.classList.remove(style['is-form-conter-focus'])
			}
		}
	}

	/**文本域Input事件**/
	private onContentInput(e: { target: HTMLDivElement }) {
		this.content = e.target.innerHTML
	}

	/**文本域Ctrl + Enter组合事件**/
	private onContentKeydown(e: KeyboardEvent & { target: HTMLDivElement }) {
		if (e.target.innerHTML && e.ctrlKey && e.key === 'Enter' && !this.loading) {
			this.onSubmit(e.target)
		}
	}

	private onSubmit(target: HTMLDivElement) {
		this.loading = true
		this.$emit('submit', {
			value: target.innerHTML,
			done: () => {
				this.loading = false
				target.innerHTML = ''
			}
		})
	}

	protected render() {
		return (
			<div class={style['node-reply']}>
				{this.avatar && (
					<div class={style['node-reply-avatar']}>
						{this.uid ? (
							<AppAvatar
								size={40}
								src={`${this.userAvatar}?x-oss-process=style/resize-1-1`}
								username={this.nickname}
								rounded={false}
								style={{ cursor: 'pointer', borderRadius: '50%' }}
							/>
						) : (
							<Avatar size={40} icon="user" />
						)}
					</div>
				)}
				<div class={style['node-reply-container']}>
					<div
						class={style['node-reply-form-conter']}
						ref="reply"
						contenteditable
						spellcheck="false"
						disabled="disabled"
						placeholder={this.placeholder || '输入评论（Enter换行，Ctrl + Enter发送）'}
						onInput={this.onContentInput}
						onFocus={this.onContentFocus}
						onBlur={this.onContentBlur}
						onKeydown={this.onContentKeydown}
					></div>
					<div class={style['node-reply-form-footer']}>
						<div class={style['reply-place']}>
							<SVGEmoji />
							<span>表情</span>
						</div>
						<div class={style['reply-place']}>
							<SVGImage />
							<span>图片</span>
						</div>
						<div class={style['reply-submit']}>
							<span class={style['reply-submit-promote']}>Ctrl + Enter</span>
							<Button
								type="primary"
								loading={this.loading}
								disabled={!this.content || this.loading}
								onClick={() => this.onSubmit(this.$refs.reply)}
							>
								发表评论
							</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
