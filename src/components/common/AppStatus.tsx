import { Vue, Component, Prop } from 'vue-property-decorator'
import { Tag } from 'ant-design-vue'

@Component
export default class AppSatus extends Vue {
	@Prop({ type: Number, default: 0 }) status!: number

	protected render() {
		return this.status === 0 ? (
			<Tag style={{ margin: 0 }} color="pink">
				禁用
			</Tag>
		) : this.status === 1 ? (
			<Tag style={{ margin: 0 }} color="green">
				启用
			</Tag>
		) : null
	}
}
