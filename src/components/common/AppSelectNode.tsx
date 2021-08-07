import { Vue, Component, Prop } from 'vue-property-decorator'
import { Popover, Icon } from 'ant-design-vue'
import { NodeCloud } from '@/types'

@Component
export default class AppSelectNode extends Vue {
	@Prop({ type: Function }) submit!: (option?: any) => void
	@Prop({ type: Array, default: () => [] }) dataSource!: NodeCloud[]

	private current: string = ''

	public change(current: string) {
		this.current = current
	}

	protected render() {
		return (
			<Popover
				getPopupContainer={() => document.querySelector('.dplayer')}
				// visible={true}
				placement="top"
				mouseLeaveDelay={0.2}
			>
				<div class="app-select" slot="content">
					<div class="app-select-conter">
						{this.dataSource.map((k, index) => {
							const active = this.current === k.key
							return (
								<div
									class={`app-select-node ${active ? 'is-active' : ''}`}
									key={k.id}
									onClick={() => this.submit(k)}
								>
									<div class="node-label">
										{active ? <Icon type="caret-right"></Icon> : <span>{index + 1}</span>}
									</div>
									<div class="node-value app-ellipsis">{k.title}</div>
								</div>
							)
						})}
					</div>
				</div>
				<div class="dplayer-setting">
					<button class="dplayer-icon dplayer-setting-icon" data-balloon="选集">
						<Icon type="bars" style={{ fontSize: '23px' }}></Icon>
					</button>
				</div>
			</Popover>
		)
	}
}
