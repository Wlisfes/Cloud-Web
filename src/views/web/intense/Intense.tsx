import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Image } from 'element-ui'
import { NodeRoot, NodeHeader } from '@/components/web'
import { nodeClouds } from '@/api'
import { HttpStatus, NodeBanner, NodeCloud } from '@/types'
import style from '@/style/web/web.intense.module.less'

@Component
export default class Intense extends Vue {
	@Getter('banner/current') current!: NodeBanner
	private clouds: NodeCloud[] = []

	protected created() {
		this.nodeClouds()
	}

	/**音视频列表**/
	private async nodeClouds() {
		try {
			const { code, data } = await nodeClouds({ page: 1, size: 10 })
			if (code === HttpStatus.OK) {
				this.clouds = data.list
			}
		} catch (e) {}
	}

	protected render() {
		return (
			<NodeRoot mask cover={this.current?.cover}>
				<NodeHeader slot="header"></NodeHeader>
				<div slot="content" class={style['app-conter']}>
					{this.clouds.length > 0 && (
						<ul class={style['app-ul']}>
							{this.clouds.map(k => (
								<li key={k.id} class={style['app-ul-li']}>
									<div class={style['app-cover']}>
										<Image
											alt={k.title}
											fit="cover"
											src={`${k.cover}?x-oss-process=style/resize-16-9`}
										></Image>
									</div>
									<div class={style['app-footer']}>{k.title}</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</NodeRoot>
		)
	}
}
