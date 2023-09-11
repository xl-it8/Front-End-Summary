
// <reference path="test4.d.ts"/>
// import * as URL from "url";
// import {alb,A} from 'test4'

let az:na2 ='dd'
// let zbs:alb = 3




//虽然有了ts检查 但是还是能打包成功
type info = {
  name: string
  age: number
  gender: number
}

type otherInfo = {
  like: string
  grade: number
  height: number
  name: string
}
// Partial 转为可选项
type partInfo = Partial<info>
//keyof T ==> 'name' | 'age' | 'gender'
// type Partial<T> = { [P in keyof T]? : T[P]}

type requiredInfo = Required<info>

// Readonly 转为仅读
type onlyInfo = Readonly<info>

//Record 将 K 中所有的属性的值转化为 T 类型
// type Record<k extends keyof any, T> ={[P in keyof k] : T}

// type like = 'playPingPang'  | 'ok' | 'name'
type tranInfo = Record<keyof info, string>

//Pick从T中选取一系列的K属性
type pickInfo = Pick<otherInfo, 'height' | 'like'>

type TypeName<T> = T extends string
  ? string
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : 'object'

const newform: TypeName<string> = '90'

// type Exclude<T, U> = T extends U ? never : T;
// type T = Exclude<1 | 2, 1 | 3> // -> 2
// (1 extends 1|3 ? never : T )| (2 extends 1 | 3 ?never: T) ==> never | 2 ==> 2

const num: never | 2 = 2 //==>直接是2

// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any
// function foo(x: number): Array<number> {
//   return [x]
// }
// type fn = ReturnType<typeof foo>
interface StringValidator {
  isAcceptable(s: string): boolean
}

let lettersRegexp = /^[A-Za-z]+$/
let numberRegexp = /^[0-9]+$/

class LettersOnlyValidator implements StringValidator {
  //仅字母
  isAcceptable(s: string) {
    return lettersRegexp.test(s)
  }
}

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s)
  }
}

// Some samples to try
let strings = ['Hello', '98052', '101']

// Validators to use
let validators: { [s: string]: StringValidator } = {}
validators['ZIP code'] = new ZipCodeValidator()
validators['Letters only'] = new LettersOnlyValidator()

// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
    let isMatch = validators[name].isAcceptable(s)
    console.log(`'${s}' ${isMatch ? 'matches' : 'does not match'} '${name}'.`)
  }
}

//函数重载
let myDeck = [
  { name: 'diamonds', age: 2 },
  { name: 'spades', age: 10 },
  { name: 'hearts', age: 4 },
]
function cz(s: { name: string; age: number }[]): number
function cz(s: number): { name: string; age: number }
function cz(s: string): boolean
function cz(x) {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the age
  if (typeof x == 'object') {
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  }
  // Otherwise just let them pick the card
  else if (typeof x == 'number') {
    return { name: 'lj', age: x % 13 }
  } else if (typeof x == 'string') {
    return x === '问'
  }
}
cz(myDeck)
let ss = 45
type recordI = Record<string, any>
let name2: recordI = {
  l: '3',
  [ss]: 45,
}
console.log(typeof name2[ss] === 'number')

let person = {
  name: 'lj',
  age: 20,
  address: {
    province: '北京市',
    area: '福州',
    list: [{ a: '2' }],
  },
}

let a = 'post' as 'post'
type a = typeof a
type Person = typeof person

enum method {
  'GET' = 8,
  'POST',
  'PUT',
  'DELETE',
}

type IMe = typeof method
// let useMethod: IMe = 'PUT'

//处理函数
function fn(a: number, b: number): number {
  return a + b
}

type Ifn = typeof fn //(a: number, b: number) => number

//作用 typeof 帮我们快速确定类型

class Country {
  constructor(x = 'sh', y = 'bj') {}
}
type ICountry = typeof Country

function createCountry(constructor: ICountry) {
  return new constructor() // new (x?: string, y?: string) => Country
}

//函数几种类型
type fn1 = (n: number) => number //箭头函数写法
let fn2 = function (adapter: number): void {} //匿名函数
function fn3(a: number): number {
  //普通函数
  return a
}

interface IFn<T, Q> {
  name: string
  <T, Q>(arg: Q): T //接口里的方法定义
}

//type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
let obj3 = {
  width: '3',
  height: '3',
  radius: '3',
}
//Exclude<keyof T, K>
type obj4 = Omit<typeof obj3, 'width' | 'height'> //只剩下radius

type he = typeof obj3 & {
  'Content-Type': string
}

// let he2:he ={
//   width: '3',
//   height: '3',
//   radius: '3',
//   'Content-Type': '3'
// }

// [Key in Method as Lowercase<Key>]: AxiosHeaders;
type Method = 'PUT' | 'GET'
type newMethod = { [key in Method as Lowercase<key>]: string }
// const str ='SRTB' as Lowercase<'SRTB'>

interface AA {
  // (name:string):void;
  dd(): void
}

// interface BB {
//   dd:AA
// }

// const Afn:AA = function(e){

// }
// Afn(3)

//Record<string, any>
// let A2:Record<string, boolean> = {
//   a:3,
//   f:4,
//   5:true
// }

//对象是成员多的可以赋值给成员少的
//函数是成员少的可以给成员多的

// namespace Space {}
// module '*.vue' {

// }

let a3: zfc3 = 33


