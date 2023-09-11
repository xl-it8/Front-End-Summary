const path = require('path')

const appPath = process.cwd() //获取该项目的文件夹的路径 

function resolvePath(relativePath) {
    return path.resolve(appPath, relativePath)
}


module.exports = resolvePath