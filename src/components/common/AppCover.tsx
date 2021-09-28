import { Vue, Component, Prop } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
import { Image } from 'element-ui'
import { AppCropper, AppPoster } from '@/components/common'
import { NodePoster } from '@/types'
import style from '@/style/common/app.cover.module.less'

@Component
export default class AppCover extends Vue {
	$refs!: { appCropper: AppCropper; appPoster: AppPoster }

	@Prop({ type: String }) cover!: string
	@Prop({ type: String, default: '?x-oss-process=style/resize' }) resize!: string
	@Prop({ type: Number, default: 1 }) ratio!: number
	@Prop({ type: String, default: 'avatar' }) path!: 'avatar' | 'upload' | 'cover' | 'photo'

	protected render() {
		return (
			<div class={style['app-cover']}>
				<AppPoster
					ref="appPoster"
					onSubmit={(props: NodePoster) => {
						this.$emit('submit', { id: props.id, type: props.type, name: props.path, path: props.url })
					}}
				></AppPoster>
				<AppCropper
					ref="appCropper"
					ratio={this.ratio}
					path={this.path}
					onChange={() => this.$refs.appPoster.init()}
					onSubmit={(props: any) => this.$emit('submit', props)}
				></AppCropper>
				{this.cover ? (
					<div class={style['app-cover-avatar']} onClick={() => this.$refs.appCropper.upload(this.cover)}>
						<Image
							fit="cover"
							style={{ width: '100px', height: '100px' }}
							src={`${this.cover}${this.resize}`}
						></Image>
					</div>
				) : (
					<div class={style['app-cover-conter']} onClick={() => this.$refs.appCropper.upload()}>
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
