import * as React from "react"
import ReactMarkdown from 'react-markdown'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Seo from '../library/Seo'
import NewsletterSignup from '../library/NewsletterSignup'
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
  const portraits = data.portraits.edges.map(d => d.node)
  const maps = data.maps.edges.map(d => d.node)

  // merge in results of portrait image query
  races.forEach(race => {
    race.candidates.forEach(candidate => {
      const portrait = portraits.find(d => d.relativePath === `${candidate.urlKey}.png`)
      candidate.portrait = portrait
    })
  })


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

      <NewsletterSignup />

      <div css={textContainerStyle}>
        <h2 id="Ballot-Initiatives">Ballot initiatives</h2>
        <ReactMarkdown>{overview.BallotMeasuresIntro}</ReactMarkdown>
      </div>



      <div css={textContainerStyle}>
        <h2 id="Montana-Legislature">Montana Legislature</h2>
        <ReactMarkdown>{overview.LegislativeIntro}</ReactMarkdown>

        <LegislativeLookup candidates={legislativeCandidates} maps={maps} />
        <LegislativeCandidates candidates={legislativeCandidates} />
      </div>



      <div css={textContainerStyle}>
        <hr />
        <ReactMarkdown>{overview.Outro}</ReactMarkdown>
      </div>




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
    portraits: allFile(filter: { sourceInstanceName: { eq: "portraits" } }) {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    maps: allFile(filter: { sourceInstanceName: { eq: "maps" } }) {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
