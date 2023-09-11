#!/usr/bin/env node

const path = require('path')

const config = require(path.resolve('webpack.config.js'))
// console.log(config)
//编译器
const Compiler = require('../lib/Compiler.js')
let complier = new Compiler(config)
//webpack开始解析
complier.run()