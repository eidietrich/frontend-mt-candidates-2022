const {
    getJson,
} = require('./utils/functions.js')

const candidates = getJson('./src/data/candidates.json')

exports.createPages = async ({
    actions: { createPage },
}) => {

    // Create pages
    candidates.forEach(candidate => {
        createPage({
            path: `/${candidate.urlKey}`,
            component: require.resolve('./src/templates/candidate.js'),
            context: {
                ...candidate,
                imagePath: `${candidate.urlKey}.png`
            }
        })
    })

}