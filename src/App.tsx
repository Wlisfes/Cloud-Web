import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
	render() {
		return (
			<div id="app" style={{ height: '100%' }}>
				<router-view></router-view>
			</div>
		)
	}
}
