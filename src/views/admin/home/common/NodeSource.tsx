import { Vue, Component } from 'vue-property-decorator'
import { Icon, Divider, Avatar } from 'ant-design-vue'
import style from '@/style/admin/admin.home.module.less'

@Component
export default class NodeSource extends Vue {
	private useSource(node: { title: string; total: number; cover: string }) {
		return (
			<div class={style['item-conter']}>
				<div class={style['item-header']}>
					<div style={{ flex: 1 }}>{node.title}</div>
					<Icon type="question-circle" style={{ fontSize: '18px', color: '#ff7b62' }}></Icon>
				</div>
				<Divider style={{ margin: 0 }} />
				<div class={style['item-body']}>
					<div style={{ flex: 1 }}>{node.total}</div>
					<Avatar size={48} src={node.cover}></Avatar>
				</div>
			</div>
		)
	}

	protected render() {
		return (
			<div class={style['node-source']}>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '用户',
						total: 3,
						cover: require('@/assets/static/1638872128220.png')
					})}
				</div>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '文章',
						total: 6,
						cover: require('@/assets/static/1638872128221.png')
					})}
				</div>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '标签',
						total: 33,
						cover: require('@/assets/static/1638872128222.png')
					})}
				</div>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '媒体',
						total: 30,
						cover: require('@/assets/static/1638872128223.png')
					})}
				</div>
				<div class={style['node-source-item']}>
					{this.useSource({
						title: '收录',
						total: 12,
						cover: require('@/assets/static/1638872128224.png')
					})}
				</div>
			</div>
		)
	}
}
