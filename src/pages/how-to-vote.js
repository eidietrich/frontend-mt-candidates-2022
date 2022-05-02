import * as React from "react"
import ReactMarkdown from 'react-markdown'
import { graphql } from "gatsby"
import SEO from '../components/Seo'
import Layout from '../components/Layout'

import content from '../data/how-to-vote.json'

const HowToVotePage = ({ data }) => {
    const { title, description } = data.site.siteMetadata
    return <div>
        <SEO title={title} description={description} />
        <Layout maxWidth={800} siteHed={title} siteSubhed={description}>
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
        description
      }
    }
  }
`