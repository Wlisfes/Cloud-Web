import { Vue, Component, Prop } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
import { Image } from 'element-ui'
import { NodePoster } from '@/types'
import { init as initCropper } from '@/components/instance/init-cropper'
import { init as initPoster } from '@/components/instance/init-poster'
import style from '@/style/common/app.cover.module.less'

@Component
export default class AppCover extends Vue {
	@Prop({ type: Boolean, default: false }) multiple!: boolean
	@Prop({ type: Array, default: () => [] }) dataSource!: Array<NodePoster>
	@Prop({ type: String }) cover!: string
	@Prop({ type: String, default: '?x-oss-process=style/resize' }) resize!: string
	@Prop({ type: Number, default: 1 }) ratio!: number
	@Prop({ type: String, default: 'avatar' }) path!: 'avatar' | 'upload' | 'cover' | 'photo'

	private onInitCropper() {
		initCropper({
			cover: this.cover,
			path: this.path,
			ratio: this.ratio
		}).then(node => {
			node.$once('close', (done: Function) => done())
			node.$once('change', (done: Function) => {
				done()
				initPoster({ multiple: this.multiple }).then(e => {
					e.$once('close', (done: Function) => done())
					e.$on('submit', ({ props, done }: { props: NodePoster; done: Function }) => {
						if (this.multiple && Array.isArray(props)) {
							const poster = props.map(item => ({ ...item, name: item.path, path: item.url }))
							this.$emit('submit', poster)
						} else {
							this.$emit('submit', { ...props, name: props.path, path: props.url })
						}
						done()
					})
				})
			})
			node.$once('submit', ({ props, done }: { props: NodePoster; done: Function }) => {
				this.$emit('submit', { ...props, name: props.path, path: props.url })
				done()
			})
		})
	}

	/**图片删除回调**/
	public onDelete(current: number) {
		this.$emit('delete', current)
	}

	protected render() {
		if (this.multiple) {
			/**多张图片列表**/
			return (
				<div class={style['node-cover']}>
					{this.dataSource.map((k, index) => (
						<div key={index} class={style['node-cover-pointer']}>
							<div class={style['node-pointer']}>
								<div class={style['node-pointer-conter']}>
									<div class={style['node-cover-avatar']}>
										<Image
											fit="cover"
											style={{ width: '100%', height: '100%' }}
											src={`${k.url + this.resize}`}
										></Image>
									</div>
									<div class={style['node-pointer-delete']} onClick={() => this.onDelete(index)}>
										<Icon type="close" style={{ fontSize: '16px', color: 'red' }}></Icon>
									</div>
								</div>
							</div>
						</div>
					))}
					<div class={style['node-cover-pointer']}>
						<div class={style['node-pointer']}>
							<div class={style['node-pointer-conter']}>
								<div class={style['node-cover-conter']} onClick={this.onInitCropper}>
									<Icon
										style={{ fontSize: '28px', color: '#afafaf', transition: 'all 300ms' }}
										type="upload"
									></Icon>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
		return (
			<div class={style['app-cover']}>
				{this.cover ? (
					<div class={style['app-cover-avatar']} onClick={this.onInitCropper}>
						<Image
							fit="cover"
							style={{ width: '100px', height: '100px' }}
							src={`${this.cover}${this.resize}`}
						></Image>
					</div>
				) : (
					<div class={style['app-cover-conter']} onClick={this.onInitCropper}>
						<Icon
							style={{ fontSize: '28px', color: '#afafaf', transition: 'all 300ms' }}
							type="upload"
						></Icon>
					</div>
				)}
			</div>
		)
	}
}
