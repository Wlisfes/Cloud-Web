import { Vue, Component } from 'vue-property-decorator'
import { AppSearch } from '@/components/common'
import { NodeMultiple } from '@/views/web/multiple/common'
import { nodeClientArticles, nodeSearchArticles } from '@/api'
import { HttpStatus, Client, NodeArticle } from '@/types'
import { intheEnd } from '@/utils/common'
import style from '@/style/web/web.multiple.module.less'

type ClientNode = {
	data: Array<{ id: number; value: string }>
	loading: boolean
}

@Component
export default class Multiple extends Vue {
	$refs!: { appSearch: AppSearch }

	private client: Client<Array<NodeArticle>, ClientNode> = {
		page: 1,
		size: 10,
		keyword: '',
		total: 0,
		loading: true,
		dataSource: [],
		node: {
			data: [],
			loading: false
		},
		initSource: (merge = false, page?: number, size?: number) => {
			return new Promise(async (resolve, rejcet) => {
				try {
					this.client.loading = true
					const { client } = this
					const { code, data } = await nodeClientArticles({
						page: page || client.page,
						size: size || client.size,
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
				this.client.size = 10
				this.client.initSource(true)
			}
		},
		onRefresh: () => {
			const size = this.client.dataSource.length
			this.client.initSource(false, 1, size > 10 ? size : 10)
		},
		onSearch: async value => {
			try {
				this.client.node.loading = true
				const { code, data } = await nodeSearchArticles({
					page: 1,
					size: 10,
					status: 1,
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
			this.client.page = 1
			this.$nextTick(() => {
				this.client.initSource().finally(() => {
					this.$refs.appSearch.onClose()
				})
			})
		}
	}

	private initSourceMore() {
		const initService = () => {
			this.client.onMore?.()
		}
		window.addEventListener('scroll', initService, false)
		this.$once('hook:beforeDestroy', () => {
			window.removeEventListener('scroll', initService, false)
		})
	}

	protected created() {
		this.client.initSource().finally(() => {
			this.client.onSearch?.('')
			this.initSourceMore()
		})
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
				<NodeMultiple
					total={client.total}
					loading={client.loading}
					dataSource={client.dataSource}
					onRefresh={this.client.onRefresh}
				></NodeMultiple>
			</div>
		)
	}
}
