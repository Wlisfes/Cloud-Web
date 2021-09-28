import { Vue, Component, Prop } from 'vue-property-decorator'
import { Timeline, TimelineItem, Card } from 'element-ui'
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
						<TimelineItem key={k.id} timestamp="2018/4/12" hide-timestamp>
							<Card>
								<h4 class={style['node-title']}>{k.title}</h4>
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
