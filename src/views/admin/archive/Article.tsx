import { Vue, Component } from 'vue-property-decorator'
import { AppRootNode } from '@/components/common'
import style from '@/style/admin/admin.article.module.less'
import marked from 'marked'
import hljs from 'highlight.js'
Vue.directive('highlight', function (el) {
	let blocks = el.querySelectorAll('pre code')
	blocks.forEach((block: any) => {
		hljs.highlightBlock(block)
	})
})

@Component
export default class Article extends Vue {
	private value: string = ''
	private html: string = ''

	protected mounted() {}

	private onChange(value: string) {
		this.value = value
		this.html = marked(value)
	}

	protected render() {
		return (
			<AppRootNode class={style['app-conter']}>
				<div v-highlight domPropsInnerHTML={this.html}></div>
				<mavon-editor
					ishljs={true}
					codeStyle="atom-one-dark"
					tab-size={2}
					value={this.value}
					onChange={this.onChange}
				></mavon-editor>
			</AppRootNode>
		)
	}
}
