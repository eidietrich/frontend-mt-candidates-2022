const {
    getJson,
} = require('./utils/functions.js')

const candidates = getJson('./src/data/candidates.json')
const races = getJson('./src/data/races.json')

exports.createPages = async ({
    actions: { createPage },
}) => {

    candidates.forEach(candidate => {
        const key = candidate.urlKey
        const race = races.find(d => d.key === candidate.Race)

        candidate.race = {
            // only including necessary data here
            label: race.label,
        }

        createPage({
            path: `/candidates/${key}`,
            component: require.resolve('./src/pages/candidate.js'),
            context: {
                ...candidate,
            }
        })
    })
}