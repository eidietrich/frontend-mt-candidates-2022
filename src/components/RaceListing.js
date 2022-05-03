import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'

import { raceMaps } from '../config/map-config'

import Portrait from './Portrait'

import {
    partyColor,
    parties,
} from '../config/config'

const surname = fullName => {
    const split = fullName.split(' ')
    if (split.length < 2) return ''
    return split[1]
}

const style = css`
    .Race {
        border-bottom: 1px solid var(--tan2);
        padding-bottom: 1em;
        margin-bottom: 0.5em;
       
        .district-map {
            display: flex;
            justify-content: center;
            svg {
                width: 100%;
                max-width: 600px;
            }
        }
        .slates {
            display: flex;
            flex-wrap: wrap;
        }
    }
    .PartySlate {
        flex: 1 0 300px;
        margin: 0.5em auto;
        
        .party-name {
            text-transform: uppercase;
            margin-left: 0.5em;
        }
        .candidates {
            display: flex;
            flex-wrap: wrap;
        }
    }

    .Candidate {
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
    }
`

const RaceListing = props => {
    const { races } = props
    const mergedRaces = races.map(race => {
        const match = raceMaps.find(d => d.key === race.key)
        return { ...race, districtMap: match.map }
    })
    return <div css={style}>
        {
            mergedRaces.map(race => <Race slug={race.key} {...race} />)
        }
    </div>
}

export default RaceListing

const Race = props => {
    const { slug, label, description, note, candidates, isNonpartisan, districtMap } = props
    return <div className="Race" id={slug}>
        <h2 className="hed">{label}</h2>
        <div className="description">{description}</div>
        <div className="district-map">{districtMap}</div>
        <div className="slates">
            {
                isNonpartisan && <PartySlate party="Nonpartisan" candidates={candidates} color="#666" />
            }
            {
                !isNonpartisan && parties.map(p => {
                    const candidatesInParty = candidates.filter(d => d.Party === p.key)
                    if (candidatesInParty.length === 0) return null
                    const color = partyColor(p.key)
                    return <PartySlate key={p.key} party={p.label} color={color} candidates={candidatesInParty} />
                })
            }
        </div>
        <div className="note">{note}</div>
    </div >
}

const PartySlate = props => {
    const { party, candidates, color } = props
    if (candidates.length === 0) return null
    const slateStyle = css`border-left: 3px solid ${color};`
    return <div className="PartySlate" css={slateStyle}>
        <div className="party-name" style={{ color: color }}>{party}</div>
        <div className="candidates">
            {candidates
                .sort((a, b) => surname(a.Name).localeCompare(surname(b.Name)))
                .sort((a, b) => a.isIncumbent ? -1 : 0)
                .map(candidate => <Candidate key={candidate.urlKey} {...candidate} />)
            }
        </div>
    </div>
}

const Candidate = props => {
    const { Name, SummaryLine, Party, urlKey } = props
    // const color = partyColor(Party)
    // const portraitBarCss = css`border-top: 8px solid ${color};`
    return <div className="Candidate"><Link to={`/candidates/${urlKey}`}>
        {/* <div className="portrait" css={portraitBarCss}></div> */}
        <div className="portrait">
            <Portrait
                filename={`${urlKey}.png`}
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