const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map'
  },
  // devServer: {
  //   host: 'localhost'
  // }
})

// Changement du nom du dossier de compilation
const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "./prod/")
}
