import { Vue, Component, Prop } from 'vue-property-decorator'
import { AliyunOSSModule } from '@/utils/aliyun-oss'
import { nodeOssSts } from '@/api'
import { HttpStatus } from '@/types'

@Component
export default class AppEditor extends Vue {
	$refs!: { editor: any }

	@Prop({ type: String, default: '' }) content!: string
	@Prop({ type: String, default: 'preview' }) defaultOpen!: string
	@Prop({ type: Number, default: 680 }) height!: number

	private full: boolean = false

	private get editorStyle() {
		return { height: this.full ? '100%' : `${this.height}px`, zIndex: this.full ? 1500 : 98 }
	}

	private onChange(content: string, html: string) {
		this.$emit('change', { content, html })
	}

	private async onImageCreate(index: number, file: File) {
		try {
			const { code, data } = await nodeOssSts()
			if (code === HttpStatus.OK) {
				const oss = new AliyunOSSModule({
					accessKeyId: data.accessKeyId,
					accessKeySecret: data.accessKeySecret,
					stsToken: data.stsToken,
					refreshSTSToken: async () => {
						const response = await nodeOssSts()
						return {
							accessKeyId: response.data.accessKeyId,
							accessKeySecret: response.data.accessKeySecret,
							stsToken: response.data.stsToken
						}
					}
				})
				const name = file.name.split('.').pop()?.toLowerCase() || 'jpg'
				const buffer = await oss.Buffer(file)
				const key = oss.create(name, 'upload')
				const response = await oss.client.put(key, buffer)
				if (response.res.status === HttpStatus.OK) {
					this.$refs.editor.$img2Url(index, `${data.path}/${response.name}`)
				}
			}
		} catch (e) {}
	}

	protected render() {
		return (
			<mavon-editor
				class="node-html"
				ref="editor"
				ishljs={true}
				autofocus={false}
				defaultOpen={this.defaultOpen}
				style={this.editorStyle}
				codeStyle="atom-one-dark"
				tabSize={null}
				value={this.content}
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
				onChange={this.onChange}
				onImgAdd={this.onImageCreate}
				onFullScreen={(full: boolean) => (this.full = full)}
			></mavon-editor>
		)
	}
}
