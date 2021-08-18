import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(MouseWheel)

@Component
export default class NodeScroll extends Vue {
	$refs!: { wrapper: HTMLElement }

	@Prop({ type: Number, default: () => 1 }) probeType!: number //1-会截流   2-不会截流   3-看文档
	@Prop({ type: Boolean, default: () => true }) click!: boolean //点击列表是否派发click事件
	@Prop({ type: Boolean, default: () => false }) scrollX!: boolean //是否开启横向滚动
	@Prop({ type: Boolean, default: () => false }) listenScroll!: boolean //是否派发滚动事件
	@Prop({ type: Array, default: () => [] }) dataSource!: Array<any> //列表的数据
	@Prop({ type: Boolean, default: () => false }) pullup!: boolean //是否派发滚动到底部的事件，用于上拉加载
	@Prop({ type: Boolean, default: () => false }) pulldown!: boolean //是否派发顶部下拉的事件，用于下拉刷新
	@Prop({ type: Boolean, default: () => false }) beforeScroll!: boolean //是否派发列表滚动开始的事件
	@Prop({ type: Number, default: () => 20 }) refreshDelay!: number //当数据更新后，刷新scroll的延时。
	@Prop({ type: Boolean, default: () => false }) bounce!: boolean //是否开启页面回弹
	@Prop({ type: Number, default: () => 300 }) bounceTime!: number //动画回弹时间

	public scroll!: any

	@Watch('dataSource', { deep: true })
	onDataSource() {
		setTimeout(() => {
			this.refresh()
		}, this.refreshDelay)
	}

	protected mounted() {
		//保证在DOM渲染完毕后初始化better-scroll
		this.$nextTick(() => {
			setTimeout(() => {
				this.initScroll()
			}, 20)
		})
	}

	private initScroll() {
		if (!this.$refs.wrapper) {
			return
		}
		//better-scroll的初始化
		this.scroll = new BScroll(this.$refs.wrapper, {
			probeType: this.probeType,
			click: this.click,
			scrollX: this.scrollX,
			mouseWheel: {
				speed: 20,
				invert: false,
				easeTime: 300
			},
			bounce: this.bounce,
			bounceTime: this.bounceTime
		})

		//是否派发滚动事件
		if (this.listenScroll) {
			let me = this
			this.scroll.on('scroll', (pos: any) => {
				me.$emit('scroll', pos)
			})
		}

		//是否派发滚动到底部事件，用于上拉加载
		if (this.pullup) {
			this.scroll.on('scrollEnd', () => {
				//滚动到底部
				if (this.scroll.y <= this.scroll.maxScrollY + 50) {
					this.$emit('scrollToEnd')
				}
			})
		}

		//是否派发顶部下拉事件，用于下拉刷新
		if (this.pulldown) {
			this.scroll.on('touchend', (pos: any) => {
				//下拉动作
				if (pos.y > 50) {
					this.$emit('pulldown')
				}
			})
		}

		//是否派发列表滚动开始的事件
		if (this.beforeScroll) {
			this.scroll.on('beforeScrollStart', () => {
				this.$emit('beforeScroll')
			})
		}
	}

	/**代理better-scroll的disable方法**/
	public disable() {
		this.scroll && this.scroll.disable()
	}

	/**代理better-scroll的enable方法**/
	public enable() {
		this.scroll && this.scroll.enable()
	}

	/**代理better-scroll的refresh方法**/
	public refresh() {
		this.scroll && this.scroll.refresh()
	}

	/**代理better-scroll的scrollTo方法**/
	public scrollTo() {
		this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
	}

	/**代理better-scroll的scrollToElement方法**/
	public scrollToElement() {
		this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
	}

	protected render() {
		return <div ref="wrapper">{this.$slots.default}</div>
	}
}
