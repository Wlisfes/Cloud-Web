import { Vue, Component } from 'vue-property-decorator'
import { Button } from 'ant-design-vue'

@Component
export default class Home extends Vue {
	protected render() {
		return (
			<div>
				<h1>Home</h1>
				<Button>Share</Button>
			</div>
		)
	}
}
