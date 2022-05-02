import React, { Component } from 'react'
import { css } from '@emotion/react'
import { graphql, Link } from 'gatsby'

import ReactMarkdown from 'react-markdown'

import Layout from "../components/Layout"
import Seo from '../components/Seo'
import Portrait from '../components/Portrait'
import IssueQuestions from '../components/IssueQuestions'
import CampaignFinance from '../components/CampaignFinance'
import Coverage from '../components/Coverage'

import { partyColor } from '../config/config'
import { web, facebook, twitter, instagram, youtube } from '../library/icons'

import dummyQuestions from '../data/dummy-Q-and-A.json'

const style = css`
    .bio-box {
        display: flex;
        border: 1px solid var(--gray5);
        background: var(--tan1);
        margin-top: 1.5em;

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

    .competitors {
        margin-top: 0.5em;

        
    }
    
`


class CandidatePage extends Component {
    render() {
        const {
            title,
            description
        } = this.props.data.site.siteMetadata
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
            finances,
            articles,
            partyLabel,
        } = this.props.pageContext

        const color = partyColor(Party)
        const opponents = race.opponents
            .sort((a, b) => a.Name.localeCompare(b.Name))
            .sort((a, b) => ['R', 'D', 'L'].indexOf(a.Party) - ['R', 'D', 'L'].indexOf(b.Party))

        return (<div css={style}>
            <Seo
                title={`${Name} | ${title}`}
                description={description}
            />
            <Layout siteHed={title} siteSubhed={description}>
                <div className="bio-box">
                    <div className="portrait">
                        <Portrait filename={`${urlKey}.png`} barColor={color} alt={Name} />
                    </div>
                    <div className="info">
                        <div className="label">2022 {partyLabel} for {race.label}</div>
                        <h1>{Name}</h1>
                        <div className="short-summary">{SummaryLine}</div>
                        <div className="social-links-label">Campaign website</div>
                        {
                            CampaignWebsiteUrl && <div className="social-links">
                                <SocialTag type="web" url={CampaignWebsiteUrl} />
                            </div>
                        }
                        {
                            !CampaignWebsiteUrl && <div className="note">Not available</div>
                        }

                        <div className="social-links-label">Campaign social media</div>
                        <div className="social-links">
                            <SocialTag type="fb" url={CampaignFBPageUrl} />
                            <SocialTag type="ig" url={CampaignInstagramUrl} />
                            <SocialTag type="tw" url={CampaignTwitterUrl} />
                            <SocialTag type="yt" url={CampaignYoutubeUrl} />
                        </div>
                    </div>



                </div>

                <div className="competitors">
                    <span>Competitors: </span>
                    {opponents && opponents.map(d => <Opponent key={d.Name} {...d} />)}
                </div>
                <ReactMarkdown>{LongSummary}</ReactMarkdown>

                {
                    articles && (articles.length > 0) && <div>
                        <h3>MTFP coverage</h3>
                        <Coverage articles={articles} />
                    </div>
                }

                <h3>Campaign finance</h3>
                {(race.campaignFinance === 'fec') && <CampaignFinance finances={finances} race={Race} />}
                {(race.campaignFinance === 'copp') && <div>
                    Campaign finance reporting for this race is done through <a href="https://politicalpractices.mt.gov/">Montana's Commissioner of Political Practices.</a> That data can be accessed through the COPP's <a href="https://cers-ext.mt.gov/CampaignTracker/dashboard">Campaign Electronic Reporting System Dashboard</a>.
                </div>}


                {
                    race.hasQuestionnaire && <div>
                        <h3>On the issues</h3>
                        <div>DUMMY ANSWERS (Mike Cooney's answers from 2020) — ACTUAL CONTENT TK</div>
                        {/* TODO - wire this up with actual content */}
                        <IssueQuestions content={dummyQuestions[0].responses} candidateName={Name} />
                    </div>
                }

            </Layout >
        </div >);
    }
}


export default CandidatePage

const opponentStyle = css`
    :not(:last-child):after {
        content: ', ';
    }
`

const Opponent = props => {
    const { Name, Party, urlKey } = props
    return <span css={opponentStyle}>
        <Link to={`/candidates/${urlKey}`}>{Name} ({Party})</Link>
    </span >
}

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
        replace: 'facebook.com/',
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

    let label = url
        .replace('http://', '').replace('https://', '').replace('www.', '')
        .replace(schema.replace, '')
        .replace(/\/$/g, '')

    // FB overrides
    if (type === 'fb') {
        label = label.replace(/\-\d+$/, '') // trailing numbers
        if (label.match(/profile.php\?id=\d+/)) label = 'Facebook'
    }
    if (type === 'yt') {
        label = 'YouTube'
    }


    return <a css={socialTagStyle} href={url}>
        <span className="icon">{schema.icon}</span>
        <span className="icon-label">{label}</span>
    </a>
}

export const query = graphql`
  query CandidatePageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`