import React from 'react'
import { css } from '@emotion/react'

import { partyColor } from '../config/config'
import { dollarFormatResponsive, dateFormat } from '../config/utils'

const FEC_PAGES = {
    'US-House-1-West': 'https://www.fec.gov/data/elections/house/MT/01/2022/',
    'US-House-2-East': 'https://www.fec.gov/data/elections/house/MT/02/2022/'
}

const style = css`
    .ledein {
        margin: 0.5em 0;
        margin-bottom: 1em;
    }

    .table {
        max-width: 600px;
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        /* border-bottom: 1px solid var(--tan2); */
        margin: 0.2em 0;
        padding: 0.4em;
    }
    .row.focus {
        background: var(--tan1);
    }
    .row.thead {
        font-style: italic;
        color: var(--gray5);
    }
    .label-cell {
        flex: 0 0 8em;
        
    }
    .num-cell {
        flex: 1 0 auto;
        padding: 0.2em;
        font-weight: bold;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        @media screen and (max-width: 350px) {
            font-size: 12px;
        }
    }

    .note-line {
        font-size: 0.8em;
        font-style: italic;
        margin-left: 0.2em;
    }
`

const CampaignFinance = (props) => {
    const { finances, race } = props

    const fecRaceSummaryUrl = FEC_PAGES[race]
    if (!fecRaceSummaryUrl) console.warn('Missing FEC race page for:', race)

    return <div css={style}>
        <div className="ledein">Based on reporting required by the U.S. Federal Election Commission. See individual candidate pages on the FEC website or the FEC's <a href={fecRaceSummaryUrl}>race summary page</a> for more information.</div>
        <div className="table">
            <div className="row thead">
                <div className="label-cell">Candidate</div>
                <div className="num-cell">Raised</div>
                <div className="num-cell">Spent</div>
                <div className="num-cell">Remaining</div>
            </div>
            {
                finances.map((d, i) => <Row key={String(i)} {...d} />)
            }
        </div>
    </div>
}

export default CampaignFinance

const Row = props => {
    const {
        isThisCandidate,
        displayName,
        party,
        candidateCommitteeName,
        candidateId,
        totalReceipts,
        totalDisbursments,
        cashOnHand,
        coverageEndDate,
    } = props
    const candidatePageUrl = `https://www.fec.gov/data/candidate/${candidateId}/?cycle=2022&election_full=true`
    const borderCss = css`
        border: 1px solid ${partyColor(party)};
        border-left: 4px solid ${partyColor(party)};
    `
    return <div className={`row ${isThisCandidate ? 'focus' : ''}`} css={borderCss}>
        <div className="label-cell">
            <div>{displayName} ({party})</div>
            <div className="note-line">
                {
                    coverageEndDate && <div>
                        <div><a href={candidatePageUrl}>{candidateCommitteeName}</a></div>
                        <div>thru {dateFormat(new Date(coverageEndDate))}</div>
                    </div>
                }
                {
                    !coverageEndDate && <span>No FEC filings on record</span>
                }
            </div>
        </div>
        <div className="num-cell">{dollarFormatResponsive(totalReceipts)}</div>
        <div className="num-cell">{dollarFormatResponsive(totalDisbursments)}</div>
        <div className="num-cell">{dollarFormatResponsive(cashOnHand)}</div>
    </div>
}

