import { Vue, Component } from 'vue-property-decorator'
import { NodeReply, NodeComment } from '@/components/comment/common'
import { nodeComments, nodeDeleteComment } from '@/api'
import { HttpStatus, NodeComment as NodeCommentInter } from '@/types'
import style from '@/style/common/root.comment.module.less'

@Component
export default class RootComment extends Vue {
	private page: number = 1
	private size: number = 10
	private loading: boolean = true
	private total: number = 0
	private dataSource: Array<NodeCommentInter> = []

	protected created() {
		this.initNodeComments()
	}

	private async initNodeComments() {
		try {
			const { code, data } = await nodeComments({ one: 37, type: 2, page: this.page, size: this.size })
			if (code === HttpStatus.OK) {
				this.dataSource = data.list
				this.total = data.total
			}
			this.loading = false
		} catch (e) {
			this.loading = false
		}
	}

	protected render() {
		return (
			<div class={style['root-comment']}>
				<NodeReply
					avatar
					onSubmit={(props: { value: string; done: Function }) => {
						setTimeout(() => {
							console.log(props.value)
							props.done()
						}, 15000)
					}}
				></NodeReply>
				<NodeComment dataSource={this.dataSource}></NodeComment>
			</div>
		)
	}
}
