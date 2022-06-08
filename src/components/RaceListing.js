import React from 'react'
import { css } from '@emotion/react'

import { raceMaps } from '../config/map-config'
import CandidateCard from './CandidateCard'
import RacePrimaryResults from './RacePrimaryResults'

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
                .filter(d => ['on-primary-ballot', 'advancing-to-general'].includes(d.status))
                .sort((a, b) => surname(a.Name).localeCompare(surname(b.Name)))
                // .sort((a, b) => a.isIncumbent ? -1 : 0) // Broke Firefox
                .map(candidate => <CandidateCard key={candidate.urlKey} {...candidate} />)
            }
        </div>
        {/* {
            (party !== 'Independent') && <RacePrimaryResults
                barFill={color}
                title={`Results of June 7 ${party} primary`}
            />
        } */}

    </div>
}