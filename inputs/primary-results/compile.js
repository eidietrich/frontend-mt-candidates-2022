// compile voter data from downloads as JSON
// Download data from SOS website, e.g. https://electionresults.mt.gov/resultsSW.aspx?type=HOUSE&map=DIST

const reader = require('xlsx')

const {
    writeJson,
} = require('../../utils/functions.js')

const PATH_FED = './inputs/primary-results/raw/FED Results.xlsx'
const PATH_PSC = './inputs/primary-results/raw/PSC Results.xlsx'
const PATH_SCJ = './inputs/primary-results/raw/SCJ Results.xlsx'

const PATH_OUT = './inputs/primary-results/results-raw.json'

console.log('CHECK: Did you download new files from the SOS website and put them in ./inputs/primary-results/raw/? https://electionresults.mt.gov/resultsSW.aspx\n')

const fedFile = reader.readFile(PATH_FED)
const pscFile = reader.readFile(PATH_PSC)
const scjFile = reader.readFile(PATH_SCJ)


const fed = fedFile.SheetNames.map(sheet => getSheetData(fedFile, sheet))
const psc = pscFile.SheetNames.map(sheet => getSheetData(pscFile, sheet))
const scj = scjFile.SheetNames.map(sheet => getSheetData(scjFile, sheet))

const combined = fed.concat(psc).concat(scj)
writeJson(PATH_OUT, combined)

function getSheetData(file, sheetName) {
    const raw = reader.utils.sheet_to_json(file.Sheets[sheetName])

    const meta = raw.map(d => d['2022 Unofficial Primary Election Results'])
    // console.log(raw)

    const race = raw[3]['2022 Unofficial Primary Election Results'].replace('\r\n', ' ')
    const party = sheetName.slice(0, 3).replace(' ', '')
    const reportingTime = raw[2]['2022 Unofficial Primary Election Results'].replace('Downloaded at ', '')

    const cols = Object.values(raw.find(d => d['__EMPTY'] === 'County')).slice(2,).map(d => d.split('\r')[0])
    const totals = Object.values(raw.find(d => d['__EMPTY'] === 'TOTALS')).slice(1,)

    const counties = raw.slice(4, -1)

    const resultsTotal = cols.map((col, i) => {
        return {
            candidate: col,
            votes: totals[i],
        }
    })

    const resultsByCounty = counties.map(county => {
        return cols.map((col, i) => {
            return {
                candidate: col,
                county: county.__EMPTY,
                votes: Object.values(county).slice(1,)[i],
            }
        })
    }).flat()

    console.log({ race, reportingTime })

    return {
        race,
        party,
        precinctsFull: 'TK',
        precinctsPartial: 'TK',
        reportingTime: reportingTime,
        resultsTotal,
        resultsByCounty
    }
}