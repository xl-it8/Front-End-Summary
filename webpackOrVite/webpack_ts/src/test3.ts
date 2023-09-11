//export加了 这个说明是一个模块 就需要导入导出 不是全局可用
// .d.ts 和 .ts文件区别就是一个纯类型 一个是ts结合js

type zfc3 = number

//ts中接口和类 同名情况会合并
class Food {
  cheese: string
}

interface Food {
  bacon: string
  bake(item: string):void
}
const food = new Food()
food.bacon = 'nice bacon'
food.cheese = 'sweet cheese'
//food.bake('sss') //虽然food实例有这个方法 但是执行报错 Error: food.bake is not a function 因为接口只包含声明而不包含实现


Food.prototype.bake = (item) => {console.log(item)} //这样可以正常工作 这样做除了可以实现也有提示
food.bake('dd') //正常


