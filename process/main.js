const {
    getJson,
    getCsv,
    writeJson,
    copyFile,
    copyFolderContents,
    makeUrlKey,
} = require('../utils/functions.js')

const partyLabels = {
    'R': 'Republican candidate',
    'D': 'Democratic candidate',
    'L': 'Libertarian candidate',
    'I': 'Independent candidate',
    'NP': 'Candidate',
}

const candidateFinanceInfo = (candidateName, candidatesInRace, rawResults) => {
    // Grabs campaign finance summary for candidate + competitors
    if (!rawResults) return null // catches races w/out FEC finance data
    const results = rawResults.finances.results

    return candidatesInRace.map(c => {
        const fecMatch = results.find(d => d.candidate_name === c.FECCandidateName) || {
            // fallback for candidates not in FEC campaign finance data
            candidate_id: null,
            candidate_pcc_id: null,
            candidate_pcc_name: null,
            total_receipts: 0,
            total_disbursements: 0,
            cash_on_hand_end_period: 0,
            coverage_end_date: null,
        }
        return {
            isThisCandidate: (c.Name === candidateName),
            displayName: c.Name,
            party: c.Party,
            candidateId: fecMatch.candidate_id, // for links out
            // candidateCommitteeId: fecMatch.candidate_pcc_id,
            candidateCommitteeName: fecMatch.candidate_pcc_name,
            totalReceipts: fecMatch.total_receipts,
            totalDisbursments: fecMatch.total_disbursements,
            cashOnHand: fecMatch.cash_on_hand_end_period,
            coverageEndDate: fecMatch.coverage_end_date,

        }
    })
        .sort((a, b) => b.totalReceipts - a.totalReceipts)
    // .sort((a, b) => a.isThisCandidate ? -1 : 1)
}

const cleanLegislativeCandidates = candidates => {
    return candidates.map(c => {

        return {
            urlKey: `${makeUrlKey(c.District)}-${makeUrlKey(c.Name)}`,
            Name: c.Name,
            District: c.District,
            Party: c.Party,
            Status: c.Status,
            CampaignWebsiteUrl: c.website_url === 'n/a' ? null : c.website_url,
            CampaignFBPageUrl: c.fb_url === 'n/a' ? null : c.fb_url,
            CampaignTwitterUrl: c.twitter_url === 'n/a' ? null : c.twitter_url,
            CampaignInstagramUrl: c.insta_url === 'n/a' ? null : c.insta_url,
            CampaignYoutubeUrl: null, // TODO - add to spreadsheet
        }
    })
}

const main = () => {
    copyFile('inputs/cms/overview.json', 'src/data/overview.json')
    copyFile('inputs/cms/how-to-vote.json', 'src/data/how-to-vote.json')

    copyFolderContents('inputs/portraits/processed/', 'src/images/candidates/')

    const races = getJson('inputs/races.json')
    const candidates = getJson('inputs/cms/candidates.json')
    const financeByRace = getJson('inputs/fec/finance.json')
    const articles = getJson('inputs/coverage/articles.json')
    const rawLegislativeCandidates = getCsv('inputs/legislative/raw-legislative-filings-4-26.csv')

    const legislativeCandidates = cleanLegislativeCandidates(rawLegislativeCandidates)
    writeJson('src/data/legislative-candidates.json', legislativeCandidates)

    candidates.forEach(candidate => {
        const race = races.find(d => d.key === candidate.Race)
        if (!race) {
            console.warn('Missing race', candidate.Race)
        }

        const opponents = candidates
            .filter(d => (d.Race === candidate.Race) && (d.Name !== candidate.Name))
            .map(d => ({
                "urlKey": makeUrlKey(d.Name),
                "Name": d.Name,
                "SummaryLine": d.SummaryLine,
                "isIncumbent": d.isIncumbent,
                "Party": d.Party,
            }))

        candidate.urlKey = makeUrlKey(candidate.Name)
        candidate.partyLabel = partyLabels[candidate.Party]
        candidate.finances = candidateFinanceInfo(
            candidate.Name,
            candidates.filter(d => d.Race === candidate.Race),
            financeByRace.find(d => d.district === candidate.Race),
        )

        // Using makeUrlKey here as a string cleaner
        candidate.articles = articles
            .filter(d => d.tags.nodes.map(t => makeUrlKey(t.name)).includes(makeUrlKey(candidate.Name)))

        candidate.race = {
            label: race.label,
            opponents: opponents,
            hasQuestionnaire: race.hasQuestionnaire,
            campaignFinance: race.campaignFinance,
        }
    })
    writeJson('src/data/candidates.json', candidates)

    const racesOutput = races.map(race => {
        const matchCandidates = candidates.filter(d => d.Race === race.key)
        // TODO - filter to only necessary fields here
        return {
            ...race,
            candidates: matchCandidates,
        }
    })
    writeJson('src/data/races.json', racesOutput)
}

main()