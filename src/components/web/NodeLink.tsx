import { Vue, Component } from 'vue-property-decorator'
import { Icon, Drawer } from 'ant-design-vue'
import style from '@/style/common/node.link.module.less'

@Component
export default class NodeLink extends Vue {
	private visible: boolean = false

	private onTrigger() {
		this.visible = !this.visible
	}

	protected render() {
		return (
			<div>
				<div class={style['node-link-menu']} onClick={this.onTrigger}>
					<Icon type="menu" style={{ fontSize: '20px', color: '#ffffff' }} />
				</div>
				<ul class={`${style['node-link']} ${style.horizontal}`}>
					<li class={style['node-link-item']}>
						<router-link to="/">🍎 首页</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/multiple">🍀 归档</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/intense">🍓 视频</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/minute">🍒 笔记</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/partner">🍄 友链</router-link>
					</li>
				</ul>

				<Drawer
					placement="left"
					zIndex={3000}
					width={200}
					visible={this.visible}
					closable={false}
					bodyStyle={{ padding: 0 }}
					onClose={this.onTrigger}
				>
					<ul class={`${style['node-link']} ${style.vertical}`}>
						<li class={style['node-link-item']}>
							<router-link to="/">🍎 首页</router-link>
						</li>
						<li class={style['node-link-item']}>
							<router-link to="/multiple">🍀 归档</router-link>
						</li>
						<li class={style['node-link-item']}>
							<router-link to="/intense">🍓 视频</router-link>
						</li>
						<li class={style['node-link-item']}>
							<router-link to="/minute">🍒 笔记</router-link>
						</li>
						<li class={style['node-link-item']}>
							<router-link to="/partner">🍄 友链</router-link>
						</li>
					</ul>
				</Drawer>
			</div>
		)
	}
}
