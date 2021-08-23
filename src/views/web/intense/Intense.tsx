import { Vue, Component } from 'vue-property-decorator'
import { AppSearch } from '@/components/common'
import { NodeIntenseCloud } from '@/views/web/intense/common'
import { nodeClientClouds } from '@/api'
import { HttpStatus, Client, NodeCloud } from '@/types'
import { intheEnd } from '@/utils/common'
import style from '@/style/web/web.intense.module.less'

@Component
export default class Intense extends Vue {
	private client: Client<Array<NodeCloud>> = {
		page: 1,
		size: 16,
		total: 0,
		loading: true,
		dataSource: [],
		initSource: async (merge = false) => {
			try {
				this.client.loading = true
				const { client } = this
				const { code, data } = await nodeClientClouds({
					page: client.page,
					size: client.size
				})
				if (code === HttpStatus.OK) {
					if (merge) {
						this.client.dataSource = this.client.dataSource.concat(data.list)
					} else {
						this.client.dataSource = data.list
					}
					this.client.total = data.total
				}
			} catch (e) {}
			this.client.onClose()
		},
		onClose: () => {
			this.client.loading = false
		},
		onMore: () => {
			const { client } = this
			const { end } = intheEnd()
			if (!client.loading && end && client.total > client.dataSource.length) {
				this.client.page++
				this.client.initSource(true)
			}
		}
	}

	protected created() {
		setTimeout(() => {
			this.client.initSource()
		}, 1000)
	}

	protected mounted() {
		window.addEventListener('scroll', this.client.onMore as any, false)
	}

	private onSubmit(value: string) {}

	protected render() {
		const { client } = this
		return (
			<div class={style['app-conter']}>
				<AppSearch onChange={this.onSubmit} onSubmit={this.onSubmit}></AppSearch>
				<NodeIntenseCloud dataSource={client.dataSource}></NodeIntenseCloud>
			</div>
		)
	}
}
