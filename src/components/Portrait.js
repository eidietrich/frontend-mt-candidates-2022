import React from "react"
import { css } from "@emotion/react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"


// surprisingly complex - loads all images in image folder then renders based on prop
// see https://noahgilmore.com/blog/easy-gatsby-image-components/
// In future, could segment images folder into categories by directory

const style = css`
    max-width: 100;
`

const CandidateImage = (props) => (
  <StaticQuery
    query={graphql`
        query {
          images: allFile {
            edges {
              node {
                relativePath
                name
                childImageSharp {
                  fluid(maxWidth: 150) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      `}

    render={(data) => {

      const barStyle = props.barColor ?
        css`border-top: 8px solid ${props.barColor};`
        : null

      const defaultImage = data.images.edges.find(n => n.node.relativePath.includes('00-placeholder.png'))
      let image = data.images.edges.find(n => {
        const image = n.node.relativePath.includes(props.filename)
        return image
      });

      if (!image) {
        if (!props.suppresswarning) console.warn('Missing portrait:', props.filename)
        image = defaultImage
      }
      return (
        <div css={[style, barStyle]}>
          <Img
            fluid={image.node.childImageSharp.fluid}
            alt={props.alt}
            objectFit="cover"
            objectPosition="50% 50%"
          />
        </div>
      );
    }}
  />
)

export default CandidateImage
