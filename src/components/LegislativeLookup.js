import React, { Component } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import { cleanPhoneString } from '../config/utils'

import DistrictMatcher from '../js/DistrictMatcher'
import { partyColor } from '../config/config'

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
const resultItem = css`
    flex: 1 1 190px;
    margin: 0.5em;
    border: 1px solid #806F47;
    background-color: #eae3d4;
    padding: 0.5em;
`
const resultLabel = css`
    font-weight: bold;
`
const resultName = css`
    font-size: 1.3em;
    font-weight: bold;
`

const labelCss = css`margin-bottom: 0.2em;`

const messageLineCss = css`
    padding: 0.5em;
    padding-top: 0em;
    font-style: italic;
`

const defaultAddress = 'Enter address, e.g., 1301 E 6th Ave, Helena'
class DistrictLookup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            errorMessage: null,
            // matchedAddress: 'xx', // null
            // hd: 'HD01', // testing; null
            // sd: 'SD01', // testing; null
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
    .replace(/0(?=\d)/, '')

const resultStyle = css`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .col {
        flex: 1 0 200px;
        border: 1px solid var(--tan3);
        background: var(--tan1);
        margin: 0.5em;
        padding: 0.5em;

        .district {
            font-weight: bold;
            margin-bottom: 0.2em;
        }
    }
`

const Results = ({ candidates, hd, sd }) => {

    const houseCandidates = candidates.filter(d => cleanDistrict(d.District) === cleanDistrict(hd))
    const senateCandidates = candidates.filter(d => cleanDistrict(d.District) === cleanDistrict(sd))
    return <div css={resultStyle}>
        <div className="col">
            <div className="district">{hd.replace('HD', 'House District ')}</div>
            <div>District map TK</div>
            {
                houseCandidates.map(d => <Candidate key={d.Name} {...d} />)
            }

        </div>
        {
            (senateCandidates.length > 0) && <div className="col">
                <div className="district">{sd.replace('SD', 'Senate District ')}</div>
                <div>District map TK</div>
                {
                    senateCandidates.map(d => <Candidate key={d.Name} {...d} />)
                }

            </div>
        }
        {
            (senateCandidates.length === 0) && <div className="col">
                <div className="district">{sd.replace('SD', 'Senate District ')}</div>
                <div>District map TK</div>
                <div class="out-of-cycle">Out of cycle</div>

            </div>
        }
    </div>

}

const Candidate = ({ Name, Party, status, urlKey }) => {
    return <div>
        <div>
            <span style={{ color: partyColor(Party) }}>{Party}</span> —
            <Link to={`/legislative-candidates/${urlKey}`}> {Name}</Link>
            {status === 'incumbent' ? '(Incumbent)' : ''}
        </div>
    </div>
}

const LawmakerEntry = ({ lawmaker, subtitle }) => {
    const { key, title, name, party, district, locale, phone, email } = lawmaker
    const districtKey = district.key
    return <div css={resultItem}>
        <div>{subtitle}</div>
        <div css={resultLabel}>{districtKey}</div>
        <div css={resultName}>
            <Link to={`/lawmakers/${key}`}>{title} {name}</Link>
        </div>
        <div>({party}-{locale.short})</div>
        <div><a href={`tel:${cleanPhoneString(phone)}`}>{phone}</a> | <a href={`mailto:${email}`}>{email}</a></div>
    </div>
}

export default DistrictLookup