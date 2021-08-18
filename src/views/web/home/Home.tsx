import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { NodeFooter } from '@/Layout/web/common'
import { Icon, Space } from 'ant-design-vue'
import { NodeBanner } from '@/types'
import style from '@/style/web/web.home.module.less'

const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
const zeroPadding = (num: number, digit: number) => {
	let zero = ''
	for (let i = 0; i < digit; i++) {
		zero += '0'
	}
	return (zero + num).slice(-digit)
}

@Component
export default class Home extends Vue {
	@Getter('banner/current') current!: NodeBanner
	private state = {
		date: '',
		time: '',
		timeout: 0
	}

	protected created() {
		this.updateTime()
	}

	private updateTime() {
		const cd = new Date()
		this.state.time =
			zeroPadding(cd.getHours(), 2) +
			':' +
			zeroPadding(cd.getMinutes(), 2) +
			':' +
			zeroPadding(cd.getSeconds(), 2)
		this.state.date =
			zeroPadding(cd.getFullYear(), 4) +
			'-' +
			zeroPadding(cd.getMonth() + 1, 2) +
			'-' +
			zeroPadding(cd.getDate(), 2) +
			' ' +
			week[cd.getDay()]

		this.state.timeout && clearTimeout(this.state.timeout)
		this.state.timeout = setTimeout(this.updateTime, 1000) as any
	}

	protected render() {
		return (
			<div class={style['app-conter']}>
				<div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<div class={style['app-conter-clock']}>
						<div class={style['clock-date']}>{this.state.date}</div>
						<div class={style['clock-time']}>{this.state.time}</div>
						<div class={`${style['clock-current']} ${style['clock-date']}`}>{this.current?.name}</div>
					</div>
				</div>
				<div class={style['root-banner']}>
					<Space size={15}>
						<a href={this.current?.search} target="_blank" rel="noopener noreferrer">
							<div class={style['root-banner-item']}>
								<i class="el-icon-location-outline"></i>
							</div>
						</a>
						<div class={style['root-banner-item']} onClick={() => this.$store.dispatch('banner/prev')}>
							<Icon type="left" />
						</div>
						<div class={style['root-banner-item']} onClick={() => this.$store.dispatch('banner/next')}>
							<Icon type="right" />
						</div>
					</Space>
				</div>
				<NodeFooter></NodeFooter>
			</div>
		)
	}
}
