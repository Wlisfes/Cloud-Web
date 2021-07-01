import { Vue, Component } from 'vue-property-decorator'
import { Cascader } from 'ant-design-vue'

@Component
export default class Home extends Vue {
	private state = {
		dataSource: [
			{ value: 'zhejiang', label: 'Zhejiang', isLeaf: false },
			{ value: 'jiangsu', label: 'Jiangsu', isLeaf: false }
		]
	}

	private loadData(selectedOptions: any[]) {
		const targetOption = selectedOptions[selectedOptions.length - 1]
		targetOption.loading = true
		console.log(targetOption)

		setTimeout(() => {
			targetOption.loading = false
			targetOption.children = [
				{
					label: `${targetOption.label} Dynamic 1`,
					value: 'dynamic1',
					isLeaf: false
				},
				{
					label: `${targetOption.label} Dynamic 2`,
					value: 'dynamic2'
				}
			]
			this.state.dataSource = [...this.state.dataSource]
		}, 1000)
	}

	private onChange(value: string) {
		console.log(value)
	}

	protected render() {
		const { state } = this

		return (
			<div>
				<h1>Home</h1>
				<Cascader
					options={state.dataSource}
					change-on-select
					onChange={this.onChange}
					load-data={this.loadData}
				></Cascader>
			</div>
		)
	}
}
