import * as React from "react"

import SEO from '../components/Seo'
import Layout from '../components/Layout'

import RaceListing from '../components/RaceListing'

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
      <div>TK Lede-in</div>
      <RaceListing races={races} />
      <div>LEGISLATIVE DISTRICTS TK</div>
    </Layout>

  </div>
}

export default IndexPage
