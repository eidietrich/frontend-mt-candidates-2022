

const {
    getJson,
    writeJson,
    makeUrlKey,
} = require('../../utils/functions.js')



const PATH_RAW = './inputs/primary-results/results-raw.json'
const PATH_OUT = './inputs/primary-results/results-cleaned.json'

const races = getJson('inputs/races.json')
const candidates = getJson('inputs/cms/candidates.json')

const partyClean = {
    'REP': 'R',
    'DEM': 'D',
    'LIB': 'L',
    'NP': 'NP',
}

const data = getJson(PATH_RAW)

// cleaning
data.forEach(d => {

    d.race = races.find(race => race.sosKey === d.race).key
    d.party = partyClean[d.party]

    const totalVotes = d.resultsTotal.reduce((acc, obj) => acc + obj.votes, 0)
    const winnerVotes = d.resultsTotal.reduce((acc, obj) => obj.votes >= acc ? obj.votes : acc, 0)

    d.resultsTotal.forEach(r => {
        const nameMatch = candidates.find(c => c.BallotName === r.candidate)
        r.candidate = nameMatch.Name
        r.urlKey = makeUrlKey(nameMatch.Name)
        r.votePercent = r.votes / totalVotes
        r.isWinner = (r.votes === winnerVotes) && (r.votes > 0)
    })
    d.totalVotes = totalVotes
    d.winnerVotes = winnerVotes
    d.reportingTime = new Date(d.reportingTime)

    // counties
    const countyNames = Array.from(new Set(d.resultsByCounty.map(d => d.county)))
    // console.log(d.race, d.party, countyNames)
    countyNames.forEach(c => {
        const countyResults = d.resultsByCounty.filter(d => d.county === c)
        const countyTotalVotes = countyResults.reduce((acc, obj) => acc + obj.votes, 0)
        // const countyWinnerVotes = countyResults.reduce((acc, obj) => obj.votes >= acc ? obj.votes : acc, 0)
        const countyWinnerVotes = countyResults.sort((a, b) => b.votes - a.votes)[0].votes
        const runnerUpVotes = countyResults.sort((a, b) => b.votes - a.votes)[1].votes

        countyResults.forEach(r => {
            const nameMatch = candidates.find(c => c.BallotName === r.candidate)
            r.candidate = nameMatch.Name
            r.votePercent = (countyTotalVotes > 0) ? r.votes / countyTotalVotes : 0
            r.isCountyWinner = (r.votes === countyWinnerVotes) && (r.votes > 0)
            r.winnerMargin = (r.votes === countyWinnerVotes) ? r.votes - runnerUpVotes : null
            r.winnerPercentMargin = ((r.votes === countyWinnerVotes) && (countyTotalVotes > 0)) ? (r.votes - runnerUpVotes) / countyTotalVotes : null
        })
    })


})

writeJson(PATH_OUT, data)