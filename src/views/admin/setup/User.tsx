import { Vue, Component } from 'vue-property-decorator'

@Component
export default class User extends Vue {
	protected render() {
		return <div>User</div>
	}
}
