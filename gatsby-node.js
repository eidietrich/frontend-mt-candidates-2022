const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const makeUrlKey = name => name.toLowerCase().replace(/\s/g, '-')

exports.createPages = async ({
    actions: { createPage },
}) => {
    // pull data from Strapi API
    // Switch this to GraphQL?
    const result = await fetch('http://localhost:1337/api/candidates')
    const resultData = await result.json()
    if (resultData.meta.pagination.pageCount > 1) throw `Too many candidates; Figure out pagination`
    const candidates = resultData.data.map(d => d.attributes)

    // TK other data merge + processing logic here as necessary
    // Possibly split processing step out to separate scrip?

    candidates.forEach(candidate => {
        const key = makeUrlKey(candidate.Name)

        createPage({
            path: `/candidates/${key}`,
            component: require.resolve('./src/pages/candidate.js'),
            context: {
                key,
                ...candidate,
            }
        })
    })
}