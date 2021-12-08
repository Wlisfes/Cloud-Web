import { Vue, Component } from 'vue-property-decorator'
import { Tabs, Avatar } from 'ant-design-vue'
import { init as initECharts, EChartsOption, EChartsType } from 'echarts'
import { useFile } from '@/utils/common'
import style from '@/style/admin/admin.home.module.less'

@Component
export default class NodeCompute extends Vue {
	$refs!: { compute: HTMLDivElement }

	private instance!: EChartsType
	private current: number = 1
	private nodeTabs = [
		{ name: '媒体', key: 1, cover: useFile('static', '1638872128223.png') },
		{ name: '文章', key: 2, cover: useFile('static', '1638872128221.png') },
		{ name: '标签', key: 3, cover: useFile('static', '1638872128222.png') },
		{ name: '收录', key: 4, cover: useFile('static', '1638872128224.png') },
		{ name: '用户', key: 5, cover: useFile('static', '1638872128220.png') }
	]

	protected mounted() {
		this.initNodeECharts({
			tooltip: {
				trigger: 'axis',
				axisPointer: { type: 'shadow' }
			},
			grid: {
				left: '20px',
				right: '20px',
				bottom: '20px',
				top: '20px',
				containLabel: true
			},
			xAxis: [
				{
					splitLine: { show: true, lineStyle: { type: 'dashed' } },
					type: 'category',
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					axisTick: { alignWithLabel: true }
				}
			],
			yAxis: [
				{
					splitLine: { show: true, lineStyle: { type: 'dashed' } },
					type: 'value'
				}
			],
			series: [
				{
					name: '增量',
					type: 'bar',
					barWidth: '50%',
					data: [10, 52, 200, 334, 390, 330, 220, 334, 390, 330, 220, 280]
				}
			]
		})
	}

	/**创建图表**/
	private initNodeECharts(option: EChartsOption) {
		setTimeout(() => {
			if (!this.instance) {
				this.instance = initECharts(this.$refs.compute)
				const onResize = () => this.instance.resize()
				window.addEventListener('resize', onResize)
				this.$once('hook:beforeDestroy', () => {
					window.removeEventListener('resize', onResize)
				})
			}
			this.instance.setOption(option)
		}, 0)
	}

	protected render() {
		return (
			<div class={style['node-compute']}>
				<div class={style['node-compute-tabs']}>
					<Tabs v-model={this.current}>
						{this.nodeTabs.map(item => (
							<Tabs.TabPane
								key={item.key}
								tab={
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<Avatar src={item.cover}></Avatar>
										<div style={{ fontSize: '14px', color: '#444444', marginLeft: '10px' }}>
											{item.name}
										</div>
									</div>
								}
							></Tabs.TabPane>
						))}
					</Tabs>
				</div>
				<div ref="compute" class={style['node-compute-container']}></div>
			</div>
		)
	}
}
