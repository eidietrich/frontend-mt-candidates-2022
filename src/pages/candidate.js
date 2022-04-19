import React, { Component } from 'react'
import { css } from '@emotion/react'

import ReactMarkdown from 'react-markdown'

import Layout from "../components/Layout"
import SEO from '../components/Seo'
import Portrait from '../components/Portrait'

import { partyColor } from '../config/config'
import { raceMaps } from '../config/map-config'
import { web, facebook, twitter, instagram, youtube } from '../library/icons'

const style = css`
    .bio-box {
        display: flex;
        border: 1px solid var(--gray5);
        background: var(--tan1);

        .portrait {

            display: block;
            width: 150px;
            min-width: 100px;
            margin-right: 0.5em;
        }
        .info {
            padding: 0.5em;
            padding-top: 0.75em;
        }
        h1 {
            font-size: 1.5em;
            margin: 0.2em 0;
        }
        .label {
            font-style: italic;
        }
        .short-summary {
            font-size: 1.1em;
            margin-bottom: 1em;

        }
        .social-links {
            display: flex;
            flex-wrap: wrap;
            margin-left: -0.25em;
            /* margin-top: 0.25em; */
            margin-bottom: 0.25em;
        }
        .social-links-label {
            font-size: 0.8em;
            color: #666;
        }
    }
    /* .portrait {
        display: block;
        width: 100px;
        height: 100px;
        background-color: #666;
    } */
    
`

const partyFull = {
    'R': 'Republican candidate',
    'D': 'Democratic candidate',
    'L': 'Libertarian candidate',
    'I': 'Independent candidate',
    'NP': 'Candidate',
}

class CandidatePage extends Component {
    render() {
        const data = this.props.pageContext
        const {
            urlKey,
            Name,
            Race,
            Party,
            SummaryLine,
            LongSummary,
            CampaignWebsiteUrl,
            CampaignFBPageUrl,
            CampaignTwitterUrl,
            CampaignInstagramUrl,
            CampaignYoutubeUrl,
            race, // raceInfo
        } = data
        const color = partyColor(Party)
        return (<div css={style}>
            <SEO
                title={`Montana's 2022 election | ${Name}`}
                description={`TK`}
            />
            <Layout>
                <div className="bio-box">


                    <div className="portrait">
                        <Portrait filename={`${urlKey}.png`} barColor={color} />
                    </div>
                    <div className="info">
                        <div className="label">2022 {partyFull[Party]} for {race.label}</div>
                        <h1>{Name}</h1>
                        <div className="short-summary">{SummaryLine}</div>
                        <div className="social-links-label">Campaign website</div>
                        <div className="social-links">
                            <SocialTag type="web" url={CampaignWebsiteUrl} />
                        </div>
                        <div className="social-links-label">Campaign social media</div>
                        <div className="social-links">
                            <SocialTag type="fb" url={CampaignFBPageUrl} />
                            <SocialTag type="ig" url={CampaignInstagramUrl} />
                            <SocialTag type="tw" url={CampaignTwitterUrl} />
                            <SocialTag type="yt" url={CampaignYoutubeUrl} />
                        </div>
                    </div>



                </div>
                <ReactMarkdown>{LongSummary}</ReactMarkdown>
                <h3>MTFP coverage</h3>
                <div>TK curated media links</div>

                <h3>The district</h3>
                <div>TK information on district boundary + competitors</div>

                <h3>Campaign finance</h3>
                <div> TK</div>

                <h3>Republish this material</h3>
                {/* MIRROR MATERIAL ON HOME PAGE? */}
                <div>This material is available for republication under Montana Free Press' <a href="https://montanafreepress.org/publish-our-stories/">standard distribution terms</a>.</div>
                <div>A text-only version of this guide, intended to make it easier for print publications to republish this material, is available AT LINK TK. Contact Eric Dietrich with questions at edietrich@montanafreepress.org.</div>
            </Layout >
        </div >);
    }
}


export default CandidatePage

const socialTagStyle = css`
    display: inline-block;
    margin: 0.25em;
    font-size: 0.9em;

    background-color: var(--gray5);
    color: white;
    padding: 0.3em 0.6em;
    position: relative;

    .icon svg {
        width: 16px;
        fill: white;
        color: white; // redundant for text stuff
        margin-right: 0.5em;
        position: relative;
        top: 2px;
    }
    :hover {
        color: var(--link);
        svg {
            fill: var(--link);
        }
    }
}
`

const SOCIAL_SCHEMAS = [
    {
        key: 'web',
        icon: web,
    },
    {
        key: 'fb',
        icon: facebook,
        replace: 'facebook.com/'
    },
    {
        key: 'tw',
        icon: twitter,
        replace: 'twitter.com/'
    },
    {
        key: 'ig',
        icon: instagram,
        replace: 'instagram.com/'
    },
    {
        key: 'yt',
        icon: youtube,
        replace: 'youtube.com/user/'
    }
]

const SocialTag = props => {
    const { type, url } = props
    if (!url) return null

    const schema = SOCIAL_SCHEMAS.find(d => d.key === type)
    if (!schema) console.warn('Missing social icon', type)

    const label = url
        .replace('http://', '').replace('https://', '').replace('www.', '')
        .replace(schema.replace, '')
        .replace(/\//g, '')

    return <a css={socialTagStyle} href={url}>
        <span className="icon">{schema.icon}</span>
        <span className="icon-label">{label}</span>
    </a>
}
