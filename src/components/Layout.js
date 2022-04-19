import React from "react"
import PropTypes from "prop-types"
import { css } from '@emotion/react'
// import { Link } from 'gatsby'
// import Nav from './Nav'

import Footer from './Footer'
import MTFPLogo from './MTFPLogo'

import { headerDonateUrl } from '../config/config'

// import { formatTimeLong } from '../config/utils'

import "../config/base.css"

const style = css`
    position: relative;
    .content {
        padding: 10px;
        padding-top: 0;
        max-width: 800px;
        margin: auto;
    }
    .header {
        background-color: var(--tan7);
        margin-bottom: 10px;
        padding: 1em;

        

        .title {
            color: var(--tan4);
            font-size: 3em;
            margin-bottom: 5px;
            margin-top: 0;
            text-transform: uppercase;
            text-align: center;

            
        }
       .subtitle {
            color: var(--tan4);
            font-size: 1.15em;
            font-weight: normal;
            text-align: center;
            margin: 5px auto;
       }
       
       .blurb {
            text-align: center;
            color: var(--gray1);
            font-style: italic;
       }

       @media screen and (max-width: 468px) {
            .title {
                font-size: 2em;
            }
        }
    }
`
// const navCss = css`
//   position: sticky;
//   top: 0px;
//   background-color: white;
//   margin: -10px;
//   padding: 10px;
//   margin-bottom: 0;
//   padding-bottom: 0;
//   z-index: 1000;
// `

const Layout = ({ children, siteHed, siteSubhed }) => {
    return (
        <div css={style}>
            <div className="content">
                <div className="header">
                    {/* <h1 css={titleStyle}><Link to="/">{siteHed}</Link></h1> */}
                    <h1 className="title">{siteHed}</h1>
                    <h2 className="subtitle">{siteSubhed}</h2>
                    <div className="blurb">
                        A digital guide by <MTFPLogo />| <a href={headerDonateUrl}>Support this work</a>
                    </div>
                </div>

                <div>TK — Simple Navbar, similar to Capitol Tracker</div>
                <br />

                {/* <div css={navCss}>
          <Nav />
        </div> */}

                <main>{children}</main>
            </div>
            <Footer />

        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
