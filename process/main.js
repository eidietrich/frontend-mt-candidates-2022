const {
    getJson,
    getCsv,
    writeJson,
    writeText,
    copyFile,
    copyFolderContents,
    makeUrlKey,
} = require('../utils/functions.js')

const partyLabels = {
    'R': 'Republican candidate',
    'D': 'Democratic candidate',
    'L': 'Libertarian candidate',
    'I': 'independent candidate',
    'NP': 'candidate',
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
        // if (!fecMatch.candidate_id) {
        //     console.warn('Missing FEC Canddiate', c.Name, c.FECCandidateName)
        // }
        return {
            isThisCandidate: (c.Name === candidateName),
            displayName: c.Name,
            status: c.status,
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
    return candidates
        .filter(d => d.status === 'won-primary')
        .map(c => {

            return {
                urlKey: `${makeUrlKey(c.District)}-${makeUrlKey(c.Name)}`,
                Name: c.Name,
                District: c.District,
                Party: c.Party,
                Status: c.Status,
                City: c.City,
                CampaignWebsiteUrl: c.website_url === 'n/a' ? null : c.website_url,
                CampaignFBPageUrl: c.fb_url === 'n/a' ? null : c.fb_url,
                CampaignTwitterUrl: c.twitter_url === 'n/a' ? null : c.twitter_url,
                CampaignInstagramUrl: c.insta_url === 'n/a' ? null : c.insta_url,
                CampaignYoutubeUrl: null, // TODO - add to spreadsheet
            }
        })
}

const logCandidateNames = candidates => {
    let textOut = ''
    candidates
        .sort((a, b) => a.Race.localeCompare(b.Race))
        .forEach(candidate => {
            textOut += `
Race: ${candidate.Race}
Name: ${candidate.Name}
Description (e.g., "Billings State Representative"):
${candidate.SummaryLine}

Brief Biography (2-3 grafs):
${candidate.LongSummary || ''}

---
`
        })
    writeText('./text.txt', textOut)
}

const main = () => {
    copyFile('inputs/cms/overview.json', 'src/data/overview.json')
    copyFile('inputs/cms/how-to-vote.json', 'src/data/how-to-vote.json')

    copyFolderContents('inputs/portraits/processed/', 'src/images/candidates/')
    copyFolderContents('inputs/maps/png/', 'src/images/maps/')

    const races = getJson('inputs/races.json')
    const candidates = getJson('inputs/cms/candidates.json')
    const financeByRace = getJson('inputs/fec/finance.json')
    const articles = getJson('inputs/coverage/articles.json')
    const issueAnswers = getJson('inputs/issues/candidate-answers.json')
    const pscAnswers = getJson('inputs/issues/psc-candidate-answers.json')
    const supCoAnswers = getJson('inputs/issues/supco-candidate-answers.json')

    const rawLegislativeCandidates = getCsv('inputs/legislative/legislative-filings-8-1-2022.csv')
    const primaryResults = getJson('inputs/primary-results/results-cleaned.json')

    const legislativeCandidates = cleanLegislativeCandidates(rawLegislativeCandidates)
    writeJson('src/data/legislative-candidates.json', legislativeCandidates)

    candidates.forEach(candidate => {
        const race = races.find(d => d.key === candidate.Race)
        if (!race) {
            console.warn('Missing race', candidate.Race)
        }

        const opponents = candidates
            .filter(d => (d.Race === candidate.Race))
            // && (d.Name !== candidate.Name) // strike this to include all candidates in 'active candidates' listing
            .filter(d => ['on-primary-ballot', 'advancing-to-general', 'won-election'].includes(d.status))
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

        if (race.hasQuestionnaire === 'primary') {
            const candidateIssueAnswers = issueAnswers.find(d => d.name === candidate.Name)
            if (!candidateIssueAnswers) {
                console.warn('No issue answer found for', candidate.Name)
                candidate.issueAnswers = null
            } else {
                candidate.issueAnswers = candidateIssueAnswers.responses
                    .slice(0, 11) // limits to 11 questions for publication
            }
        } else if (race.hasQuestionnaire === 'general') {
            if (['PSC-District-1', 'PSC-District-5'].includes(race.key)) {
                const candidateIssueAnswers = pscAnswers.find(d => d.name === candidate.Name)
                if (!candidateIssueAnswers) {
                    console.warn('No issue answer found for', candidate.Name)
                    candidate.issueAnswers = null
                } else {
                    candidate.issueAnswers = candidateIssueAnswers.responses
                }
            }
            if (['SupCo-1', 'SupCo-2'].includes(race.key)) {
                const candidateIssueAnswers = supCoAnswers.find(d => d.name === candidate.Name)
                if (!candidateIssueAnswers) {
                    console.warn('No issue answer found for', candidate.Name)
                    candidate.issueAnswers = null
                } else {
                    candidate.issueAnswers = candidateIssueAnswers.responses
                }
            }
        } else {
            candidate.issueAnswers = null
        }


        // Using makeUrlKey here as a string cleaner
        candidate.articles = articles
            .filter(d => d.tags.nodes.map(t => makeUrlKey(t.name)).includes(makeUrlKey(candidate.Name)))
            .map(d => ({
                title: d.title,
                date: d.date,
                link: d.link,
            }))

        const primaryResultsForCandidate = primaryResults.find(d => (d.race === race.key) && (d.party) === candidate.Party)

        candidate.race = {
            label: race.label,
            opponents: opponents,
            hasQuestionnaire: race.hasQuestionnaire,
            campaignFinance: race.campaignFinance,
            primaryResults: primaryResultsForCandidate && primaryResultsForCandidate.resultsTotal || [],
            resultsTimestamp: primaryResultsForCandidate && primaryResultsForCandidate.reportingTime || null,
        }
    })
    writeJson('src/data/candidates.json', candidates)

    const racesOutput = races.map(race => {
        const matchCandidates = candidates.filter(d => d.Race === race.key)
        const partiesInRace = Array.from(new Set(matchCandidates.map(d => d.Party)))
        // console.log(race.key, partiesInRace)
        // TODO - filter to only necessary fields here
        return {
            ...race,
            candidates: matchCandidates,
            primaryResults: partiesInRace.map(party => {
                const match = primaryResults.find(d => (d.race === race.key) && (d.party) === party)
                return {
                    party,
                    primaryResults: match && match.resultsTotal || [],
                    resultsTimestamp: match && match.reportingTime || null,
                }
            })
        }
    })
    writeJson('src/data/races.json', racesOutput)


}

main()