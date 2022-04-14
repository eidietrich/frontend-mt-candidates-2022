import * as React from "react"

import SEO from '../components/Seo'
import Layout from '../components/Layout'

import counties from '../data/counties.json'
import cities from '../data/cities.json'

import { Map, FeatureLayer, PointLayer } from '../library/SvgMap'

const TITLE = 'Hed TK'
const SUBTITLE = 'Subhed TK'
const SEO_HED = 'TK SEO hed'
const SEO_DESCRIPTION = 'TK SEO description'

// markup
const IndexPage = () => {
  return <div>
    <SEO title={SEO_HED} description={SEO_DESCRIPTION} />
    <Layout siteHed={TITLE} siteSubhed={SUBTITLE}>
      <div>Content</div>
      <Map
        layers={[
          new FeatureLayer({
            key: 'counties',
            geodata: counties,
            featureStyle: {
              // fill: d => d.NAME === 'GALLATIN' ? 'red' : 'blue'
            }
          }),
          new PointLayer({
            key: 'cities',
            geodata: cities,
            labelStyle: {
              text: d => d.NAME,
              dx: d => d.offset ? d.offset[0] : '0.5em',
              dy: d => d.offset ? d.offset[1] : '0.5em',
            }
          })
        ]}
      />
    </Layout>

  </div>
}

export default IndexPage
