import { Getter } from 'vuex-class'
import { Vue, Component } from 'vue-property-decorator'
import { Breadcrumb } from 'ant-design-vue'

@Component
export default class AppTitle extends Vue {
	@Getter('base/name') name!: string

	protected render() {
		return (
			<Breadcrumb
				style={{
					display: 'flex',
					alignItems: 'center',
					fontSize: '15px',
					cursor: 'pointer',
					marginLeft: '10px'
				}}
			>
				{this.name.split('-').map(name => (
					<Breadcrumb.Item>{name}</Breadcrumb.Item>
				))}
			</Breadcrumb>
		)
	}
}
