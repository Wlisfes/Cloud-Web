const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TIME = new Date().getTime()
const resolve = dir => path.join(__dirname, dir)

module.exports = {
	publicPath: process.env.VUE_APP_BASE_PATH,
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: false,
	productionSourceMap: false,
	configureWebpack: {
		name: '妖雨纯',
		resolve: {
			alias: {
				'@': resolve('src')
			}
		},
		output: {
			filename: `static/js/[name].${process.env.VUE_APP_BASE_VERSION}.${TIME}.js`,
			chunkFilename: `static/js/[name].${process.env.VUE_APP_BASE_VERSION}.${TIME}.js`
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: `static/css/[name].${process.env.VUE_APP_BASE_VERSION}.${TIME}.css`,
				chunkFilename: `static/css/[name].${process.env.VUE_APP_BASE_VERSION}.${TIME}.css`
			})
		]
	},
	chainWebpack: config => {
		config.plugins.delete('preload') //删除预加载
		config.plugins.delete('prefetch') //移除 preload 插件
		config.optimization.minimize(true) //压缩代码
		config.optimization.splitChunks({
			//分割代码
			chunks: 'all'
		})
	},
	css: {
		loaderOptions: {
			less: {
				javascriptEnabled: true
			}
		},
		requireModuleExtension: true
	},
	devServer: {
		port: 1234,
		open: true,
		disableHostCheck: true,
		proxy: {
			[process.env.VUE_APP_BASE_API]: {
				target: 'http://localhost:3005',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					[`^${[process.env.VUE_APP_BASE_API]}`]: ''
				}
			},
			[process.env.VUE_APP_BASE_BING]: {
				target: 'https://cn.bing.com',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					[`^${[process.env.VUE_APP_BASE_BING]}`]: ''
				}
			}
		}
	}
}
