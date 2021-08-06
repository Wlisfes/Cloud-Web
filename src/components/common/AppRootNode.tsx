import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppRootNode extends Vue {
	protected render() {
		return (
			<div class="root-node">
				<div class="root-node-conter">{this.$slots.default}</div>
			</div>
		)
	}
}
