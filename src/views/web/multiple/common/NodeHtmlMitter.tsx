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
				codeStyle={this.codeStyle}
				value={this.content}
			></mavon-editor>
		)
	}
}
