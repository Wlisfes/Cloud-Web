import { Vue, Component } from 'vue-property-decorator'
import { NodeLink, NodeUser } from '@/components/web'
import style from '@/style/common/node.root.module.less'

@Component
export default class NodeHeader extends Vue {
	protected render() {
		return (
			<div class={style['node-root-header-conter']}>
				<NodeLink></NodeLink>
				<NodeUser></NodeUser>
			</div>
		)
	}
}
