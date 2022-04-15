const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const {
    writeJson,
} = require('../../utils/functions.js')

const getCandidates = async () => {
    const result = await fetch('http://localhost:1337/api/candidates')
    const resultData = await result.json()
    if (resultData.meta.pagination.pageCount > 1) throw `Too many candidates; Figure out pagination`
    const candidates = resultData.data.map(d => d.attributes)
    return candidates
}
const getOverviewPage = async () => {
    const result = await fetch('http://localhost:1337/api/overview-page')
    const resultData = await result.json()
    const overviewPage = resultData.data.attributes
    return overviewPage
}

const main = async () => {
    const candidates = await getCandidates()
    writeJson('./inputs/cms/candidates.json', candidates)
    const overview = await getOverviewPage()
    writeJson('./inputs/cms/overview.json', overview)

}

main()

