const {
    getJson,
} = require('./utils/functions.js')

const candidates = getJson('./src/data/candidates.json')
const races = getJson('./src/data/races.json')

exports.createPages = async ({
    actions: { createPage },
}) => {

    // Create pages
    candidates.forEach(candidate => {
        createPage({
            path: `/candidates/${candidate.urlKey}`,
            component: require.resolve('./src/templates/candidate.js'),
            context: {
                ...candidate,
            }
        })
    })
}