const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map'
  }
})

// Changement du nom du dossier de compilation
const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../easysoftcrm-vue/")
}
