import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AppEditor extends Vue {
	@Prop({ type: String, default: '' }) content!: string

	private full: boolean = false

	private get editorStyle() {
		return { height: this.full ? '100%' : '680px', zIndex: this.full ? 1500 : 98 }
	}

	private onChange(content: string, html: string) {
		this.$emit('change', { content, html })
	}

	protected render() {
		return (
			<mavon-editor
				autofocus={false}
				style={this.editorStyle}
				codeStyle="atom-one-dark"
				tabSize={null}
				value={this.content}
				onChange={this.onChange}
				onFullScreen={(full: boolean) => (this.full = full)}
			></mavon-editor>
		)
	}
}
