// 运行时的配置 打包过程中走的文件处理

import { matchRoutes } from 'umi'

//类似 前置路由守卫 beforeEach
export function onRouteChange({ clientRoutes, location }: any) {
  const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route
//   if (route) {
//     document.title = route.title || ''
//   }
}
