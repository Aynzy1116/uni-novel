module.exports = {
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '8080',
    https: false,
    hotOnly: false,
    // 配置代理实现跨域
    proxy: {
      '/api': {
        target: 'http://39.96.77.250', //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
}