import { Vue, Component, Prop } from 'vue-property-decorator'
import { Pagination } from 'ant-design-vue'
import { NodeReply, NodeComment } from '@/components/comment/common'
import { nodeComments, nodeCreateComment } from '@/api'
import { HttpStatus, NodeComment as NodeCommentInter } from '@/types'
import style from '@/style/common/root.comment.module.less'

@Component
export default class RootComment extends Vue {
	@Prop({ type: Number }) primary!: number
	@Prop({ type: Number, default: 1 }) type!: number

	private page: number = 1
	private size: number = 10
	private loading: boolean = true
	private total: number = 0
	private dataSource: Array<NodeCommentInter> = []

	protected created() {
		this.initNodeComments()
	}

	/**评论列表**/
	private async initNodeComments() {
		try {
			const { primary, type, page, size } = this
			const { code, data } = await nodeComments({ one: primary, type, page, size })
			if (code === HttpStatus.OK) {
				this.dataSource = data.list
				this.total = data.total
			}
			return (this.loading = false)
		} catch (e) {
			return (this.loading = false)
		}
	}

	/**评论分页**/
	private async onChange(page: number, size: number) {
		this.page = page
		this.size = size
		this.loading = true
		await this.$nextTick()
		await this.initNodeComments()
	}

	/**创建评论**/
	private async onContentSubmit(props: { value: string; done: Function }) {
		try {
			const { code } = await nodeCreateComment({
				one: this.primary,
				type: this.type,
				comment: props.value
			})
			if (code === HttpStatus.OK) {
				await this.initNodeComments()
			}
			props.done()
		} catch (e) {
			props.done()
		}
	}

	protected render() {
		return (
			<div class={style['root-comment']}>
				<NodeReply avatar onSubmit={this.onContentSubmit}></NodeReply>
				<NodeComment
					primary={this.primary}
					type={this.type}
					total={this.total}
					loading={this.loading}
					dataSource={this.dataSource}
				></NodeComment>
				{this.total > 0 && (
					<div class={style['root-comment-pagination']}>
						<Pagination
							show-size-changer
							total={this.total}
							onChange={this.onChange}
							onShowSizeChange={(page: number, size: number) => this.onChange(page, size)}
						></Pagination>
					</div>
				)}
			</div>
		)
	}
}
