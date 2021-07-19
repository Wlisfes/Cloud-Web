import { Vue, Component } from 'vue-property-decorator'
import { Button } from 'ant-design-vue'

@Component
export default class Home extends Vue {
	protected created() {
		const ajs = document.getElementsByTagName('script')[0]
		if (!document.querySelector('#tumblr-js')) {
			const js = document.createElement('script')
			js.id = 'tumblr-js'
			js.src = 'https://assets.tumblr.com/share-button.js'
			ajs.parentNode?.insertBefore(js, ajs)
		}
	}

	private onClick() {
		// (function (d, s, id) {
		// 	var js,
		// 		ajs = d.getElementsByTagName(s)[0]
		// 	if (!d.getElementById(id)) {
		// 		js = d.createElement(s)
		// 		js.id = id
		// 		js.src = 'https://assets.tumblr.com/share-button.js'
		// 		ajs.parentNode.insertBefore(js, ajs)
		// 	}
		// })(document, 'script', 'tumblr-js')
	}

	protected render() {
		return (
			<div>
				<h1>Home</h1>
				<a
					class="tumblr-share-button"
					data-color="white"
					data-notes="right"
					href="https://embed.tumblr.com/share"
				>
					Share
				</a>
				<Button onClick={this.onClick}>Share</Button>
			</div>
		)
	}
}
