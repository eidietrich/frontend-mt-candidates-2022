const fs = require('fs')

module.exports.getJson = (path) => JSON.parse(fs.readFileSync(path))

module.exports.writeJson = (path, data) => {
    fs.writeFile(path, JSON.stringify(data, null, 2), function (err) {
        if (err) throw err;
        console.log('Written to', path);
    }
    );
}

module.exports.makeUrlKey = name => name.toLowerCase().replace(/\s/g, '-')
