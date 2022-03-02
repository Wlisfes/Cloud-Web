import { Vue, Component } from 'vue-property-decorator'
import { NodePartner } from '@/views/web/partner/common'
import { nodeClientPartners } from '@/api'
import { HttpStatus, Source, PartnerResponse } from '@/types'
import { intheEnd } from '@/utils/common'
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
		initSource: async (merge = false, page?: number, size?: number) => {
			try {
				this.source.loading = true
				const { source } = this
				const { code, data } = await nodeClientPartners({
					page: page || source.page,
					size: size || source.size
				})
				if (code === HttpStatus.OK) {
					if (merge) {
						this.source.dataSource = this.source.dataSource.concat(data.list)
					} else {
						this.source.dataSource = data.list
					}
					this.source.total = data.total
				}
			} catch (e) {}
			return this.source.onClose()
		},
		onClose: () => {
			this.source.loading = false
		},
		onReset: () => {
			this.source.page = 1
			this.source.size = 10
			this.source.total = 0
			this.source.initSource()
		},
		onMore: () => {
			const { source } = this
			const { end } = intheEnd()
			if (!source.loading && end && source.total > source.dataSource.length) {
				this.source.page++
				this.source.initSource(true)
			}
		}
	}

	private initSourceMore() {
		const initService = () => {
			this.source.onMore?.()
		}
		window.addEventListener('scroll', initService, false)
		this.$once('hook:beforeDestroy', () => {
			window.removeEventListener('scroll', initService, false)
		})
	}

	protected created() {
		this.source.initSource().finally(() => {
			this.initSourceMore()
		})
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
