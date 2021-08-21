import { Vue, Component } from 'vue-property-decorator'
import { Image } from 'element-ui'
import { AppAvatar, AppSearch } from '@/components/common'
import { nodeClientClouds } from '@/api'
import { HttpStatus, NodeCloud } from '@/types'
import style from '@/style/web/web.intense.module.less'

@Component
export default class Intense extends Vue {
	private rcmd: NodeCloud[] = []
	private dataSource: Array<{ name: string; id: number }> = []
	private loading: boolean = false

	protected created() {
		this.nodeClientClouds()
	}

	private onSubmit(value: string) {
		this.loading = true
		nodeClientClouds({ page: 1, size: 10, title: value })
			.then(({ code, data }) => {
				if (code === HttpStatus.OK) {
					this.dataSource = data.list.map(k => ({ name: k.title, id: k.id }))
				}
			})
			.catch(e => {})
			.finally(() => {
				this.loading = false
			})
	}

	/**音视频列表-客户端**/
	private async nodeClientClouds() {
		try {
			const { code, data } = await nodeClientClouds({ page: 1, size: 20 })
			if (code === HttpStatus.OK) {
				this.rcmd = data.list
			}
		} catch (e) {}
	}

	protected render() {
		return (
			<div class={style['app-conter']}>
				<AppSearch
					loading={this.loading}
					dataSource={this.dataSource}
					onChange={this.onSubmit}
					onSubmit={this.onSubmit}
				></AppSearch>

				<ul class={style['app-ul']}>
					{this.rcmd.map(k => (
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
			</div>
		)
	}
}
