const {
    getJson,
    writeJson,
    copyFile,
    copyFolderContents,
    makeUrlKey,
} = require('../utils/functions.js')

// TODO - refactor to separate file
const RACES = [
    {
        key: 'US-House-1-West',
        label: 'U.S. House District 1 (West)',
        description: `Western Montana representative in Congress. District includes Missoula, Bozeman, Kalispell and Butte.`,
        note: `Each party's winning candidate in the June 7 primary will advance to the Nov. 8 general election.`,
        hasQuestionnaire: true,
        campaignFinance: 'fec',
    },
    {
        key: 'US-House-2-East',
        label: 'U.S. House District 2 (East)',
        description: `Eastern Montana representative in Congress. District includes Billings, Helena, Havre and Miles City.`,
        note: `Each party's winning candidate in the June 7 primary will advance to the Nov. 8 general election. Independent candidates must gather 8,722 signatures to qualify for the general election ballot.`,
        hasQuestionnaire: true,
        campaignFinance: 'fec',
    },
    {
        key: 'PSC-District-1',
        label: 'Public Service Commission District 1',
        description: `One of five seats on Montana's utility regulation board (three seats are out of cycle). District includes Great Falls and the Hi-Line.`,
        note: `Each party's winning candidate in the June 7 primary will advance to the Nov. 8 general election.`,
        campaignFinance: 'copp'
    },
    {
        key: 'PSC-District-5',
        label: 'Public Service Commission District 5',
        description: `One of five seats on Montana's utility regulation board. District includes Kalispell and Helena.`,
        note: `Each party's winning candidate in the June 7 primary will advance to the Nov. 8 general election.`,
        campaignFinance: 'copp'
    },
    {
        key: 'SupCo-1',
        label: 'Montana Supreme Court (Seat 1)',
        isNonpartisan: true,
        description: `One of seven seats on Montana's state Supreme Court (five of seven seats are out of cycle). Elected on a statewide basis.`,
        note: `Judical elections are officially nonpartisan. The two candidates for the seat who receive the most votes in the June 7 primary will advance to the Nov. 8 general election.`,
        campaignFinance: 'copp'
    },
    {
        key: 'SupCo-2',
        label: `Montana Supreme Court (Seat 2)`,
        isNonpartisan: true,
        description: `One of seven seats on Montana's state Supreme Court (five of seven seats are out of cycle). Elected on a statewide basis.`,
        note: `Judical elections are officially nonpartisan. The two candidates for the seat who receive the most votes in the June 7 primary will advance to the Nov. 8 general election.`,
        campaignFinance: 'copp'
    },
]

partyLabels = {
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

const main = () => {
    copyFile('inputs/cms/overview.json', 'src/data/overview.json')
    copyFolderContents('inputs/portraits/processed/', 'src/images/candidates/')

    const candidates = getJson('inputs/cms/candidates.json')
    const financeByRace = getJson('inputs/fec/finance.json')
    const articles = getJson('inputs/coverage/articles.json')

    candidates.forEach(candidate => {
        const race = RACES.find(d => d.key === candidate.Race)
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

    const races = RACES.map(race => {
        const matchCandidates = candidates.filter(d => d.Race === race.key)
        // TODO - filter to only necessary fields here
        return {
            ...race,
            candidates: matchCandidates,
        }
    })
    writeJson('src/data/races.json', races)
}

main()