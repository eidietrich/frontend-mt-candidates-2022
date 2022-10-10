// Pulls campaign finance data from FEC API
// On a by-race basis

// Source pages:
// West (MT-01) - https://www.fec.gov/data/elections/house/MT/01/2022/
// East (MT-02) - https://www.fec.gov/data/elections/house/MT/02/2022/
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

require('dotenv').config()
// Expects FEC_API_KEY="xxxx" in a .env file at root
// See https://www.npmjs.com/package/dotenv

const OUT_PATH = './inputs/fec/finance.json'

const { FEC_API_KEY } = process.env

const ST = 'mt'
const STATE = 'Montana'

const {
    writeJson,
} = require('../../utils/functions.js')

// districts '01' or '02'
const fetchRaceData = async (cycle, office, district) => {
    const url = `https://api.open.fec.gov/v1/elections/?api_key=${FEC_API_KEY}&cycle=${cycle}&election_full=true&office=${office}&state=${ST}&stateFull=${STATE}&district=${district}&per_page=100&sort_hide_null=true`
    console.log(url)
    const result = await fetch(url)
    const resultData = await result.json()
    return resultData

}

async function main() {
    const house01 = await fetchRaceData('2022', 'house', '01')
    const house02 = await fetchRaceData('2022', 'house', '02')

    const combined = [
        {
            district: 'US-House-1-West',
            finances: house01,
        },
        {
            district: 'US-House-2-East',
            finances: house02,
        },
    ]

    writeJson(OUT_PATH, combined)
    console.log('FEC fetch done\n')
}
main()