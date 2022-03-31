import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class NodeHtmlMitter extends Vue {
	@Prop({ type: String, default: '' }) content!: string
	@Prop({ type: String, default: 'atom-one-dark' }) codeStyle!: string

	protected render() {
		return (
			<mavon-editor
				subfield={false}
				toolbarsFlag={false}
				autofocus={false}
				shortCut={false}
				boxShadow={false}
				defaultOpen="preview"
				externalLink={{
					markdown_css: () => {
						return `https://cdn.jsdelivr.net/npm/mavon-editor@2.10.4/dist/markdown/github-markdown.min.css`
					},
					hljs_js: () => {
						return `https://cdn.jsdelivr.net/npm/mavon-editor@2.10.4/dist/highlightjs/highlight.min.js`
					},
					hljs_css: (css: string) => {
						return `https://cdn.jsdelivr.net/npm/mavon-editor@2.10.4/dist/highlightjs/styles/${css}.min.css`
					},
					hljs_lang: (lang: string) => {
						return `https://cdn.jsdelivr.net/npm/mavon-editor@2.10.4/dist/highlightjs/languages/${lang}.min.js`
					},
					katex_css: () => {
						return `https://cdn.jsdelivr.net/npm/mavon-editor@2.10.4/dist/katex/katex.min.css`
					},
					katex_js: () => {
						return `https://cdn.jsdelivr.net/npm/mavon-editor@2.10.4/dist/katex/katex.min.js`
					}
				}}
				codeStyle={this.codeStyle}
				value={this.content}
			></mavon-editor>
		)
	}
}
