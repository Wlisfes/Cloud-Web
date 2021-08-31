import { Getter } from 'vuex-class'
import { Vue, Component } from 'vue-property-decorator'
import { Icon, Menu, Popover, Modal } from 'ant-design-vue'
import { AppAvatar } from '@/components/common'
import { toggleFull, isFull, watchFull } from 'be-full'
import { init } from '@/components/instance/init-logout'

@Component
export default class AppUser extends Vue {
	@Getter('user/uid') uid!: number
	@Getter('user/avatar') avatar!: string
	@Getter('user/nickname') nickname!: string

	private state = {
		popover: false,
		visible: false,
		isFull: isFull(document.documentElement)
	}

	protected beforeDestroy() {
		this.watch.cancel()
	}

	/**监听全屏状态**/
	private watch = watchFull(document.documentElement, ev => {
		this.state.isFull = ev
	})

	/**切换全屏/退出**/
	private onToggleFull() {
		toggleFull()
		this.state.isFull = !this.state.isFull
	}

	private async onChange(option: { key: string }) {
		this.state.popover = false
		switch (option.key) {
			case 'home':
				this.$router.push('/')
			case 'user':
				// this.$router.push('/')
				break
			case 'github':
				window.open('https://github.com/Wlisfes')
				break
			default:
				init().then(({ node, vm }) => {
					node.init()
					vm.$once('logout-submit', () => {
						setTimeout(async () => {
							await this.$store.dispatch('user/logout')
							node.onClose()
							this.$router.push('/')
						}, 500)
					})
					vm.$once('logout-close', () => {
						vm.$off('logout-submit')
						vm.$off('logout-close')
					})
				})
				break
		}
	}

	protected render() {
		const { state } = this
		return (
			<div class="app-user">
				<div class="app-user-node" style={{ padding: '0 10px' }}>
					<Icon type="bell" />
					<sup class="bell-bot"></sup>
				</div>
				<div class="app-user-node" style={{ padding: '0 10px' }} onClick={this.onToggleFull}>
					{state.isFull ? <Icon type="fullscreen-exit" /> : <Icon type="fullscreen" />}
				</div>
				<Popover
					v-model={state.popover}
					destroyTooltipOnHide
					trigger="click"
					placement="bottom"
					overlayClassName="app-popover"
				>
					<Menu slot="content" onClick={this.onChange}>
						<Menu.Item key="home" style={{ color: '#13c2c2' }}>
							<Icon type="bank"></Icon>
							<span>返回首页</span>
						</Menu.Item>
						<Menu.Item key="user" style={{ color: '#1890ff' }}>
							<Icon type="user"></Icon>
							<span>个人中心</span>
						</Menu.Item>
						<Menu.Item key="github" style={{ color: '#fa8c16' }}>
							<Icon type="github"></Icon>
							<span>项目地址</span>
						</Menu.Item>
						<Menu.Item key="logout" style={{ color: '#f5222d' }}>
							<Icon type="logout"></Icon>
							<span>退出登陆</span>
						</Menu.Item>
					</Menu>
					{this.uid && (
						<div style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
							<AppAvatar
								size={32}
								src={`${this.avatar}?x-oss-process=style/resize-1-1`}
								username={this.nickname}
								rounded={false}
								style={{ margin: '0 auto', cursor: 'pointer', borderRadius: '50%' }}
							></AppAvatar>
							<div class="app-user-nickname app-ellipsis">{this.nickname}</div>
						</div>
					)}
				</Popover>
				<div class="app-user-node" style={{ padding: '0 10px' }}>
					<Icon type="setting" />
				</div>

				<Modal v-model={state.visible}></Modal>
			</div>
		)
	}
}
