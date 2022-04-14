import React from "react"
import { css } from '@emotion/react'

const containerCss = css`
    /* width: 100px; */
    display: inline-block;
    position: relative;

    text-transform: uppercase;
    font-style: normal;
    font-weight: bold;

    a {
        color: #AE9864;
    }
    
`
const imgCss = css`
    position: relative;
    top: 5px;
    margin: 0 5px;

    :hover {
      opacity: 0.7;
    }
`

const MTFPLogo = (props) => (
  <div css={containerCss}>
    <a href="https://montanafreepress.org">
      <img src="mtfp-logo-100px.png" alt="MTFP logo" width={50} css={imgCss} />
    </a>
  </div>
)
export default MTFPLogo