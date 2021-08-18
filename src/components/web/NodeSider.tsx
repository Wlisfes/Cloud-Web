import { Vue, Component } from 'vue-property-decorator'
import { Drawer } from 'ant-design-vue'
import style from '@/style/common/node.link.module.less'

@Component
export default class NodeSider extends Vue {
	private visible: boolean = false

	public onTrigger() {
		this.visible = !this.visible
	}

	protected render() {
		return (
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
		)
	}
}
