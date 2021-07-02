import { Vue, Component } from 'vue-property-decorator'
import { Cascader } from 'ant-design-vue'
import request from '@/utils/request'

@Component
export default class Home extends Vue {
	private state = {
		dataSource: [
			{ value: 'zhejiang', label: 'Zhejiang', isLeaf: false },
			{ value: 'jiangsu', label: 'Jiangsu', isLeaf: false }
		]
	}

	protected created() {
		this.createMenu()
	}

	protected listToTree(list: any[]) {
		var map: any = {},
			node,
			tree = [],
			i
		for (i = 0; i < list.length; i++) {
			map[list[i].id] = list[i]
			list[i].children = []
		}
		for (i = 0; i < list.length; i += 1) {
			node = list[i]
			if (node.parentId) {
				if (map[node.parentId].children) map[node.parentId].children.push(node)
			} else {
				tree.push(node)
			}
		}
		return tree
	}

	private createMenu() {
		request.get('http://sdk.lisfes.cn/json/menu.json').then((response: any) => {
			console.log(this.listToTree(response))
		})
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
