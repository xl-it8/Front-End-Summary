//export加了 这个说明是一个模块 就需要导入导出 不是全局可用
//有namespace的话 .d.ts 文件中的顶级声明必须以 "declare" 或 "export" 修饰符开头。
declare module 'test5' {
    type alb = string
     namespace A {
        type B = number
        type Z = number
         class S {
             name: string;
             getName():string
         }
     }
    //  type C = string
    //  export default  C
}
