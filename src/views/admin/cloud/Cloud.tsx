import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Cloud extends Vue {
	protected render() {
		return <div>Cloud</div>
	}
}
