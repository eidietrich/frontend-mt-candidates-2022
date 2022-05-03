import React, { useState } from 'react'
import { css } from '@emotion/react'

import { SocialTagUnLabeled } from '../library/SocialTag'

import { partyColor } from '../config/config'
import { cleanNameString } from '../config/utils'

import TruncatedContainer from '../library/TruncatedContainer'
import TextInput from '../library/TextInput'

const style = css`
    max-width: 800px;
    margin: auto;
`

const tableStyle = css`
    width: 100%;
    max-width: 600px;
    margin: auto;
    margin-top: 0.5em;
    thead {
        
    }
    tbody {
        border-top: 1px solid #ddd;
        background-color: #eae3da;
    }
    tr {
        /* border-bottom: 1px solid #ddd; */
        border-bottom: 1px solid #473d29;
        margin: 0 0.2em;

        :first-of-type {
            border-top: 1px solid #473d29;
        }
    }
    td {
        padding: 0.5em 0.5em;
    }
    th {
        font-weight: normal;
        font-style: italic;
        vertical-align: bottom;
        padding: 0.3em 0.5em;
    }
`

const col1 = css`
    min-width: 3em;
    text-align: center;
    /* padding: 0.5em 0.2em !important; */
`
const col2 = css`
    min-width: 2em;
    text-align: center;
`
const col3 = css`
    min-width: 4em;
    /* padding: 0.5em 0 !important; */
    /* text-align: right; */
`
const col4 = css`
    min-width: 4em;
    /* padding: 0.5em 0 !important; */
    /* text-align: right; */
`
// const clickableCol = css`
//     cursor: pointer;
//     :hover {
//         color: var(--link);
//     }
//     :before {
//         font-style: normal;
//         content: '⇅'
//     }
// `
// const activeCol = css`
//     cursor: pointer;
//     color: var(--link);
// `
// const sortNotReversed = css`
//     :before {
//         font-style: normal;
//         content: '↑'
//     }
// `
// const sortReversed = css`
//     :before {
//         font-style: normal;
//         content: '↓'
//     }
// `

const partyOrder = ['R', 'D', 'L', 'G', 'I']
const sortFunctions = {
    district: (a, b) => {
        if (a.District[0] !== b.District[0]) {
            return a.District[0].localeCompare(b.District[0])
        } else {
            return +a.District.substring(2,) - +b.District.substring(2,)
        }
    },
    party: (a, b) => partyOrder.indexOf(a.Party) - partyOrder.indexOf(b.Party),
    name: (a, b) => a.Name.localeCompare(b.Name),

}

const LegislativeCandidates = ({ candidates }) => {
    const [displayCandidates, setDisplayCandidates] = useState(candidates)

    const searchByName = input => {
        if (input.length < 3) {
            setDisplayCandidates(candidates)
        } else {
            const filterKey = cleanNameString(input)
            const filtered = candidates.filter(d => cleanNameString(d.Name).includes(filterKey))
            setDisplayCandidates(filtered)
        }
    }

    return <div css={style}>
        <h3>All legislative candidates</h3>
        <TextInput
            handleInput={searchByName}
            placeholder='Search by name, e.g. Sue Vinton'
        />
        <TruncatedContainer>
            <CandidateTable candidates={displayCandidates} />
        </TruncatedContainer>
    </div>
}

const CandidateTable = ({ candidates }) => {
    const [sortFunctionKey, setSortFunctionKey] = useState('district')
    const [isSortReversed, setIsSortReversed] = useState(false)

    // const handleColClick = (key) => {
    //     if (key !== sortFunctionKey) setSortFunctionKey(key)
    //     else setIsSortReversed(!isSortReversed)
    // }
    // const getInteractionStyle = (colKey) => {
    //     if (colKey === sortFunctionKey) {
    //         if (!isSortReversed) return [activeCol, sortNotReversed]
    //         if (isSortReversed) return [activeCol, sortReversed]
    //     }
    //     return [clickableCol]
    // }

    const rowSort = isSortReversed ?
        (a, b) => sortFunctions[sortFunctionKey](b, a) // reverse sort direction
        : sortFunctions[sortFunctionKey]

    const rows = candidates
        .sort(rowSort)
        .map(candidate => <Row key={candidate.urlKey} {...candidate} />)

    return <div>
        <table css={tableStyle}>
            <thead>
                <tr>
                    {/* <th css={[col1, ...getInteractionStyle('district')]} onClick={() => handleColClick('district')}>District</th>
                    <th css={[col1, ...getInteractionStyle('district')]} onClick={() => handleColClick('party')}>Party</th>
                    <th css={[col1, ...getInteractionStyle('district')]} onClick={() => handleColClick('name')}>Name</th> */}
                    <th css={[col1]}>District</th>
                    <th css={[col2]}>Party</th>
                    <th css={[col3]}>Candidate</th>
                    <th css={[col4]}>Campaign links</th>


                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    </div >
};

const Row = ({
    Name, Party, District, Status, urlKey,
    CampaignWebsiteUrl, CampaignFBPageUrl, CampaignInstagramUrl, CampaignTwitterUrl, CampaignYoutubeUrl
}) => {
    return (<tr key={Name}>
        <td css={[col1]}>
            <div>{District.slice(0, 2)}</div>
            <div>{District.slice(3,)}</div>
        </td>
        <td css={[col2]}><span style={{ color: partyColor(Party) }}>{Party}</span>
        </td>
        <td css={col3}>
            {Name}
            {(Status === 'incumbent') ? ' (Incumbent)' : ''}
        </td>
        <td css={col4}>
            <SocialTagUnLabeled type="web" url={CampaignWebsiteUrl} />
            <SocialTagUnLabeled type="fb" url={CampaignFBPageUrl} />
            <SocialTagUnLabeled type="ig" url={CampaignInstagramUrl} />
            <SocialTagUnLabeled type="tw" url={CampaignTwitterUrl} />
            <SocialTagUnLabeled type="yt" url={CampaignYoutubeUrl} />
        </td>

    </tr >)
}


export default LegislativeCandidates