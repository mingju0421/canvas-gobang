// module.exports = {
//   devServer: {
//     open: true,  // 自动弹出浏览器
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000', // 设置调用的接口和端口号
//         ws: true,
//         changeOrigin: true, // true 表示实现跨域
//         pathRewrite: {
//           '^/api': '/' //把/api 替换成 /
//         }
//       }
//     }
//   }
// }

module.exports = {
  devServer: {
    proxy: 'http://localhost:3000'
    // proxy: {
    //   '*': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
        
    //   }
    // }
  }
};