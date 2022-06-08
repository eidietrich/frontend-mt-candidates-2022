import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'

import { numberFormat, percentFormat } from '../config/utils'

const DUMMY_DATA = [
    {
        name: 'Candidate A',
        urlKey: 'ryan-zinke',
        votes: 4000,
        votePercent: 0.40,
        isFocus: false,
    },
    {
        name: 'Candidate B',
        urlKey: 'ryan-zinke',
        votes: 3000,
        votePercent: 0.30,
        isFocus: true,
    },
    {
        name: 'Candidate C',
        urlKey: 'ryan-zinke',
        votes: 2000,
        votePercent: 0.20,
        isFocus: false,
    },

    {
        name: 'Candidate D',
        urlKey: 'ryan-zinke',
        votes: 1000,
        votePercent: 0.10,
        isFocus: false,
    },
]

const style = css`
    padding: 0.5em;
    .title {
        font-style: italic;
        margin-bottom: 0.5em;
    }
    .result-row {
        display: flex;
        padding: 0.2em;
        height: 18px;
        width: 300px;

        &.winner {
            background-color: var(--tan1);
        }
    }
    .result-row-name {
        flex: 0 0 100px;
        color: var(--gray4);
        margin-right: 0.5em;

    }
    .result-row-percent {
        flex: 0 0 2.5em;
        margin-right: 0.5em;
    }
    .result-row-bar {
        flex: 1 0 100px;
    }
`

const RacePrimaryResults = props => {
    const { title, barFill } = props
    return <div css={style}>
        <div className="title">{title}</div>
        {
            DUMMY_DATA.map(d => <Row key={d.name} barFill={barFill} {...d} />)
        }
    </div>
}

export default RacePrimaryResults

const BAR_RANGE = 180
const Row = ({ name, votes, votePercent, isFocus, barFill, urlKey }) => {
    const barWidth = votePercent * BAR_RANGE
    return <div className={`result-row ${isFocus ? 'winner' : ''}`}>
        <div className="result-row-name"><Link to={urlKey}>{name}</Link></div>
        <div className="result-row-percent">{percentFormat(votePercent)}</div>
        <div className="result-row-bar"><svg>
            <rect fill={barFill} x={0} y={0} height={18} width={barWidth} />
            <text fontSize={12} x={barWidth + 5} y={14}>{numberFormat(votes)} votes</text>
        </svg></div>
    </div>
}
