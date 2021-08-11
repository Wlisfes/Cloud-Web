import { Vue, Component } from 'vue-property-decorator'
import { AppRootNode } from '@/components/common'
import style from '@/style/admin/admin.article.common.module.less'

@Component
export default class Create extends Vue {
	private value: string = ''

	protected mounted() {}

	private onChange(value: string) {
		this.value = value
	}

	protected render() {
		return (
			<AppRootNode class={style['app-conter']}>
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
