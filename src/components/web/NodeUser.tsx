import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Icon, Space, Popover, Menu, Avatar } from 'ant-design-vue'
import { AppAvatar } from '@/components/common'
import style from '@/style/common/node.user.module.less'

@Component
export default class NodeUser extends Vue {
	@Getter('user/uid') uid!: number
	@Getter('user/nickname') nickname!: string
	@Getter('user/avatar') avatar!: string

	private popover: boolean = false

	private onChange() {
		this.popover = false
	}

	protected render() {
		return (
			<div class={style['node-user']}>
				<div class={style['node-user-source']}>
					<Icon type="fullscreen" />
				</div>
				{this.uid && (
					<div class={style['node-user-source']}>
						<Icon type="bell" />
						<sup class={style['bell-bot']}></sup>
					</div>
				)}
				{this.uid ? (
					<Popover
						v-model={this.popover}
						destroyTooltipOnHide
						trigger="click"
						placement="bottomRight"
						overlayClassName="app-popover"
					>
						<Menu slot="content" onClick={this.onChange}>
							<Menu.Item key="user" style={{ color: '#1890ff' }}>
								<Icon type="user"></Icon>
								<span>控制台</span>
							</Menu.Item>
							<Menu.Item key="github">
								<a
									href="https://github.com/Wlisfes"
									target="_blank"
									rel="noopener noreferrer"
									style={{ color: '#fa8c16' }}
								>
									<Icon type="github"></Icon>
									<span>项目地址</span>
								</a>
							</Menu.Item>
							<Menu.Item key="logout" style={{ color: '#f5222d' }}>
								<Icon type="logout"></Icon>
								<span>退出登陆</span>
							</Menu.Item>
						</Menu>
						<div class={style['node-user-popover']}>
							<AppAvatar
								size={32}
								src={`${this.avatar}?x-oss-process=style/resize`}
								username={this.nickname}
								rounded={false}
								style={{ margin: '0 auto', cursor: 'pointer', borderRadius: '50%' }}
							></AppAvatar>
							<div class={`${style['node-user-nickname']} app-ellipsis`}>{this.nickname}</div>
						</div>
					</Popover>
				) : (
					<div class={style['node-user-popover']}>
						<Avatar size={32} icon="user"></Avatar>
					</div>
				)}
			</div>
		)
	}
}