### 前期准备

1. 下载 mongodb （https://blog.csdn.net/shangdi1988/article/details/50755896）  
   下载运行 localhost:27017 :27017 默认端口 检验运行数据库是否成功
2. 下载 mongoose 目的是 node 服务与数据库 Mongo 连接
3. mongoose 结合 node 使用 （https://blog.csdn.net/qq_38891807/article/details/115450027）

### 开发注意

1. baseUrl 是写后台地址 跨域问题用 cors 或者代理
2. inflation 包 可以实现 如 cates --》 Cate 转化为类的形式
3. 局部路由中间件 添加完如果想在子路由获取数据 需要给 express.Router({mergeParams:true})
4. mongoose

```js
// modelName setOptions
if (req.module.modelName === 'categories') {
  //表的模块名
  options.populate = 'parent'
}
```

5. url 地址是字符串 后面带的参数传到后端也是字符串

6. 数据报表https://www.grapecity.com.cn/developer/activereportsjs?utm_source=baidu&utm_medium=cpc&utm_term=ActivereportsJS&utm_campaign=ActivereportsJS

7.后端包 bcrypt 用来加密的 jsonwebtoken 用来处理 token 的 express-jwt 用来解析 jwt 字符串 http-assert 用来处理错误的返回值内容

8.错误级别中间件的参数必须是 4 个否则不会被捕获执行

9.

```
//前提 需要在html文件加 meta 使视口宽度等于设备宽度 同时注意设计稿的尺寸 二倍图
// rem适配 amfe-flexible 不同设备尺寸不同的rem基准值  以及 结合px转rem postcss-pxtorem（就可以直接写px单位 可以不需要vscode插件的 px-to-rem） 同时需要在postcss.config.js配置文件
//375--》 37.5 amfe-flexible
//1rem = 37.5px   40px --> 1.066rem
// vw适配 视口分成100份 以及结合 postcss-px-to-viewport(px自动转为vw) 同时需要在postcss.config.js配置文件
//375--》 3.75
// 1rem = 3.75px


移动端像素
手机端 是逻辑像素 1pt
设计稿一般是物理像素 1px  1pt=2px
```

10. 游览器最小的字体大小是 12px 要想设置小于 12px 的文字大小 采用 transform:scale(0.7) 当然 css3 这个属性对行内元素不起作用 因为没有宽高

11. scss 获取变量 map-get(对象，变量)

12. router.get('/news/list', async (req, res) => { 注意路径开头一定要有斜杠

13. const randomData = categoriesData.slice(0).sort((a, b) => Math.random() - 0.5) //slice(0)拷贝一份 再随机排序

14.

```js
const categoriesData = await categories.find().where({
  parent: parent,
}) //where找到对应的parent数据 lean转为json对象
// const data = []
// const newsList = data.map(title => {
const randomData = categoriesData.slice(0).sort((a, b) => Math.random() - 0.5) //slice(0)拷贝一份 再随机排序
categoriesDat.push({ name: 'xx', parent: 'sdgfrjhsdfg' })  //这里注意查询出来的数据categoriesData是文档对象（mongoose封装的对象）不能进行添加操作  push失败   方法--》转为json对象 await categories.find().where({
//   parent: parent,
// }).lean()
```
14. 部署相关
