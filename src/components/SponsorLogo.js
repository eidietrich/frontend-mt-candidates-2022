import React from "react"
import { css } from '@emotion/react'

import logo from "../images/aarp_MT_white_100px.png"

const linkUrl = 'https://www.aarp.org/MTVotes'

const containerCss = css`
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

const SponsorLogo = (props) => (
  <div css={containerCss}>
    <a href={linkUrl}>
      <img src={logo} alt="Sponsor logo" width={50} css={imgCss} />
    </a>
  </div>
)
export default SponsorLogo