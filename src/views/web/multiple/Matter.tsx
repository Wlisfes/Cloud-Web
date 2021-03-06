import { Vue, Component } from 'vue-property-decorator'
import { NodeMatter } from '@/views/web/multiple/common'
import { nodeClientArticle } from '@/api'
import { HttpStatus } from '@/types'
import style from '@/style/web/web.matter.module.less'

@Component
export default class Matter extends Vue {
	private loading: boolean = true
	private state: any = {}

	protected created() {
		const id = Number(this.$route.params.id)
		if (id) {
			this.init(id)
		}
	}

	/**页面初始化**/
	private init(id: number) {
		this.nodeClientArticle(id).finally(() => {
			this.loading = false
		})
	}

	/**文章信息-客户端**/
	private nodeClientArticle(id: number) {
		return new Promise(async (resolve, reject) => {
			try {
				const { code, data } = await nodeClientArticle({ id })
				if (code === HttpStatus.OK) {
					this.state = data
				}
				resolve(data)
			} catch (e) {
				reject(e)
			}
		})
	}

	protected render() {
		const { state } = this
		return (
			<div class={style['app-conter']}>
				<NodeMatter state={state} loading={this.loading} onRefresh={(id: number) => this.init(id)}></NodeMatter>
			</div>
		)
	}
}
