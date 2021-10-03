const client = require('webpack-theme-color-replacer/client')
import generate from '@ant-design/colors/lib/generate'
import { message } from 'ant-design-vue'

/**主题色列表**/
export const primaryColor = ['#F5222D', '#FA541C', '#FAAD14', '#13C2C2', '#52C41A', '#1890FF', '#2F54EB', '#722ED1']

/**主题色列表**/
export const primaryTheme = [
	{ color: '#1890FF', theme: '拂晓蓝' },
	{ color: '#F5222D', theme: '薄暮' },
	{ color: '#FA541C', theme: '火山' },
	{ color: '#FAAD14', theme: '日暮' },
	{ color: '#13C2C2', theme: '明青' },
	{ color: '#52C41A', theme: '极光绿' },
	{ color: '#2F54EB', theme: '极客蓝' },
	{ color: '#722ED1', theme: '酱紫' }
]

const themeColor = {
	getAntdSerials(color: string) {
		// 淡化（即less的tint）
		const lightens = new Array(9).fill(null).map((t, i) => {
			return client.varyColor.lighten(color, i / 10)
		})
		// colorPalette变换得到颜色值
		const colorPalettes = generate(color)
		const rgb = client.varyColor.toNum3(color.replace('#', '')).join(',')
		return lightens.concat(colorPalettes).concat(rgb)
	},
	changeColor(newColor: string) {
		var options = {
			newColors: this.getAntdSerials(newColor),
			changeUrl(cssUrl: string) {
				console.log(cssUrl)
				return `/${cssUrl}`
			}
		}
		return client.changer.changeColor(options, Promise)
	}
}

export const updateTheme = (newPrimaryColor: string, popups?: boolean) => {
	const hideMessage = popups && message.loading('正在切换主题！', 0)
	themeColor.changeColor(newPrimaryColor).finally(() => {
		setTimeout(() => {
			hideMessage && hideMessage()
		})
	})
}

export const updateColorWeak = (colorWeak: string) => {
	colorWeak ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak')
}
