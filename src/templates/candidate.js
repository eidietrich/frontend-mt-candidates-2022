import React, { Component } from 'react'
import { css } from '@emotion/react'
import { graphql, Link } from 'gatsby'

import ReactMarkdown from 'react-markdown'

import Seo from '../library/Seo'
import { SocialTagLabeled } from '../library/SocialTag'
import Layout from "../components/Layout"

import Portrait from '../components/Portrait'
import IssueQuestions from '../components/IssueQuestions'
import CampaignFinance from '../components/CampaignFinance'
import Coverage from '../components/Coverage'
import RacePrimaryResults from '../components/RacePrimaryResults'

import { parties, partyColor } from '../config/config'

import NewsletterSignup from '../library/NewsletterSignup'

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

        .competitors-list {
            display: flex;
            flex-wrap: wrap;
        }
        
    }
    .ledein {
        margin: 0.5em 0;
        margin-bottom: 1em;
    }
    
`

const pageDescription = name => `Learn more about ${name}, including background, campaign developments and issue stances in Montana’s 2022 elections.`


class CandidatePage extends Component {
    render() {
        const {
            title,
            description,
            seoTitle
        } = this.props.data.site.siteMetadata
        const {
            portrait
        } = this.props.data
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
            issueAnswers,
            status
        } = this.props.pageContext

        const color = partyColor(Party)
        const opponents = race.opponents
            .sort((a, b) => a.Name.localeCompare(b.Name))
            .sort((a, b) => ['R', 'D', 'L'].indexOf(a.Party) - ['R', 'D', 'L'].indexOf(b.Party))

        const hasWebLinks = CampaignWebsiteUrl || CampaignFBPageUrl || CampaignTwitterUrl || CampaignInstagramUrl || CampaignYoutubeUrl

        const partyName = parties.find(d => d.key === Party).label
        const label = {
            'lost-primary': `Lost ${partyName} primary for ${race.label} in June 2022`,
            'lost-general': `Lost general election for ${race.label} in November 2022`,
            'widthdrew': `Withdrew from race for ${race.label}`,
        }[status] || `2022 ${partyLabel} for ${race.label}`

        return (<div css={style}>
            <Seo
                seoTitle={`${Name} | ${seoTitle}`}
                seoDescription={pageDescription(Name)}
                socialTitle={`${Name} – ${seoTitle}`}
                socialDescription={pageDescription(Name)}
                pageRelativeUrl={`/${urlKey}`}
            />
            <Layout siteHed={title} siteSubhed={description}>
                <div className="bio-box">
                    <div className="portrait">
                        <Portrait image={portrait} filename={`${urlKey}.png`} barColor={color} alt={Name} />
                    </div>
                    <div className="info">
                        <div className="label">{label}</div>
                        <h1>{Name}</h1>
                        <div className="short-summary">{SummaryLine}</div>
                        <div className="social-links-label">Campaign web links</div>
                        {
                            hasWebLinks && <div className="social-links">
                                <SocialTagLabeled type="web" url={CampaignWebsiteUrl} />
                                <SocialTagLabeled type="fb" url={CampaignFBPageUrl} />
                                <SocialTagLabeled type="ig" url={CampaignInstagramUrl} />
                                <SocialTagLabeled type="tw" url={CampaignTwitterUrl} />
                                <SocialTagLabeled type="yt" url={CampaignYoutubeUrl} />
                            </div>
                        }
                        {
                            !hasWebLinks && <div className="note">None available</div>
                        }

                    </div>



                </div>

                <div className="competitors">
                    <div><em>Other active candidates</em></div>
                    <div className="competitors-list">
                        {opponents && opponents.map(d => <Opponent key={d.Name} {...d} />)}
                    </div>
                </div>
                <ReactMarkdown>{LongSummary}</ReactMarkdown>

                {
                    articles && (articles.length > 0) && <div>
                        <h3>MTFP coverage</h3>
                        <Coverage articles={articles} />
                    </div>
                }

                <NewsletterSignup />

                <h3>Campaign finance</h3>
                {(race.campaignFinance === 'fec') && <CampaignFinance finances={finances} race={Race} />}
                {
                    (race.campaignFinance === 'copp') && <div>
                        Campaign finance reporting for this race is done through <a href="https://politicalpractices.mt.gov/">Montana's Commissioner of Political Practices.</a> That data can be accessed through the COPP's <a href="https://cers-ext.mt.gov/CampaignTracker/dashboard">Campaign Electronic Reporting System Dashboard</a>.
                    </div>
                }


                <h3>On the issues</h3>
                {
                    race.hasQuestionnaire && <div>

                        {
                            !issueAnswers && <div className="ledein">{Name} didn't respond to MTFP's efforts to collect reponses to issue questions provided to U.S. House candidates via an emailed questionnaire in May 2022.</div>
                        }
                        {
                            issueAnswers && <div>
                                <div className="ledein">The material shown below was solicted from candidates via a written questionnaire in May 2022. Responses were limited to 1,000 characters and edited lightly for punctuation and spelling. Responses have not been exhaustively fact-checked. Send questions to Eric Dietrich at edietrich@montanafreepress.org.</div>
                                <IssueQuestions content={issueAnswers} candidateName={Name} />
                            </div>
                        }
                    </div>
                }
                {
                    !race.hasQuestionnaire && <div>
                        <div className="ledein">MTFP hasn't put a formal issue questionnaire before candidates in this race.</div>
                    </div>
                }

            </Layout >
        </div >);
    }
}


export default CandidatePage

const opponentStyle = css`
    border: 1px solid var(--tan4);
    background-color: var(--tan1);
    padding: 0.2em 0.5em;
    margin: 0.25em;
    /* :not(:last-child):after {
        content: ', ';
    } */
`

const Opponent = props => {
    const { Name, Party, urlKey } = props
    const color = partyColor(Party)
    return <div css={opponentStyle} style={{ borderLeft: `5px solid ${color}` }}>
        <Link to={`/${urlKey}`}>{Name} </Link>
    </div>
}


// 
export const query = graphql`
  query CandidatePageQuery($imagePath: String) {
    site {
      siteMetadata {
        title
        seoTitle
        description
      }
    }
    portrait: file(sourceInstanceName: {eq: "portraits"}, relativePath: {eq: $imagePath}) {
        relativePath
        name
        childImageSharp {
        gatsbyImageData
        }
    }
  }
`