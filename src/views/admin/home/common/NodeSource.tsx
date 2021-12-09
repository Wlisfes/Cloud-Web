import { Vue, Component } from 'vue-property-decorator'
import { Divider, Avatar, Tag } from 'ant-design-vue'
import { Skeleton, SkeletonItem } from 'element-ui'
import { nodeComputeTotal } from '@/api'
import { HttpStatus, NodeComputeTotalResponse } from '@/types'
import style from '@/style/admin/admin.home.module.less'

@Component
export default class NodeSource extends Vue {
	private node: NodeComputeTotalResponse | null = null
	private loading: boolean = true

	protected created() {
		this.nodeComputeTotal()
	}

	/**各类总数统计**/
	private async nodeComputeTotal() {
		try {
			const { code, data } = await nodeComputeTotal()
			if (code === HttpStatus.OK) {
				this.node = data
				this.loading = false
			}
		} catch (e) {
			this.loading = false
		}
	}

	private useSource(props: {
		title: string
		total: number
		count: number
		cover: string
		label: string
		color: string
	}) {
		const flexColumn = { display: 'flex', flexDirection: 'column' }
		return (
			<Skeleton loading={this.loading} animated>
				<div slot="template" class={style['item-conter']}>
					<div class={style['item-header']}>
						<div style={{ flex: 1 }}>{props.title}</div>
						<SkeletonItem style={{ width: '28px', height: '22px' }} />
					</div>
					<Divider style={{ margin: 0 }} />
					<div style={{ ...flexColumn, height: '96px', padding: '12px', justifyContent: 'space-between' }}>
						<SkeletonItem style={{ width: '80%', height: '16px' }} />
						<SkeletonItem style={{ height: '16px' }} />
						<SkeletonItem style={{ height: '16px' }} />
					</div>
					<div class={style['item-month']} style={{ padding: '0 12px 12px' }}>
						<SkeletonItem style={{ height: '16px' }} />
					</div>
				</div>
				<div class={style['item-conter']}>
					<div class={style['item-header']}>
						<div style={{ flex: 1 }}>{props.title}</div>
						<Tag color={props.color} style={{ margin: 0, cursor: 'pointer' }}>
							月
						</Tag>
					</div>
					<Divider style={{ margin: 0 }} />
					<div class={style['item-body']}>
						<div style={{ flex: 1 }}>{props.count}</div>
						<Avatar size={48} src={props.cover}></Avatar>
					</div>
					<div class={style['item-month']}>
						<div style={{ flex: 1 }}>{props.label}</div>
						<div>{props.total}</div>
					</div>
				</div>
			</Skeleton>
		)
	}

	protected render() {
		const { node } = this

		return (
			<div class={style['node-source']}>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '媒体',
						label: '总媒体数量',
						color: '#E21A20',
						total: node?.cloud.total || 0,
						count: node?.cloud.count || 0,
						cover: require('@/assets/static/1638872128223.png')
					})}
				</div>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '文章',
						label: '总文章数量',
						color: '#87E0C8',
						total: node?.article.total || 0,
						count: node?.article.count || 0,
						cover: require('@/assets/static/1638872128221.png')
					})}
				</div>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '标签',
						label: '总标签数量',
						color: '#3BAFDA',
						total: node?.source.total || 0,
						count: node?.source.count || 0,
						cover: require('@/assets/static/1638872128222.png')
					})}
				</div>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '收录',
						label: '总收录数量',
						color: '#2093F5',
						total: node?.minute.total || 0,
						count: node?.minute.count || 0,
						cover: require('@/assets/static/1638872128224.png')
					})}
				</div>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '用户',
						label: '总用户数量',
						color: '#31AF91',
						total: node?.user.total || 0,
						count: node?.user.count || 0,
						cover: require('@/assets/static/1638872128220.png')
					})}
				</div>
			</div>
		)
	}
}
