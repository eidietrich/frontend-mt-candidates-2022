import React, { Component } from 'react'
import { css } from '@emotion/react'

import { SocialTagUnLabeled } from '../library/SocialTag'

import DistrictMatcher from '../js/DistrictMatcher'
import { partyColor, parties } from '../config/config'

import LegDistrictMap from './LegDistrictMap'

const addressForm = css`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
`
const textInput = css`
    /* color: red; */
    /* min-width: 20rem; */
    margin: -1px;
    flex: 4 1 15rem;
    height: 2em;
`
const searchButton = css`
    margin: -1px;
    flex: 1 1 auto;
`
const resultContainer = css`
    display: flex;
    flex-wrap: wrap;
    /* margin: -0.5em; */

    padding-bottom: 1px;
    min-height: 8em;
    background-color: #eee;
`
const placeholderCss = css`
    display: flex;
    height: 8em;
    color: #aaa;
    width: 100%;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
`

const labelCss = css`margin-bottom: 0.2em;`

const messageLineCss = css`
    padding: 0.5em;
    padding-top: 0em;
    font-style: italic;
`

const defaultAddress = 'Enter address, e.g., "1301 E 6th Ave, Helena" or "Libby"'
class DistrictLookup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            errorMessage: null,

            // testing
            // matchedAddress: 'xx', // null
            // hd: 'HD5', // testing; null
            // sd: 'SD11', // testing; null

            // production
            matchedAddress: null,
            hd: null,
            sd: null,
        }

        this.districtMatcher = new DistrictMatcher()

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFailedSubmit = this.handleFailedSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleResult = this.handleResult.bind(this)
    }
    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        // console.log('Submit address', this.state.value)
        this.districtMatcher.matchAddressToLawmakers(this.state.value, this.handleResult, this.handleFailedSubmit)
    }

    handleResult({ hd, sd, location }) {
        this.setState({
            matchedAddress: location,
            errorMessage: null,
            hd,
            sd,
        })
    }

    handleFailedSubmit() {
        this.setState({
            errorMessage: 'Apologies, address lookup failed',
            matchedAddress: null,
            hd: null,
            sd: null,
        })
    }

    render() {
        const { candidates } = this.props
        const { hd, sd, errorMessage, matchedAddress } = this.state
        return <div>
            <h3 css={labelCss}>Your district's candidates</h3>
            <div css={addressForm}>
                <input css={textInput} type="address" value={this.state.value}
                    onChange={this.handleChange}
                    placeholder={defaultAddress} />
                <button css={searchButton} onClick={this.handleSubmit}>Look up</button>
            </div>
            {errorMessage && <div css={messageLineCss}>{errorMessage}</div>}
            {matchedAddress && <div css={messageLineCss}>Districts for {matchedAddress}</div>}
            <div css={resultContainer}>
                {
                    matchedAddress && <Results candidates={candidates} hd={hd} sd={sd} />
                }
                {
                    (!matchedAddress) && <div css={placeholderCss}>Search results</div>
                }
            </div>
        </div>


    }

}

const cleanDistrict = string => string.replace(/\s/g, '').replace('-', '')
    .replace(/0(?=[1-9])/, '')

const resultStyle = css`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .col {
        flex: 1 0 200px;
        border: 1px solid var(--tan3);
        background: white;
        margin: 0.5em;
        padding: 0.5em;

        .district {
            font-weight: bold;
            margin-bottom: 0.2em;
        }
        .label {
            margin: 0.5em 0;
            font-style: italic;
        }

        .party-field {
            margin: 1em 0;
        }
        .candidate {
            border: 1px solid var(--gray3);
            padding: 0.25em;
            margin: 0.25em 0;
            background: var(--tan1);
            min-height: 2.75em;
        }
        .out-of-cycle {
            color: var(--gray4);
            font-style: italic;
            display: flex;
            height: 100px;
            justify-content: center;
            align-items: center;

        }
    }
`

const Results = ({ candidates, hd, sd }) => {

    const houseCandidates = candidates.filter(d => cleanDistrict(d.District) === cleanDistrict(hd))
    const senateCandidates = candidates.filter(d => cleanDistrict(d.District) === cleanDistrict(sd))
    return <div css={resultStyle}>
        <div className="col">
            <div className="district">Montana Legislature {hd.replace('HD', 'House District ')}</div>
            <LegDistrictMap filename={hd} alt={hd} />
            <div className="label">2022 Candidates</div>
            <div>
                {
                    parties.map(party => <PartyField key={party.key}
                        candidates={houseCandidates.filter(d => d.Party === party.key)}
                    />)
                }
            </div>

        </div>
        {
            (senateCandidates.length > 0) && <div className="col">
                <div className="district">Montana Legislature {sd.replace('SD', 'Senate District ')}</div>
                <LegDistrictMap filename={sd} alt={sd} />
                <div className="label">2022 Candidates</div>
                <div>
                    {
                        parties.map(party => <PartyField key={party.key}
                            candidates={senateCandidates.filter(d => d.Party === party.key)}
                        />)
                    }
                </div>

            </div>
        }
        {
            (senateCandidates.length === 0) && <div className="col">
                <div className="district">Montana Legislature {sd.replace('SD', 'Senate District ')}</div>
                <LegDistrictMap filename={sd} alt={sd} />

                <div className="out-of-cycle">Out of cycle in 2022</div>

            </div>
        }
    </div>

}

const PartyField = ({ candidates }) => {
    if (!candidates.length > 0) return null
    return <div className="party-field">
        {
            candidates.map(d => <Candidate key={d.Name} {...d} />)
        }
    </div>
}

const Candidate = ({ Name, Party, City, Status,
    CampaignWebsiteUrl, CampaignFBPageUrl, CampaignInstagramUrl, CampaignTwitterUrl, CampaignYoutubeUrl }) => {
    const color = partyColor(Party)
    return <div className="candidate" style={{ borderTop: `3px solid ${color}` }}>
        <span style={{ color }}>{Party}</span> —
        {Name} ({City})
        {Status === 'incumbent' ? <strong> – Incumbent</strong> : ''}
        <div>
            <SocialTagUnLabeled type="web" url={CampaignWebsiteUrl} />
            <SocialTagUnLabeled type="fb" url={CampaignFBPageUrl} />
            <SocialTagUnLabeled type="ig" url={CampaignInstagramUrl} />
            <SocialTagUnLabeled type="tw" url={CampaignTwitterUrl} />
            <SocialTagUnLabeled type="yt" url={CampaignYoutubeUrl} />
        </div>

    </div>
}

export default DistrictLookup