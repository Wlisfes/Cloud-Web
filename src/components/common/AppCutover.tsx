import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AppCutover extends Vue {
	@Prop({ type: Number, default: 0 }) status!: number

	protected render() {
		return this.status === 1 ? (
			<span style={{ color: '#eb2f96' }}>禁用</span>
		) : this.status === 0 ? (
			<span style={{ color: '#52c41a' }}>启用</span>
		) : null
	}
}
