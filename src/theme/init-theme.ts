import { message } from 'ant-design-vue'
import generate from '@ant-design/colors/lib/generate'
const client = require('webpack-theme-color-replacer/client')

const themeColor = {
	getAntdSerials(color: string) {
		// 淡化（即less的tint）
		const lightens = new Array(9).fill(color).map((t, i) => {
			return client.varyColor.lighten(color, i / 10)
		})
		// colorPalette变换得到颜色值
		const colorPalettes = generate(color)
		const rgb = client.varyColor.toNum3(color.replace('#', '')).join(',')
		return lightens.concat(colorPalettes).concat(rgb)
	},
	changeColor(newColor: string) {
		var options = {
			newColors: this.getAntdSerials(newColor), // new colors array, one-to-one corresponde with `matchColors`
			changeUrl(cssUrl: string) {
				return `/${cssUrl}` // while router is not `hash` mode, it needs absolute path
			}
		}
		return client.changer.changeColor(options, Promise)
	}
}

export const nodeUpdateTheme = (props: { primary: string; loading: boolean }): Promise<{ done: Function }> => {
	return new Promise(resolve => {
		if (props.loading) {
			const done = message.loading('正在切换主题', 0)
			themeColor.changeColor(props.primary).finally(() => {
				resolve({ done })
			})
		} else {
			themeColor.changeColor(props.primary).finally(() => {
				resolve({ done: () => {} })
			})
		}
	})
}
