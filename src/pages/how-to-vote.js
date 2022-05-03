import * as React from "react"
import ReactMarkdown from 'react-markdown'
import { graphql } from "gatsby"
import Seo from '../library/Seo'
import Layout from '../components/Layout'

import content from '../data/how-to-vote.json'

const pageDescription = `Not sure where or how to vote in Montana’s 2022 elections? Find your district, key dates, requirements and candidate details in preparation for hitting the ballot box on June 7 and November 8.`

const HowToVotePage = ({ data }) => {
  const { title, seoTitle, description } = data.site.siteMetadata
  return <div>
    <Seo
      seoTitle={`How To Vote | ${seoTitle}`}
      seoDescription={pageDescription}
      socialTitle={`How To Vote – ${seoTitle}`}
      socialDescription={pageDescription}
    />
    <Layout maxWidth={800} siteHed={title} siteSubhed={description}>
      <h1>How to Vote</h1>
      <h2>What you need to know about voting in Montana in 2022</h2>
      <ReactMarkdown>{content.Content}</ReactMarkdown>

    </Layout>

  </div>
}

export default HowToVotePage

export const query = graphql`
  query HowToVotePageQuery {
    site {
      siteMetadata {
        title
        seoTitle
        description
      }
    }
  }
`