import React from "react"
import { css } from "@emotion/react"
// import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

// surprisingly complex - loads all images in image folder then renders based on prop
// see https://noahgilmore.com/blog/easy-gatsby-image-components/
// There has got to be a more elegant way to do this

const style = css`
    max-width: 400px;
    aspect-ratio: 1; // prevent overflow
    overflow: hidden;
    border: 1px solid var(--gray2);
`

// hacky
// const fileNameTransform = key => key.replace('SD', 'sd-').replace('HD', 'hd-')

const LegDistrictMap = (props) => {
  const { image, alt, suppresswarning } = props
  if (!image) {
    if (!suppresswarning) console.warn('Missing leg district map:', alt)
    // image = defaultImage
    return <div>Missing map</div>
  }
  return <div css={[style]}>
    <GatsbyImage
      image={image.childImageSharp.gatsbyImageData}
      alt={alt}
      objectFit="cover"
      objectPosition="50% 50%"
    />
  </div>
}

export default LegDistrictMap
