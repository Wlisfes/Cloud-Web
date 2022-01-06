import { Vue, Component } from 'vue-property-decorator'
import style from '@/style/common/root.comment.module.less'

@Component
export default class RootComment extends Vue {
	private html: string = ''

	private onContentInput(e: { target: HTMLDivElement }) {
		console.log(e.target.innerHTML)
	}

	protected render() {
		return (
			<div class={style['root-comment']}>
				<div class={style['root-form']}>
					<div
						class={style['root-form-container']}
						contenteditable="true"
						spellcheck="false"
						placeholder="输入评论（Enter换行，Ctrl + Enter发送）"
						disabled="disabled"
						onInput={this.onContentInput}
					>
						<img
							class="emoji"
							draggable="false"
							alt="[撇嘴]"
							src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/jj_emoji_14.8130d96.png"
						/>
						<img
							class="emoji"
							draggable="false"
							alt="[疑问]"
							src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/jj_emoji_31.606e7a5.png"
						/>
						<img
							class="emoji"
							draggable="false"
							alt="[发呆]"
							src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/jj_emoji_4.28b310a.png"
						/>
						猪头
					</div>
				</div>
			</div>
		)
	}
}
