import { Vue, Component } from 'vue-property-decorator'
import style from '@/style/common/node.root.module.less'

@Component
export default class NodeHeader extends Vue {
	protected render() {
		return (
			<header class={style['node-root-header']}>
				<ul>
					<li>
						<router-link to="/">🍎 首页</router-link>
					</li>
					<li>
						<router-link to="/multiple">🍀 归档</router-link>
					</li>
					<li>
						<router-link to="/intense">🍓 视频</router-link>
					</li>
					<li>
						<router-link to="/minute">🍒 笔记</router-link>
					</li>
					<li>
						<router-link to="/partner">🍄 友链</router-link>
					</li>
				</ul>
			</header>
		)
	}
}
