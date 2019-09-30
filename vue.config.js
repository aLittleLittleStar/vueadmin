module.exports = {
	lintOnSave: false,
	devServer: {
		open: false,//启动项目后自动开启浏览器
		host: '0.0.0.0',//对应的主机名
		port: 8080,//端口号
		https: false,//是否开启协议名,如果开启会发出警告
		proxy: {
			//配置跨域
			'/api': {//配置跨域的名字
				target: 'http://localhost:3000/api',//跨域的地址
				ws: true,
				changeOrigin: true,//是否跨域
				pathRewrite: {//当前的名字
					'^/api': ''
				}
			},
			'/show': {
				target: 'http://localhost:3000/show',
				changeOrigin: true,
				pathRewrite: {
					'^/show': ''
				}
			},
			'/add': {
				target: 'http://localhost:3000/add',
				changeOrigin: true,
				pathRewrite: {
					'^/add': ''
				}
			},
			'/find': {
				target: 'http://localhost:3000/find',
				changeOrigin: true,
				pathRewrite: {
					'^/find': ''
				}
			}
		}
	}
}
