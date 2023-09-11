import babel from 'rollup-plugin-babel'
export default {
    input:'./src/index.js',
    output:{
        file:'./dist/vue.js',
        name:'Vue',//global.vue
        format:'umd', //支持多个模块语法
        sourcemap:true
    },
    plugin:[
        babel({
            exclude:'node_modules/**' //排除node_modules文件的babel处理
        })
    ]
}