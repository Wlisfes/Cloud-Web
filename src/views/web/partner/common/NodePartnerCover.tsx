import { Vue, Component, Prop } from 'vue-property-decorator'
import { Image, SkeletonItem } from 'element-ui'
import { NodePoster } from '@/types'
import style from '@/style/web/common/node.partner.module.less'

@Component
export default class NodeCover extends Vue {
	@Prop({ type: Array, default: () => [] }) dataSource!: NodePoster[]

	private createCover(cover: string): JSX.Element {
		return (
			<Image class={style['node-cover-image']} lazy fit="cover" src={cover}>
				<SkeletonItem
					slot="placeholder"
					variant="image"
					style={{ width: '100%', height: '100%' }}
				></SkeletonItem>
				<SkeletonItem slot="error" variant="image" style={{ width: '100%', height: '100%' }}></SkeletonItem>
			</Image>
		)
	}

	protected render() {
		if (this.dataSource.length === 0) {
			return null
		}
		return (
			<ul class={style['node-cover']}>
				{this.dataSource.map((k, index) => {
					return index < 8 ? (
						<li key={index} class={style['node-cover-item']}>
							<div class={style['pic-conter']}>
								<div class={style['pic-conter-content']}>
									{this.createCover(`${k.url}?x-oss-process=style/resize`)}
								</div>
							</div>
						</li>
					) : index === 8 ? (
						<li key={index} class={style['node-cover-item']}>
							<div class={style['pic-conter']}>
								<div class={style['pic-conter-content']}>
									{this.createCover(`${k.url}?x-oss-process=style/resize`)}
								</div>
							</div>
						</li>
					) : null
				})}
			</ul>
		)
	}
}
