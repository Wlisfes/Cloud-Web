import { Vue, Component, Prop } from 'vue-property-decorator'
import { Icon, Divider, Avatar } from 'ant-design-vue'
import { Skeleton, SkeletonItem } from 'element-ui'
import { NodeComputeTotalResponse } from '@/types'
import style from '@/style/admin/admin.home.module.less'

@Component
export default class NodeSource extends Vue {
	@Prop({ type: Object, default: () => null }) node!: NodeComputeTotalResponse

	private useSource(props: { title: string; total: number; cover: string }) {
		const { node } = this
		const flexColumn = { display: 'flex', flexDirection: 'column' }
		return (
			<Skeleton loading={node === null} animated>
				<div slot="template" class={style['item-conter']}>
					<div class={style['item-header']}>
						<div style={{ flex: 1 }}>{props.title}</div>
						<Icon type="question-circle" style={{ fontSize: '18px', color: '#ff7b62' }}></Icon>
					</div>
					<Divider style={{ margin: 0 }} />
					<div style={{ ...flexColumn, height: '96px', padding: '12px', justifyContent: 'space-between' }}>
						<SkeletonItem style={{ width: '80%', height: '16px' }} />
						<SkeletonItem style={{ height: '16px' }} />
						<SkeletonItem style={{ height: '16px' }} />
					</div>
				</div>
				<div class={style['item-conter']}>
					<div class={style['item-header']}>
						<div style={{ flex: 1 }}>{props.title}</div>
						<Icon type="question-circle" style={{ fontSize: '18px', color: '#ff7b62' }}></Icon>
					</div>
					<Divider style={{ margin: 0 }} />
					<div class={style['item-body']}>
						<div style={{ flex: 1 }}>{props.total}</div>
						<Avatar size={48} src={props.cover}></Avatar>
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
						total: node?.cloud || 0,
						cover: require('@/assets/static/1638872128223.png')
					})}
				</div>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '文章',
						total: node?.article || 0,
						cover: require('@/assets/static/1638872128221.png')
					})}
				</div>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '标签',
						total: node?.source || 0,
						cover: require('@/assets/static/1638872128222.png')
					})}
				</div>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '收录',
						total: node?.minute || 0,
						cover: require('@/assets/static/1638872128224.png')
					})}
				</div>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '用户',
						total: node?.user || 0,
						cover: require('@/assets/static/1638872128220.png')
					})}
				</div>
			</div>
		)
	}
}
