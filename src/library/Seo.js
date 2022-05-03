/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

// TODO - elegantize this
const appUrl = 'https://apps.montanafreepress.org/montana-legislature-lawsuit-tracker/'

function SEO(props) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            seoTitle
            siteUrl
            keywords
            image
          }
        }
      }
    `
  )

  const { seoTitle, seoDescription, socialTitle, socialDescription, lang, image, author, meta, siteUrl } = Object.assign({
    // defaults
    seoTitle: site.siteMetadata.seoTitle,
    seoDescription: site.siteMetadata.description,
    socialTitle: site.siteMetadata.title,
    socialDescription: site.siteMetadata.description,
    lang: 'en',
    image: site.siteMetadata.image,
    author: site.siteMetadata.author,
    siteUrl: site.siteMetadata.siteUrl,
    meta: {},
  }, props)

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={seoTitle}
      // titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: seoDescription,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          property: `og:image:width`,
          content: 1200,
        },
        {
          property: `og:image:height`,
          content: 630,
        },
        {
          property: `og:title`,
          content: socialTitle,
        },
        {
          property: `og:description`,
          content: socialDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:image`,
          content: image,
        },
        {
          name: `twitter:title`,
          content: socialTitle,
        },
        {
          name: `twitter:description`,
          content: socialDescription,
        },
      ].concat(meta)}
    >
      <script type="application/ld+json">
        {/* Parsely information */}
        {`
          {
            "@context": "http://schema.org",
            "@type": "NewsArticle",
            "name": "${seoTitle}",
            "url": "${siteUrl}",
            "thumbnailUrl": "${image}",
            "datePublished": "${new Date().toISOString()}",
            "articleSection": "News apps",
            "creator": "Eric Dietrich"
          }
        `}
      </script>
    </Helmet>
  )
}

// SEO.defaultProps = {
//   lang: `en`,
//   meta: [],
//   description: ``,
// }

// SEO.propTypes = {
//   description: PropTypes.string,
//   lang: PropTypes.string,
//   meta: PropTypes.arrayOf(PropTypes.object),
//   title: PropTypes.string.isRequired,
// }

export default SEO