import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'

import Portrait from './Portrait'

import {
    partyColor,
} from '../config/config'

const style = css`
    border: 1px solid var(--tan6);
    background-color: var(--tan1);
    box-shadow: 1px 1px 3px #666;

    position: relative;
    margin: 0.5em;
    width: 300px;
    a {
        display: flex;
        flex-wrap: wrap;

        color: #222;
        :hover {
            text-decoration: none;
            color: var(--link);
            /* opacity: 0.9; */
            background-color: #eee;
        }
    }

    .portrait {
        width: 75px;
        background-color: #666;
    }
    .col {
        flex: 0 1 180px;
        padding: 0.5em;

        .name {
            font-size: 1.2em;
            font-weight: bold;
        }
        .summary {
            font-style: italic;
            font-size: 0.9em;
            line-height: 1em;
        }
        .fakelink {
            color: var(--tan5);
            font-style: italic;
            position: absolute;
            bottom: 3px;
            right: 0.5em;
            :hover {
                color: var(--link);
            }
        }
    }
`

const CandidateCard = props => {
    const { Name, SummaryLine, Party, urlKey, portrait } = props
    return <div css={style}><Link to={`/${urlKey}`}>
        <div className="portrait">
            <Portrait
                image={portrait}
                barColor={partyColor(Party)}
                alt={Name}
            />
        </div>
        <div className="col">
            <div className="name">{Name}</div>
            <div className="summary">{SummaryLine}</div>
            <div className="fakelink">See more »</div>
        </div>
    </Link></div>
}

export default CandidateCard