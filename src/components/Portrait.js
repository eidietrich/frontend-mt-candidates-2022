import React from "react"
import { css } from "@emotion/react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

// surprisingly complex - loads all images in image folder then renders based on prop
// see https://noahgilmore.com/blog/easy-gatsby-image-components/
// There has got to be a more elegant way to do this

const style = css`
    max-width: 100;
`

const Portrait = (props) => (

  <StaticQuery
    query={graphql`
        query {
          images: allFile(filter: { sourceInstanceName: { eq: "portraits" } }) {
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
      `}

    render={(data) => {
      const { filename, alt, barColor, suppresswarning } = props
      const barStyle = barColor ?
        css`border-top: 8px solid ${barColor};`
        : null

      const defaultImage = data.images.edges.find(n => n.node.relativePath.includes('00-placeholder.png'))
      let image = data.images.edges.find(n => {
        const image = n.node.relativePath.includes(filename)
        return image
      });

      if (!image) {
        if (!suppresswarning) console.warn('Missing portrait:', filename)
        image = defaultImage
      }
      return (
        <div css={[style, barStyle]}>
          <GatsbyImage
            image={image.node.childImageSharp.gatsbyImageData}
            alt={alt}
            objectFit="cover"
            objectPosition="50% 50%"
          />
        </div>
      );
    }}
  />
)

export default Portrait
