const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    //目的是为了全局引入scss或less样式
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "src/styles/common.scss")],
    },
  },
  // devServer:{
  //   proxy:{
  //     '/api':{
  //       path:'http:127.0.0.1'
  //     }
  //   }
  // }
});
