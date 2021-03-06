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
						<router-link to="/">๐ ้ฆ้กต</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/multiple">๐ ๅฝๆกฃ</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/client">๐ ่ง้ข</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/minute">๐ ๆถๅฝ</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/partner">๐ ็ๆดป</router-link>
					</li>
				</ul>
			</div>
		)
	}
}
