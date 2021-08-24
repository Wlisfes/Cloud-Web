import { Vue, Component } from 'vue-property-decorator'
import { AppSearch } from '@/components/common'
import { NodeIntenseCloud } from '@/views/web/intense/common'
import { nodeClientClouds } from '@/api'
import { HttpStatus, Client, NodeCloud } from '@/types'
import { intheEnd } from '@/utils/common'
import style from '@/style/web/web.intense.module.less'

type ClientNode = {
	data: Array<{ id: number; value: string }>
	loading: boolean
}

@Component
export default class Intense extends Vue {
	$refs!: { appSearch: AppSearch }

	private client: Client<Array<NodeCloud>, ClientNode> = {
		page: 1,
		size: 12,
		keyword: '',
		total: 0,
		loading: true,
		dataSource: [],
		node: {
			data: [],
			loading: false
		},
		initSource: (merge = false) => {
			return new Promise(async (resolve, rejcet) => {
				try {
					this.client.loading = true
					const { client } = this
					const { code, data } = await nodeClientClouds({
						page: client.page,
						size: client.size,
						title: client.keyword
					})
					if (code === HttpStatus.OK) {
						if (merge) {
							this.client.dataSource = this.client.dataSource.concat(data.list)
						} else {
							this.client.dataSource = data.list
						}
						this.client.total = data.total
						resolve(data)
					}
				} catch (e) {
					rejcet(e)
				}
				this.client.onClose()
			})
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
		},
		onSearch: async value => {
			try {
				this.client.node.loading = true
				const { code, data } = await nodeClientClouds({
					page: 1,
					size: 10,
					title: value
				})
				if (code === HttpStatus.OK) {
					this.client.node.data = data.list.map(k => ({ id: k.id, value: k.title }))
					this.client.node.loading = false
				}
			} catch (error) {
				this.client.node.loading = false
			}
		},
		onChange: async ({ value, reset }) => {
			this.client.keyword = value
			this.$nextTick(() => {
				if (reset) {
					this.client.onSubmit?.()
				}
				this.client.onSearch?.(value)
			})
		},
		onSubmit: () => {
			this.client.initSource().finally(() => {
				this.$refs.appSearch.onClose()
			})
		}
	}

	protected created() {
		setTimeout(() => this.client.initSource(), 1500)
	}

	protected mounted() {
		window.addEventListener('scroll', this.client.onMore as any, false)
	}

	protected render() {
		const { client } = this
		return (
			<div class={style['app-conter']}>
				<AppSearch
					ref="appSearch"
					dataSource={client.node.data}
					loading={client.node.loading}
					onChange={client.onChange}
					onSubmit={client.onSubmit}
				></AppSearch>
				<NodeIntenseCloud
					total={client.total}
					loading={client.loading}
					dataSource={client.dataSource}
				></NodeIntenseCloud>
			</div>
		)
	}
}
