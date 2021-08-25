import { Vue, Component } from 'vue-property-decorator'
import { NodeMultipleStpone } from '@/views/web/multiple/common'
import { nodeClientArticle } from '@/api'
import { HttpStatus } from '@/types'
import style from '@/style/web/web.stpone.module.less'

@Component
export default class Stpone extends Vue {
	private state = {
		html: ''
	}

	protected created() {
		this.nodeClientArticle()
	}

	/**文章信息-客户端**/
	private async nodeClientArticle() {
		try {
			const { code, data } = await nodeClientArticle({ id: 1 })
			if (code === HttpStatus.OK) {
				console.log(data)
				this.state = Object.assign(this.state, {
					html: data.html
				})
			}
		} catch (e) {}
	}

	protected render() {
		const { state } = this
		return (
			<div class={style['app-conter']}>
				<NodeMultipleStpone html={state.html}></NodeMultipleStpone>
			</div>
		)
	}
}
