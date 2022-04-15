const {
    getJson,
} = require('./utils/functions.js')

const candidates = getJson('./src/data/candidates.json')

exports.createPages = async ({
    actions: { createPage },
}) => {

    candidates.forEach(candidate => {
        const key = candidate.urlKey

        createPage({
            path: `/candidates/${key}`,
            component: require.resolve('./src/pages/candidate.js'),
            context: {
                ...candidate,
            }
        })
    })
}