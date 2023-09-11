const path = require('path');
const MyPlugin = require('./plugin/myPlugin')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {

            }
        ]
    },
    plugins: [
        new MyPlugin()
    ],
    mode: 'none'
}