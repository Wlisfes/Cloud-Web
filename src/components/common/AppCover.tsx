import { Vue, Component, Prop } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
import { Image } from 'element-ui'
import { NodePoster } from '@/types'
import { init as initCropper } from '@/components/instance/init-cropper'
import { init as initPoster } from '@/components/instance/init-poster'
import style from '@/style/common/app.cover.module.less'

@Component
export default class AppCover extends Vue {
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
				initPoster().then(e => {
					e.$once('close', (done: Function) => done())
					e.$on('submit', ({ props, done }: { props: NodePoster; done: Function }) => {
						this.$emit('submit', { id: props.id, type: props.type, name: props.path, path: props.url })
						done()
					})
				})
			})
			node.$once('submit', ({ props, done }: { props: NodePoster; done: Function }) => {
				this.$emit('submit', props)
				done()
			})
		})
	}

	protected render() {
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
