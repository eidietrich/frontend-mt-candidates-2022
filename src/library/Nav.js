import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'
import { AnchorLink } from "gatsby-plugin-anchor-links";

const containerStyle = css`
  position: sticky;
  top: 0px;
  background-color: white;
  margin: -10px;
  padding: 10px;
  margin-bottom: 0;
  padding-bottom: 0;
  z-index: 1000;
`
const navStyle = css`
    border-bottom: 1px solid #444;
    margin-bottom: 0.5em;
    margin-left: -2px;
    margin-right: -2px;
    padding-left: 2px;
    padding-right: 2px;
    box-shadow: 0px 3px 3px -3px #000;
    
`
const navRowStyle = css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`
const navRowPrimary = css`
    margin: 0 -0.25em; /* Aligns items to edges*/
`
const navRowSecondary = css`
    justify-content: space-between;
    margin-left: -0.5em;
    margin-right: -0.5em;
`

const navItemStyle = css`
    
    
    margin: 0 0.25em;
    margin-bottom: 0.5rem;

    text-align: center;
    text-decoration: none;
    
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.3em;
    padding-bottom: 0.3em;

    display: block;
    max-width: 12em;
    margin: 0em 0.5em;
    margin-bottom: 0.25em;
`

const Nav = (props) => <div css={containerStyle}>
    <div css={navStyle}>
        <div css={[navRowStyle, navRowSecondary]}>
            {
                props.schema.map(s => {
                    if (s.type === 'link') {
                        return <Link key={s.to} css={[navItemStyle]} to={s.to}>{s.label}</Link>
                    } else if (s.type === 'anchor-link') {
                        return <AnchorLink key={s.to} css={[navItemStyle]} to={s.to}>{s.label}</AnchorLink>
                    } else {
                        console.warn('Unhandled nav schema type:', s.type)
                        return null
                    }
                })
            }
        </div>
    </div>
</div>

export default Nav

