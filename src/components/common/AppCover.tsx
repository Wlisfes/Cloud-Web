import { Vue, Component, Prop } from 'vue-property-decorator'
import { Icon, Avatar } from 'ant-design-vue'
import { AppCropper } from '@/components/common'
import style from '@/style/common/app.cover.module.less'

@Component
export default class AppCover extends Vue {
	$refs!: { appCropper: AppCropper }

	@Prop({ type: String }) cover!: string

	private visible: boolean = false

	protected render() {
		return (
			<div class={style['app-cover']}>
				<AppCropper ref="appCropper" onSubmit={(props: any) => this.$emit('submit', props)}></AppCropper>
				{this.cover ? (
					<div class={style['app-cover-avatar']} onClick={() => this.$refs.appCropper.upload(this.cover)}>
						<Avatar size={100} shape="square" src={`${this.cover}?x-oss-process=style/resize`}>
							妖雨纯
						</Avatar>
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
