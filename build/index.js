const { run } = require('runjs')
const connect = require('connect')
const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback')
const { createProxyMiddleware } = require('http-proxy-middleware')
const config = require('../vue.config.js')

const app = connect()
const port = 2430
const publicPath = config.publicPath || '/'

run(`vue-cli-service build --report`)
const useProxy = createProxyMiddleware({
	target: 'https://lisfes.cn/', //'http://localhost:3005/',
	changeOrigin: true,
	logLevel: 'debug'
})

app.use('/api', useProxy)
app.use(history())
app.use(
	publicPath,
	serveStatic('./dist', {
		index: ['index.html', '/home']
	})
)

app.listen(port, function () {
	console.log(`http://localhost:${port}${publicPath}`)
})
