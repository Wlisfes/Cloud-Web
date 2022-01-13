import { Vue, Component } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
import style from '@/style/common/node.link.module.less'

@Component
export default class NodeLink extends Vue {
	private onTrigger() {
		this.$emit('trigger')
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
						<router-link to="/client">🍓 视频</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/minute">🍒 收录</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/partner">🍄 生活</router-link>
					</li>
				</ul>
			</div>
		)
	}
}
