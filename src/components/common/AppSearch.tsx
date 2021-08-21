import { Vue, Component, Prop } from 'vue-property-decorator'
import { Input, FormModel, Popover, Spin, Empty } from 'ant-design-vue'
import style from '@/style/common/app.search.module.less'

@Component
export default class AppSearch extends Vue {
	$refs!: { conter: HTMLElement }

	@Prop({ type: String, default: 'Search' }) placeholder!: string
	@Prop({ type: Array, default: () => [] }) dataSource!: Array<{ name: string; id: number }>
	@Prop({ type: Boolean, default: false }) loading!: boolean
	private visible: boolean = false
	private popover: boolean = false
	private keyword: string = ''

	private onFocus() {
		this.visible = true
	}

	private onBlur() {
		this.visible = false
	}

	private onChange() {
		this.$emit('change', this.keyword)
	}

	private onSearch() {
		this.$emit('submit', this.keyword)
	}

	protected render() {
		return (
			<div ref="conter" class={style['app-search']}>
				<Popover
					v-model={this.popover}
					getPopupContainer={() => this.$refs.conter}
					overlayStyle={{ width: '100%' }}
					trigger="click"
					placement="bottom"
				>
					<FormModel>
						<FormModel.Item style={{ margin: 0, zIndex: 1000 }}>
							<Input.Search
								v-model={this.keyword}
								placeholder={this.placeholder}
								onFocus={this.onFocus}
								onChange={this.onChange}
								onSearch={this.onSearch}
							></Input.Search>
						</FormModel.Item>
					</FormModel>
					<div slot="content" class={style['app-search-conter']}>
						{this.loading ? (
							<Spin size="large"></Spin>
						) : this.dataSource.length === 0 ? (
							<Empty image={(Empty as any).PRESENTED_IMAGE_SIMPLE}></Empty>
						) : (
							<div class={style.node}>
								{this.dataSource.map(k => (
									<div key={k.id} class={style['node-item']}>
										<div class={`${style['node-value']} app-ellipsis`}>{k.name}</div>
									</div>
								))}
							</div>
						)}
					</div>
				</Popover>
				<transition name="mask" appear>
					{this.visible && (
						<div
							class="ant-modal-mask"
							style={{ zIndex: 999, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
							onClick={this.onBlur}
						></div>
					)}
				</transition>
			</div>
		)
	}
}
