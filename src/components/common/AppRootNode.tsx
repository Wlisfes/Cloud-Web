import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppRootNode extends Vue {
	protected render() {
		return <div class="root-node">{this.$slots.default}</div>
	}
}
