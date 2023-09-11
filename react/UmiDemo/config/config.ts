import { defineConfig } from 'umi'

export default defineConfig({
  //基础配置
  devtool: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  //开启链式配置
  chainWebpack(memo, { env, webpack }) {
    //memo现有的webpack env环境变量 webpack对象
    return memo
  },
  //打包配置
  externals: {},
  headScripts: [],
  extraBabelPlugins: [],
  extraBabelPresets: [],
  extraPostCSSPlugins: [],
  //配置额外的umi插件
  plugins: [],
  //手写配置路由
  routes: [
    { path: '/', component: '@/pages/home.tsx', title: '首页' },
    { path: '/detail', component: 'detail', title: '详情' },
    {
      path: '/personal',
      component: 'personal',
      routes: [
        {
          path: '/personal/info',
          component: '@/pages/personal/info.tsx',
        },
      ],
    },
    { path: '*', component: 'error' },
  ],
  history: { type: 'hash' },

  //html页面配置
  links: [],
  metas: [],

  //跨域处理
  proxy: {
    '/api': {
      target: '',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  npmClient: 'pnpm',
})
