import React from "react"
import PropTypes from "prop-types"
import { css } from '@emotion/react'
// import { Link } from 'gatsby'
import Nav from '../library/Nav'

import Footer from './Footer'
import MTFPLogo from './MTFPLogo'

import { headerDonateUrl } from '../config/config'

// import { formatTimeLong } from '../config/utils'

import "../config/base.css"

const { NODE_ENV } = process.env

const style = css`
    position: relative;
    .content {
        padding: 10px;
        padding-top: 0;
        margin: auto;
        max-width: 800px;
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
const NAV_SCHEMA = [
    { type: 'link', to: '/', label: 'Home' },
    { type: 'anchor-link', to: '/#US-House-1-West', label: 'U.S. House' },
    { type: 'anchor-link', to: '/#PSC-District-1', label: 'Public Service Commission' },
    { type: 'anchor-link', to: '/#SupCo-1', label: 'MT Supreme Court' },
    { type: 'anchor-link', to: '/#Ballot-Initiatives', label: 'Ballot initiatives' },
    { type: 'anchor-link', to: '/#Montana-Legislature', label: 'Legislature' },
    { type: 'anchor-link', to: '/#How-to-vote', label: 'How to vote' },
]

const Layout = ({ children, siteHed, siteSubhed, maxWidth }) => {

    return (
        <div css={style}>
            <div className="content" style={{ maxWidth: maxWidth || '800px' }}>
                <div className="header">
                    {/* <h1 css={titleStyle}><Link to="/">{siteHed}</Link></h1> */}
                    <h1 className="title">{siteHed}</h1>
                    <h2 className="subtitle">{siteSubhed}</h2>
                    <div className="blurb">
                        A digital guide by <MTFPLogo />| <a href={headerDonateUrl}>Support this work</a>
                    </div>
                </div>

                <Nav schema={NAV_SCHEMA} />
                <main>{children}</main>
            </div>
            <Footer />
            {
                // Parsely analytics script
                (NODE_ENV === 'production') && <script id="parsely-cfg" src="//cdn.parsely.com/keys/montanafreepress.org/p.js"></script>
            }
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
