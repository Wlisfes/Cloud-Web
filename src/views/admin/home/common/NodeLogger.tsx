import { Vue, Component } from 'vue-property-decorator'
import { Skeleton, SkeletonItem } from 'element-ui'
import { init as initECharts, EChartsOption, EChartsType } from 'echarts'
import { nodeComputeGroup } from '@/api'
import { HttpStatus } from '@/types'
import style from '@/style/admin/admin.home.module.less'

@Component
export default class NodeLogger extends Vue {
	$refs!: { compute: HTMLDivElement }

	private loading: boolean = true
	private instance!: EChartsType

	protected mounted() {
		this.nodeComputeGroup()
	}

	/**组合图表参数**/
	private useOption(props: { XData: Array<string | number>; YData: number[] }): EChartsOption {
		return {
			tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
			grid: { left: '20px', right: '40px', bottom: '20px', top: '20px', containLabel: true },
			xAxis: [
				{
					splitLine: { show: true, lineStyle: { type: 'dashed' } },
					type: 'category',
					data: props.XData,
					boundaryGap: false,
					axisTick: { alignWithLabel: true },
					axisLabel: { margin: 20 }
				}
			],
			yAxis: [{ splitLine: { show: true, lineStyle: { type: 'dashed' } }, type: 'value' }],
			series: [{ name: '访问日志', type: 'line', smooth: true, data: props.YData, areaStyle: { opacity: 0.5 } }]
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

	private async nodeComputeGroup() {
		try {
			const { code, data } = await nodeComputeGroup({ current: 6 })
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
