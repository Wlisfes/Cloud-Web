import { Vue, Component } from 'vue-property-decorator'
import { Tabs, Avatar } from 'ant-design-vue'
import { Skeleton, SkeletonItem } from 'element-ui'
import { init as initECharts, EChartsOption, EChartsType } from 'echarts'
import { nodeComputeGroup } from '@/api'
import { HttpStatus } from '@/types'
import { useFile } from '@/utils/common'
import style from '@/style/admin/admin.home.module.less'

@Component
export default class NodeCompute extends Vue {
	$refs!: { compute: HTMLDivElement }

	private loading: boolean = true
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
		this.onChange(1)
	}

	/**组合图表参数**/
	private useOption(props: { XData: Array<string | number>; YData: number[] }): EChartsOption {
		return {
			tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
			grid: { left: '20px', right: '20px', bottom: '20px', top: '20px', containLabel: true },
			xAxis: [
				{
					splitLine: { show: true, lineStyle: { type: 'dashed' } },
					type: 'category',
					data: props.XData,
					axisTick: { alignWithLabel: true },
					axisLabel: { margin: 20 }
				}
			],
			yAxis: [{ splitLine: { show: true, lineStyle: { type: 'dashed' } }, type: 'value' }],
			series: [{ name: '增量', type: 'bar', barWidth: '50%', data: props.YData }]
		}
	}

	/**创建图表**/
	private useECharts(option: EChartsOption) {
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

	private async onChange(current: number) {
		try {
			const { code, data } = await nodeComputeGroup({ current })
			if (code === HttpStatus.OK) {
				this.loading = false
				this.useECharts(
					this.useOption({
						XData: data.list.map(k => k.key),
						YData: data.list.map(k => k.value)
					})
				)
			}
		} catch (e) {
			this.loading = false
		}
	}

	protected render() {
		return (
			<div class={style['node-compute']}>
				<div class={style['node-compute-tabs']}>
					<Tabs v-model={this.current} onChange={this.onChange}>
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

				<Skeleton loading={this.loading} animated>
					<div slot="template" class={style['node-compute-placeholder']}>
						{Object.keys([...Array(12)]).map(k => (
							<div key={k} style={{ flex: 1 }}>
								<SkeletonItem style={{ width: '50%', height: '100%', margin: '0 25%' }} />
							</div>
						))}
					</div>
					<div ref="compute" class={style['node-compute-container']}></div>
				</Skeleton>
			</div>
		)
	}
}
