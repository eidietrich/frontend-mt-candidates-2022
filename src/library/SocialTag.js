import React from 'react'
import { css } from '@emotion/react'

import { web, facebook, twitter, instagram, youtube } from '../library/icons'

const socialTagStyle = css`
    display: inline-block;
    margin: 0.25em;
    font-size: 0.9em;

    background-color: var(--gray5);
    color: white;
    padding: 0.3em 0.6em;
    position: relative;

    .icon svg {
        width: 16px;
        fill: white;
        color: white; // redundant for text stuff
        margin-right: 0.5em;
        position: relative;
        top: 2px;
    }
    :hover {
        color: var(--link);
        svg {
            fill: var(--link);
        }
    }
}
`
const unlabeledStyle = css`
    .icon svg {
        width: 14px;
        margin: 0.25em;
    }
    :hover {
        color: var(--link);
        svg {
            fill: var(--link);
        }
    }
`

const SOCIAL_SCHEMAS = [
    {
        key: 'web',
        icon: web,
    },
    {
        key: 'fb',
        icon: facebook,
        replace: 'facebook.com/',
    },
    {
        key: 'tw',
        icon: twitter,
        replace: 'twitter.com/'
    },
    {
        key: 'ig',
        icon: instagram,
        replace: 'instagram.com/'
    },
    {
        key: 'yt',
        icon: youtube,
        replace: 'youtube.com/user/'
    }
]

export const SocialTagLabeled = props => {
    const { type, url } = props
    if (!url) return null

    const schema = SOCIAL_SCHEMAS.find(d => d.key === type)
    if (!schema) console.warn('Missing social icon', type)

    let label = url
        .replace('http://', '').replace('https://', '').replace('www.', '')
        .replace(schema.replace, '')
        .replace(/\/$/g, '')

    // FB overrides
    if (type === 'fb') {
        label = label.replace(/\-\d+$/, '') // trailing numbers
        if (label.match(/profile.php\?id=\d+/)) label = 'Facebook'
    }
    if (type === 'yt') {
        label = 'YouTube'
    }


    return <a css={socialTagStyle} href={url}>
        <span className="icon">{schema.icon}</span>
        <span className="icon-label">{label}</span>
    </a>
}

export const SocialTagUnLabeled = props => {
    const { type, url } = props
    if (!url) return null

    const schema = SOCIAL_SCHEMAS.find(d => d.key === type)
    if (!schema) console.warn('Missing social icon', type)

    return <a css={[unlabeledStyle]} href={url}>
        <span className="icon">{schema.icon}</span>
    </a>
}
