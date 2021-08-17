import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Image } from 'element-ui'
import { NodeRoot, NodeHeader } from '@/components/web'
import { AppAvatar } from '@/components/common'
import { nodeRcmdCloud } from '@/api'
import { HttpStatus, NodeBanner, NodeCloud } from '@/types'
import style from '@/style/web/web.intense.module.less'

@Component
export default class Intense extends Vue {
	@Getter('banner/current') current!: NodeBanner
	private rcmd: NodeCloud[] = []

	protected created() {
		this.nodeRcmdCloud()
	}

	/**每日推荐**/
	private async nodeRcmdCloud() {
		try {
			const { code, data } = await nodeRcmdCloud()
			if (code === HttpStatus.OK) {
				this.rcmd = data.list
			}
		} catch (e) {}
	}

	protected render() {
		return (
			<NodeRoot mask cover={this.current?.cover}>
				<NodeHeader slot="header"></NodeHeader>
				<div slot="content" class={style['app-conter']}>
					{this.rcmd.length > 0 && (
						<ul class={style['app-ul']}>
							{this.rcmd.map(k => (
								<li key={k.id} class={style['app-ul-li']}>
									<div class={style['app-ul-conter']}>
										<div class={style['app-cover']}>
											<div class={style['app-cover-conter']}>
												<Image
													class="app-image"
													alt={k.title}
													fit="cover"
													src={`${k.cover}?x-oss-process=style/resize-16-9`}
												></Image>
											</div>
										</div>
										<div class={style['app-user']}>
											<AppAvatar
												class={style['app-user-avatar']}
												src={`${k.user.avatar}?x-oss-process=style/resize-1-1`}
												username={k.user.nickname}
												rounded={false}
												style={{ cursor: 'pointer', borderRadius: '50%' }}
											></AppAvatar>
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
					)}
				</div>
			</NodeRoot>
		)
	}
}
