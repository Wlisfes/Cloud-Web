import { Vue, Component } from 'vue-property-decorator'
import { NodePartner } from '@/views/web/partner/common'
import { nodeClientPartners } from '@/api'
import { HttpStatus, Source, PartnerResponse } from '@/types'
import style from '@/style/web/web.partner.module.less'

@Component
export default class Partner extends Vue {
	private source: Source<Array<PartnerResponse>> = {
		column: [],
		page: 1,
		size: 10,
		total: 0,
		sizeOption: [],
		showSize: true,
		loading: true,
		dataSource: [],
		initSource: async () => {
			try {
				this.source.loading = true
				const { source } = this
				const { code, data } = await nodeClientPartners({
					page: source.page,
					size: source.size
				})
				if (code === HttpStatus.OK) {
					this.source.total = data.total
					this.source.dataSource = data.list
				}
			} catch (e) {}
			this.source.onClose()
		},
		onClose: () => {
			this.source.loading = false
		},
		onReset: () => {
			this.source.page = 1
			this.source.size = 10
			this.source.total = 0
			this.source.initSource()
		}
	}

	protected created() {
		this.source.initSource()
	}

	protected render() {
		const { source } = this
		return (
			<div class={style['app-conter']}>
				<NodePartner dataSource={source.dataSource}></NodePartner>
			</div>
		)
	}
}
