//babel-loader 会添加Polyfill 但是不能进行类型检查 即使有类型错误还是可以正常打包 对于ts-loader可以类型检查 两个可以一起使用

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.22',
      },
    ],
  ],
}
