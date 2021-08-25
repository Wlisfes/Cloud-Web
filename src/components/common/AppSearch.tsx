import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Input, FormModel, Popover, Spin, Empty } from 'ant-design-vue'
import style from '@/style/common/app.search.module.less'

@Component
export default class AppSearch extends Vue {
	$refs!: { conter: HTMLElement }

	@Prop({ type: String, default: '' }) placeholder!: string
	@Prop({ type: Array, default: () => [] }) dataSource!: Array<{ value: string; id: number }>
	@Prop({ type: Boolean, default: false }) loading!: boolean
	private visible: boolean = false
	private keyword: string = ''
	private overflow: string = ''

	@Watch('visible')
	onChangeVisible() {
		if (this.visible) {
			this.overflow = document.body.style.overflow
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = this.overflow
		}
	}

	public onClose() {
		this.visible = false
	}

	public onFocus() {
		this.visible = true
	}

	private onKeyup(e: KeyboardEvent) {
		if (e.code === 'Escape') {
			this.onClose()
		}
	}

	private onChange() {
		this.$emit('change', {
			value: this.keyword,
			reset: false
		})
	}

	private onSelect(value: string) {
		this.keyword = value
		this.$emit('change', {
			value: value,
			reset: true
		})
	}

	private onSubmit() {
		this.$emit('submit')
	}

	protected render() {
		return (
			<div ref="conter" class={style['app-search']}>
				<Popover
					visible={this.visible}
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
								onKeyup={this.onKeyup}
								onClick={this.onFocus}
								onFocus={this.onFocus}
								onChange={this.onChange}
								onSearch={this.onSubmit}
							></Input.Search>
						</FormModel.Item>
					</FormModel>
					<div slot="content" class={style['app-search-conter']}>
						{this.loading ? (
							<Spin size="large" style={{ padding: '5px 0' }}></Spin>
						) : this.dataSource.length === 0 ? (
							<Empty image={(Empty as any).PRESENTED_IMAGE_SIMPLE}></Empty>
						) : (
							<div class={style.node}>
								{this.dataSource.map(k => (
									<div key={k.id} class={style['node-item']} onClick={() => this.onSelect(k.value)}>
										<div class={`${style['node-value']} app-ellipsis`}>{k.value}</div>
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
							onClick={this.onClose}
						></div>
					)}
				</transition>
			</div>
		)
	}
}
