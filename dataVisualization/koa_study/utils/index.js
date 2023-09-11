const fs = require('fs')
module.exports = (baseUrl) => {
    return new Promise((resolve, reject) => {
        fs.readFile(baseUrl, 'utf8', (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}