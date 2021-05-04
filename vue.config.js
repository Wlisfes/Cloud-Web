const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
	assetsDir: 'static',
	productionSourceMap: false,
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src')
			}
		}
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
	lintOnSave: false,
	devServer: {
		port: 1234,
		open: true,
		disableHostCheck: true,
		proxy: {
			'/api': {
				target: 'http://localhost:3003',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}
