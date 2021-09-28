import { Vue, Component, Prop } from 'vue-property-decorator'
import { Timeline, TimelineItem, Card } from 'element-ui'
import { AppAvatar } from '@/components/common'
import { NodePartnerCover } from '@/views/web/partner/common'
import { PartnerResponse } from '@/types'
import style from '@/style/web/common/node.partner.module.less'

@Component
export default class NodePartner extends Vue {
	@Prop({ type: Array, default: () => [] }) dataSource!: PartnerResponse[]

	protected render() {
		return (
			<div class={style['app-conter']}>
				<Timeline>
					{this.dataSource.map(k => (
						<TimelineItem key={k.id} timestamp={k.createTime} hide-timestamp>
							<Card>
								<h4 class={style['node-title']}>{k.title}</h4>
								<div class={style['node-user']}>
									<div class={style['node-user-avatar']}>
										<AppAvatar
											size={32}
											src={`${k.user.avatar}?x-oss-process=style/resize-1-1`}
											username={k.user.nickname}
											rounded={false}
											style={{ cursor: 'pointer', borderRadius: '50%' }}
										></AppAvatar>
									</div>
									<div class={style['node-user-pointer']}>
										<div>{k.user.nickname}</div>
										<div>{k.createTime}</div>
									</div>
								</div>
								<div class="node-html markdown-body" ref="html" domPropsInnerHTML={k.html}></div>
								<NodePartnerCover dataSource={k.cover}></NodePartnerCover>
							</Card>
						</TimelineItem>
					))}
				</Timeline>
			</div>
		)
	}
}
