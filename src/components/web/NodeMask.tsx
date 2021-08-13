import { Vue, Component } from 'vue-property-decorator'
import style from '@/style/common/node.root.module.less'

@Component
export default class NodeMask extends Vue {
	protected render() {
		return <div class={style['node-root-mask']}></div>
	}
}
