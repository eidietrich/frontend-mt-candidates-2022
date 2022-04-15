import React, { Component } from 'react'
import { css } from '@emotion/react'

import Layout from "../components/Layout"
import SEO from '../components/Seo'

const style = css`
    .portrait {
        display: block;
        width: 100px;
        height: 100px;
        background-color: #666;
    }
`

// TODO - split to separate file
// TODO - implement handling for rich text formatting
const Text = props => {
    const { text } = props
    if (!text) return null
    const grafs = text.split('\n').filter(d => d)
    return <div>{grafs.map((graf, i) => <p key={String(i)}>{graf}</p>)}</div>
}

class CandidatePage extends Component {
    render() {
        const data = this.props.pageContext
        const {
            key,
            Name,
            Race,
            Party,
            SummaryLine,
            LongSummary,
            CampaignWebsiteUrl,
            CampaignFBPageUrl,
            CampaignTwitterUrl,
            CampaignInstagramUrl,
        } = data
        console.log(data)

        return (<div css={style}>
            <SEO
                title={`Montana's 2022 election | ${Name}`}
                description={`TK`}
            />
            <Layout>
                <h2>{Name}</h2>
                <div className="portrait"></div>
                <div> ({Party}) candidate for {Race}</div>
                <div>{SummaryLine}</div>
                <div>Web: {CampaignWebsiteUrl}</div>
                <div>FB: {CampaignFBPageUrl}</div>
                <div>TW: {CampaignTwitterUrl}</div>
                <div>IG: {CampaignInstagramUrl}</div>
                <Text text={LongSummary} />
                <div>TK Media links</div>
                <div>TK district map</div>
                <div>TK campaign finance summary</div>
                <div>TK plain text view, separate template</div>
            </Layout>
        </div>);
    }
}


export default CandidatePage

