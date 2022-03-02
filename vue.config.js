const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const AntdThemeColorPlugin = require('./src/theme/theme.config')
const path = require('path')
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
		plugins: [new AntdDayjsWebpackPlugin(), AntdThemeColorPlugin()]
	},
	css: {
		loaderOptions: {
			less: {
				modifyVars: {
					// 'primary-color': '#FA541C'
				},
				javascriptEnabled: true
			},
			css: {
				modules: {
					localIdentName: '[name]-[local]'
				}
			}
		},
		requireModuleExtension: true
	},
	chainWebpack: config => {
		config.optimization.minimizer('terser').tap(args => {
			Object.assign(args[0].terserOptions.compress, {
				// warnings: false , // 默认 false
				// drop_console:  ,
				// drop_debugger: true, // 默认也是true
				pure_funcs: ['console.log', 'console.error']
			})
			return args
		})
		config.plugin('preload').tap(() => [
			{
				rel: 'preload',
				fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
				include: 'initial'
			}
		])
		config.plugins.delete('prefetch')

		config.when(process.env.NODE_ENV !== 'development', config => {
			// config
			// 	.plugin('ScriptExtHtmlWebpackPlugin')
			// 	.after('html')
			// 	.use('script-ext-html-webpack-plugin', [{ inline: /runtime\..*\.js$/ }])
			// 	.end()
			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					vendors: {
						name: 'chunk-app-vendor',
						test: /[\\/]node_modules[\\/]/,
						chunks: 'initial',
						priority: 10,
						reuseExistingChunk: true,
						enforce: true
					}
				}
			})
			config.optimization.runtimeChunk('single')
		})
	},
	devServer: {
		port: 1234,
		open: true,
		disableHostCheck: true,
		proxy: {
			[process.env.VUE_APP_BASE_API]: {
				// target: 'http://localhost:3005',
				target: 'https://lisfes.cn',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					[`^${[process.env.VUE_APP_BASE_API]}`]: ''
				}
			}
		}
	}
}
