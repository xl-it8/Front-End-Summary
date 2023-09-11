//模块扩充帮助我们将功能扩展到我们可能无法访问的第三方库或其他文件中的类
//TypeScript 不允许在类之间合并，所以我们不能创建两个或多个同名的类。
//接口不包含方法的实现，而只包含它们的声明

export class Pet {
    name: string;

    feed(feedType: string) {
      console.log(feedType);
    }
  }

