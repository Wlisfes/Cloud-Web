import { Vue, Component, Prop } from 'vue-property-decorator'
import { Timeline, TimelineItem, Card } from 'element-ui'
import { NodePartnerCover } from '@/views/web/partner/common'
import style from '@/style/web/common/node.partner.module.less'

@Component
export default class NodePartner extends Vue {
	protected render() {
		return (
			<div class={style['app-conter']}>
				<Timeline>
					<TimelineItem timestamp="2018/4/14" hide-timestamp>
						<Card>
							<h4>更新 Github 模板</h4>
							<p>王小虎 提交于 2018/4/12 20:46</p>
						</Card>
					</TimelineItem>
					<TimelineItem timestamp="2018/4/13" hide-timestamp>
						<Card>
							<h4>更新 Github 模板</h4>
							<NodePartnerCover dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}></NodePartnerCover>
						</Card>
					</TimelineItem>
					<TimelineItem timestamp="2018/4/12" hide-timestamp>
						<Card>
							<h4>初次发布v1.0</h4>
							<p>王小虎 提交于 2018/4/12 20:46</p>
						</Card>
					</TimelineItem>
				</Timeline>
			</div>
		)
	}
}
