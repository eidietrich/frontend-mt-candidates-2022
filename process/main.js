const {
    getJson,
    writeJson,
    makeUrlKey,
} = require('../utils/functions.js')

const main = () => {
    const candidates = getJson('inputs/cms/candidates.json')
    candidates.forEach(candidate => {
        candidate.urlKey = makeUrlKey(candidate.Name)
    })
    writeJson('src/data/candidates.json', candidates)
}

main()