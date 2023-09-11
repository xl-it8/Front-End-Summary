// import { Observable } from "./observable";
// Observable.prototype.map = function (f) { //the compiler doesn’t know about Observable.prototype.map.
//   // ... another exercise for the reader
// };   错误做法
// 模块名称的解析方式与导入/导出中的模块说明符相同。有关更多信息，请参阅模块。然后，扩充中的声明被合并，就好像它们是在与原始文件相同的文件中声明的一样。
// export {}
import { Observable } from './observable'

declare module './observable' {
  interface Observable<T> {
    map<U>(f: (x: T) => U): Observable<U>
  }
}
// Observable.prototype.map = function (f) {
//   // ... another exercise for the reader
// }
