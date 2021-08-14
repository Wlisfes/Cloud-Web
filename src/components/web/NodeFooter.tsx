import { Vue, Component } from 'vue-property-decorator'
import style from '@/style/common/node.root.module.less'

@Component
export default class NodeFooter extends Vue {
	protected render() {
		return (
			<div class={style['node-root-footer']}>
				<span>Cloud Ant Design ©2021 Created by Wlisfes</span>
				<a href="https://beian.miit.gov.cn" target="_blank">
					粤ICP备18016996号-1
				</a>
			</div>
		)
	}
}
