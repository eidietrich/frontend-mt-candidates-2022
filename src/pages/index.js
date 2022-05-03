import * as React from "react"
import ReactMarkdown from 'react-markdown'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Seo from '../library/Seo'
import Layout from '../components/Layout'

import RaceListing from '../components/RaceListing'
import LegislativeLookup from '../components/LegislativeLookup'
import LegislativeCandidates from '../components/LegislativeCandidates'

import overview from '../data/overview.json'
import races from '../data/races.json'
import legislativeCandidates from '../data/legislative-candidates.json'

const textContainerStyle = css`
  max-width: 800px;
  margin: auto;
`

const pageDescription = `Find information on state-level candidates, legislative races, your district and how to vote in Montana's 2022 elections`

const IndexPage = ({ data }) => {
  const { title, seoTitle, description } = data.site.siteMetadata
  return <div>
    <Seo
      seoTitle={seoTitle}
      seoDescription={pageDescription}
      socialTitle={title}
      socialDescription={pageDescription}
    />
    <Layout maxWidth={1000} siteHed={title} siteSubhed={description}>
      <div css={textContainerStyle}>
        <ReactMarkdown>{overview.LedeIn}</ReactMarkdown>
        <hr />
      </div>

      <RaceListing races={races} />

      <div css={textContainerStyle}>
        <h2 id="Ballot-Initiatives">Ballot initiatives</h2>
        <ReactMarkdown>{overview.BallotMeasuresIntro}</ReactMarkdown>
      </div>

      <div css={textContainerStyle}>
        <h2 id="Montana-Legislature">Montana Legislature</h2>
        <ReactMarkdown>{overview.LegislativeIntro}</ReactMarkdown>

        <LegislativeLookup candidates={legislativeCandidates} />
        <LegislativeCandidates candidates={legislativeCandidates} />
      </div>


      <div css={textContainerStyle}>
        <hr />
        <ReactMarkdown>{overview.Outro}</ReactMarkdown>
      </div>



      {/* TODO: Shift this over to CMS
      <h2>TK Credit + information</h2>

      This guide was produced by Montana Free Press reporter Eric Dietrich, with assistance from TK TK TK. Montana Free Press is a 501(c)(3) nonprofit, nonpartisan, reader-supported news organization serving Montana.

      TK TK TK TK support us information.

      Contact Eric Dietrich with questions, corrections or suggestions at edietrich@montanafreepress.org.

      <h2>Republish this guide</h2>
      <div>This material is available for republication under Montana Free Press' <a href="https://montanafreepress.org/publish-our-stories/">standard distribution terms</a>.</div>
      <div>A text-only version of this guide, intended to make it easier for print publications to republish this material, is available AT LINK TK. </div> */}
    </Layout >

  </div >
}

export default IndexPage


export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        description
        seoTitle
      }
    }
  }
`
