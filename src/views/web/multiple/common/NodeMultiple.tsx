import { Vue, Component, Prop } from 'vue-property-decorator'
import { Spin, Icon } from 'ant-design-vue'
import { Empty, Skeleton } from 'element-ui'
import { RootArticle } from '@/views/web/multiple/common'
import { NodeArticle } from '@/types'
import style from '@/style/web/common/node.multiple.module.less'

@Component
export default class NodeMultiple extends Vue {
	@Prop({ type: Array, default: () => [] }) dataSource!: NodeArticle[]
	@Prop({ type: Boolean, default: true }) loading!: boolean
	@Prop({ type: Number, default: 0 }) total!: number

	protected render() {
		return (
			<div class={style['app-conter']}>
				<Skeleton
					loading={this.loading && this.dataSource.length === 0}
					animated
					class={style['node-skeleton']}
				>
					<div slot="template" class={style['node-conter']}>
						<RootArticle node={null}></RootArticle>
						<RootArticle node={null}></RootArticle>
						<RootArticle node={null}></RootArticle>
					</div>
					<div>
						{this.dataSource.length > 0 ? (
							<div class={style['node-conter']}>
								{this.dataSource.map(item => (
									<RootArticle key={item.id} node={item}></RootArticle>
								))}
								{this.total > this.dataSource.length && (
									<div class={style['node-conter-more']}>
										<Spin
											indicator={<Icon spin type="loading" style={{ fontSize: '42px' }} />}
										></Spin>
									</div>
								)}
							</div>
						) : !this.loading && this.dataSource.length === 0 ? (
							<div class={style['node-empty']}>
								<Empty image={require('@/assets/icon/1629789570141.png')}></Empty>
							</div>
						) : null}
					</div>
				</Skeleton>
			</div>
		)
	}
}
