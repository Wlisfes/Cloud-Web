import { Vue, Component } from 'vue-property-decorator'
import { AppRootNode } from '@/components/common'
import { Editor } from '@bytemd/vue'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import zh_Hans from 'bytemd/lib/locales/zh_Hans.json'
import style from '@/style/admin/admin.article.module.less'

const plugins = [gfm(), highlight()]
@Component
export default class Article extends Vue {
	private value: string = ''
	private plugins = plugins
	private locale = zh_Hans

	private onChange(value: string) {
		this.value = value
	}

	protected render() {
		return (
			<AppRootNode>
				<Editor
					class="app-editor"
					value={this.value}
					plugins={this.plugins}
					locale={this.locale}
					onChange={this.onChange}
				></Editor>
			</AppRootNode>
		)
	}
}
