import { Vue, Component } from 'vue-property-decorator'
import { Input, Icon, FormModel } from 'ant-design-vue'
import style from '@/style/common/app.search.module.less'

@Component
export default class AppSearch extends Vue {
	private visible: boolean = false

	private onFocus() {
		this.visible = true
	}

	private onBlur() {
		this.visible = false
	}

	protected render() {
		return (
			<div class={style['app-search']}>
				<FormModel>
					<FormModel.Item style={{ margin: 0 }}>
						<Input.Search placeholder="Search" onBlur={this.onBlur} onFocus={this.onFocus}></Input.Search>
					</FormModel.Item>
				</FormModel>
				<transition name="mask" appear>
					{this.visible && (
						<div class="ant-modal-mask" style={{ zIndex: 10, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div>
					)}
				</transition>
			</div>
		)
	}
}
