import * as React from "react"
import ReactMarkdown from 'react-markdown'

import SEO from '../components/Seo'
import Layout from '../components/Layout'

import content from '../data/how-to-vote.json'

// TODO - wire these to appropriate metadata places
const TITLE = 'Hed TK'
const SUBTITLE = 'Subhed TK'
const SEO_HED = 'TK SEO hed'
const SEO_DESCRIPTION = 'TK SEO description'

const HowToVotePage = () => {
    return <div>
        <SEO title={SEO_HED} description={SEO_DESCRIPTION} />
        <Layout maxWidth={800} siteHed={TITLE} siteSubhed={SUBTITLE}>
            <ReactMarkdown>{content.Content}</ReactMarkdown>

        </Layout>

    </div>
}

export default HowToVotePage
