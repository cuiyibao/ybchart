const path = require('path')
const htmlWebpackPlugins = require('html-webpack-plugin')

module.exports = {
  // 输入路径配置
  entry: path.resolve(__dirname, '../example/index.js'),
  // 输出文件名和路径配置
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'cheap-module-eval-source-map',
  // 引入插件配置
  plugins: [
    new htmlWebpackPlugins({
      // 输出文件名
      filename: 'index.html',
      // 所引用模板文件位置
      template: path.resolve(__dirname, '../example/index.html'),
      // js 文件插入的位置
      inject: 'body'
    })
  ],
  // 文件类型转换配置
  module: {
    rules: [
      {
        // 正则匹配 css 文件
        test: /\.css$/,
        use: [
          {
            // 引入 style 文件加载插件
            loader: 'style-loader'
          },
          {
            // 引入 css 文件加载插件
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}