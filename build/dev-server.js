"use strict"

const Webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const webpackConfig = require("./webpack.prod.conf")

const compiler = Webpack(webpackConfig)
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true
  }
})
const server = new WebpackDevServer(compiler, devServerOptions)

server.listen(8889, "127.0.0.1", () => {
  console.log("Starting server on http://127.0.0.1:8889")
})
