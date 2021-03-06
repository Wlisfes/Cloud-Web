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
						<router-link to="/" nativeOn-click={this.onTrigger}>
							๐ ้ฆ้กต
						</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/multiple" nativeOn-click={this.onTrigger}>
							๐ ๅฝๆกฃ
						</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/intense" nativeOn-click={this.onTrigger}>
							๐ ่ง้ข
						</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/minute" nativeOn-click={this.onTrigger}>
							๐ ๆถๅฝ
						</router-link>
					</li>
					<li class={style['node-link-item']}>
						<router-link to="/partner" nativeOn-click={this.onTrigger}>
							๐ ็ๆดป
						</router-link>
					</li>
				</ul>
			</Drawer>
		)
	}
}
