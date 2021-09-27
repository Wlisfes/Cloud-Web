import { Vue, Component, Prop } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
import { Image } from 'element-ui'
import { AppCropper, AppPoster } from '@/components/common'
import style from '@/style/common/node.app.cover.module.less'

interface NodeCover {
	id: number
	type: number
	url: string
	path: string
}

interface NodeProps {
	id: number
	type: number
	name: string
	path: string
}

@Component
export default class NodeAppCover extends Vue {
	$refs!: { appCropper: AppCropper; appPoster: AppPoster }

	@Prop({ type: Array, default: () => [] }) dataSource!: NodeCover[]
	@Prop({ type: String, default: '?x-oss-process=style/resize' }) resize!: string
	@Prop({ type: Number, default: 1 }) ratio!: number
	@Prop({ type: String, default: 'avatar' }) path!: 'avatar' | 'upload' | 'cover' | 'photo'

	/**图片上传回调**/
	private onSubmit(props: NodeProps) {
		this.$emit('submit', {
			id: props.id,
			type: props.type,
			url: props.path,
			path: props.name
		})
	}

	protected render() {
		return (
			<div class={style['node-cover']}>
				<AppPoster ref="appPoster" onSubmit={(props: any) => this.$emit('submit', props)}></AppPoster>
				<AppCropper
					ref="appCropper"
					ratio={this.ratio}
					path={this.path}
					onChange={() => this.$refs.appPoster.init()}
					onSubmit={this.onSubmit}
				></AppCropper>

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
							</div>
						</div>
					</div>
				))}
				<div class={style['node-cover-pointer']}>
					<div class={style['node-pointer']}>
						<div class={style['node-pointer-conter']}>
							<div class={style['node-cover-conter']} onClick={() => this.$refs.appCropper.upload()}>
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
}
