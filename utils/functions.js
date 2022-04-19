const fs = require('fs')

module.exports.getJson = (path) => JSON.parse(fs.readFileSync(path))

module.exports.writeJson = (path, data) => {
    fs.writeFile(path, JSON.stringify(data, null, 2), err => {
        if (err) throw err
        console.log('Written to', path)
    }
    );
}

module.exports.copyFile = (src, dest) => {
    fs.copyFile(src, dest, err => {
        if (err) throw err
        console.log('Copied to', dest)
    })
}

module.exports.makeUrlKey = name => name.toLowerCase()
    .replace(/\s/g, '-').replace('/\./g', '').replace("'", '')
