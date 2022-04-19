import * as React from "react"
import ReactMarkdown from 'react-markdown'

import SEO from '../components/Seo'
import Layout from '../components/Layout'

import RaceListing from '../components/RaceListing'

import overview from '../data/overview.json'
import races from '../data/races.json'

// TODO - wire these to appropriate metadata places
const TITLE = 'Hed TK'
const SUBTITLE = 'Subhed TK'
const SEO_HED = 'TK SEO hed'
const SEO_DESCRIPTION = 'TK SEO description'

const IndexPage = () => {
  return <div>
    <SEO title={SEO_HED} description={SEO_DESCRIPTION} />
    <Layout siteHed={TITLE} siteSubhed={SUBTITLE}>
      <ReactMarkdown>{overview.LedeIn}</ReactMarkdown>
      <hr />
      <RaceListing races={races} />

      <h2>Ballot initiatives</h2>
      <ReactMarkdown>{overview.BallotMeasuresIntro}</ReactMarkdown>

      <h2>Montana Legislature</h2>
      <ReactMarkdown>{overview.LegislativeIntro}</ReactMarkdown>

      <h2>How to vote</h2>
      <div>TK discuss how much to include here</div>

      {/* TODO: Shift this over to CMS */}
      <h2>TK Credit + information</h2>

      This guide was produced by Montana Free Press reporter Eric Dietrich, with assistance from TK TK TK. Montana Free Press is a 501(c)(3) nonprofit, nonpartisan, reader-supported news organization serving Montana.

      TK TK TK TK support us information.

      Contact Eric Dietrich with questions, corrections or suggestions at edietrich@montanafreepress.org.

      <h2>Republish this guide</h2>
      <div>This material is available for republication under Montana Free Press' <a href="https://montanafreepress.org/publish-our-stories/">standard distribution terms</a>.</div>
      <div>A text-only version of this guide, intended to make it easier for print publications to republish this material, is available AT LINK TK. </div>
    </Layout>

  </div>
}

export default IndexPage
