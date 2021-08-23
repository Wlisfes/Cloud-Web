import { Vue, Component, Prop } from 'vue-property-decorator'
import { Spin, Empty } from 'ant-design-vue'
import { Image } from 'element-ui'
import { AppAvatar } from '@/components/common'
import { NodeCloud } from '@/types'
import style from '@/style/web/common/node.intense.cloud.module.less'

@Component
export default class NodeIntenseCloud extends Vue {
	@Prop({ type: Array, default: () => [] }) dataSource!: NodeCloud[]
	@Prop({ type: Boolean, default: true }) loading!: boolean
	@Prop({ type: Number, default: 0 }) total!: number

	protected render() {
		return (
			<div class={style['node-conter']}>
				{this.loading && this.dataSource.length === 0 ? (
					<Spin class="ant-spin-64"></Spin>
				) : !this.loading && this.dataSource.length === 0 ? (
					<Empty image={(Empty as any).PRESENTED_IMAGE_SIMPLE}></Empty>
				) : (
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<ul class={style['app-ul']}>
							{this.dataSource.map(k => (
								<li key={k.id} class={style['app-ul-li']}>
									<div class={style['app-ul-conter']}>
										<div class={style['app-cover']}>
											<router-link to={`/player/${k.id}`}>
												<div class={style['app-cover-conter']}>
													<Image
														class="app-image"
														alt={k.title}
														fit="cover"
														src={`${k.cover}?x-oss-process=style/resize-16-9`}
													></Image>
												</div>
											</router-link>
										</div>
										<div class={style['app-user']}>
											{false && (
												<AppAvatar
													class={style['app-user-avatar']}
													src={`${k.user.avatar}?x-oss-process=style/resize-1-1`}
													username={k.user.nickname}
													rounded={false}
													style={{ cursor: 'pointer', borderRadius: '50%' }}
												></AppAvatar>
											)}
											<div class={style['app-user-title']}>
												<div class="app-ellipsis-2">
													<a style={{ color: '#444444' }}>{k.title}</a>
												</div>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>

						{this.total > this.dataSource.length && (
							<Spin class="ant-spin-64" style={{ margin: '20px' }}></Spin>
						)}
					</div>
				)}
			</div>
		)
	}
}
