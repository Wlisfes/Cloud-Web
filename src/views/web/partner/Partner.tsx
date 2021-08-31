import { Vue, Component } from 'vue-property-decorator'
import { NodePartner } from '@/views/web/partner/common'
import style from '@/style/web/web.partner.module.less'

@Component
export default class Partner extends Vue {
	protected render() {
		return (
			<div class={style['app-conter']}>
				<NodePartner></NodePartner>
			</div>
		)
	}
}
