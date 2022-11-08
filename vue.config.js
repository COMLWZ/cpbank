const { defineConfig } = require('@vue/cli-service')
const ElementPlus = require('unplugin-element-plus/webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      // 配置elementplus自动引入
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: false })]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      ElementPlus({
        // 引入的样式的类型，可以是css、sass、less等
        importStyle: 'css',
        useSource: true
      })
    ]
  },
  // resolve: {
  //   alias: {
  //     '@': path.join(__dirname, './src')
  //   }
  // },
  devServer: {
    client: {
      overlay: { // 让浏览器 overlay 同时显示警告和错误
        warnings: true,
        errors: true
      }
      // logging: 'info'
    },
    host: '0.0.0.0',
    port: 3000, // 端口号
    https: false,
    // open: true, // 配置自动启动浏览器
    hot: true, // 热更新

    // 配置跨域处理,只有一个代理
    proxy: {
      /**
       * 针对product/create接口的，测试对接
       */
      '/api/test': {
        target: 'http://127.0.0.1:8090/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api/test': ''
        }
      },
      '/api': {
        target: 'http://120.27.242.248/',
        // changeOrigin: true,
        // secure: false,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }
})
