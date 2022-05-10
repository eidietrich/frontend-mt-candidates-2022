import React from "react"
import { css } from "@emotion/react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

// surprisingly complex - loads all images in image folder then renders based on prop
// see https://noahgilmore.com/blog/easy-gatsby-image-components/
// ... and https://www.gatsbyjs.com/docs/tutorial/part-7/
// There has got to be a more elegant way to do this

const style = css`
    max-width: 100;
`

const Portrait = (props) => {
  return <StaticQuery
    query={graphql`
        query {
          defaultImage: file(sourceInstanceName: {eq: "portraits"}, relativePath: {eq: "00-placeholder.png"}) {
              relativePath
              name
              childImageSharp {
              gatsbyImageData
              }
          }
        }
      `}

    render={(data) => {
      const { image, alt, barColor, suppresswarning } = props
      const barStyle = barColor ?
        css`border-top: 8px solid ${barColor};`
        : null

      let renderImage = image

      if (!image) {
        if (!suppresswarning) console.warn('Missing portrait:', alt)
        renderImage = data.defaultImage
      }
      return (
        <div css={[style, barStyle]}>
          <GatsbyImage
            image={renderImage.childImageSharp.gatsbyImageData}
            alt={alt}
            objectFit="cover"
            objectPosition="50% 50%"
          />
        </div>
      );
    }}
  />
}

export default Portrait
