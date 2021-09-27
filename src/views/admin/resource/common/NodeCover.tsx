import { Vue, Component, Prop } from 'vue-property-decorator'
import { Image } from 'element-ui'

@Component
export default class NodeCover extends Vue {
	@Prop({ type: String }) url!: string
	@Prop({ type: Number, default: 1 }) type!: number

	private get useStyle() {
		switch (this.type) {
			case 1:
			case 2:
				return { width: '54px', height: '54px' }
			case 3:
				return { width: '96px', height: '54px' }
			default:
				return { width: '54px', height: '54px' }
		}
	}

	protected render() {
		return (
			<Image
				fit="cover"
				src={`${this.url}?x-oss-process=style/resize`}
				style={{ ...this.useStyle, cursor: 'pointer' }}
			></Image>
		)
	}
}
