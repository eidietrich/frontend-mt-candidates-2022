const {
    getJson,
    writeJson,
    copyFile,
    makeUrlKey,
} = require('../utils/functions.js')

// TODO - refactor to separate file
const RACES = [
    {
        key: 'US-House-1-West',
        label: 'U.S. House District 1 (West)',
        description: `Western Montana representative in Congress. District includes Missoula, Bozeman, Kalispell and Butte.`,
        note: `Each party's winning candidate in the June 7 primary will advance to the Nov. 8 general election.`
    },
    {
        key: 'US-House-2-East',
        label: 'U.S. House District 2 (East)',
        description: `Eastern Montana representative in Congress. District includes Billings, Helena, Havre and Miles City.`,
        note: `Each party's winning candidate in the June 7 primary will advance to the Nov. 8 general election. Independent candidates must gather 8,722 signatures to qualify for the general election ballot.`

    },
    {
        key: 'PSC-District-1',
        label: 'Public Service Commission District 1',
        description: `One of five seats on Montana's utility regulation board (three seats are out of cycle). District includes Great Falls and the Hi-Line.`,
        note: `Each party's winning candidate in the June 7 primary will advance to the Nov. 8 general election.`
    },
    {
        key: 'PSC-District-5',
        label: 'Public Service Commission District 5',
        description: `One of five seats on Montana's utility regulation board. District includes Kalispell and Helena.`,
        note: `Each party's winning candidate in the June 7 primary will advance to the Nov. 8 general election.`
    },
    {
        key: 'SupCo-1',
        label: 'Montana Supreme Court (Seat 1)',
        isNonpartisan: true,
        description: `One of seven seats on Montana's state Supreme Court (five of seven seats are out of cycle). Elected on a statewide basis.`,
        note: `Judical elections are officially nonpartisan. The two candidates for the seat who receive the most votes in the June 7 primary will advance to the Nov. 8 general election.`
    },
    {
        key: 'SupCo-2',
        label: `Montana Supreme Court (Seat 2)`,
        isNonpartisan: true,
        description: `One of seven seats on Montana's state Supreme Court (five of seven seats are out of cycle). Elected on a statewide basis.`,
        note: `Judical elections are officially nonpartisan. The two candidates for the seat who receive the most votes in the June 7 primary will advance to the Nov. 8 general election.`,
    },
]

const main = () => {
    copyFile('inputs/cms/overview.json', 'src/data/overview.json')

    const candidates = getJson('inputs/cms/candidates.json')
    candidates.forEach(candidate => {
        candidate.urlKey = makeUrlKey(candidate.Name)
    })
    console.log(candidates.map(d => d.Name))
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