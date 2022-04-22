import React from 'react'
import { css } from '@emotion/react'

import { dateFormat } from '../config/utils'

const style = css`
    .ledein {
        margin: 0.5em 0;
        margin-bottom: 1em;
    }
    .article-container {
        display: flex;
        flex-wrap: wrap;
        margin: -0.25em;
    }
`

const Coverage = (props) => {
    const { articles } = props
    return <div css={style}>
        <div className="ledein">Reporting on this candidate published by the Montana Free Press newsroom.</div>
        <div className="article-container">
            {
                articles.map((d, i) => <Article key={String(i)} {...d} />)
            }
        </div>
    </div>
}

export default Coverage

const articleStyle = css`
    flex: 1 0 200px;
    max-width: 300px;
    border: 1px solid var(--tan3);
    margin: 0.25em;
    overflow: hidden;
    min-height: 60px;
    
    a {
        display: block;
        height: 100%;
        padding: 0.5em;
    }

    a:hover {
        background: var(--tan1);
        text-decoration: none;
    }

    .hed {
        font-size: 1.1em;
        font-weight: bold;
    }
    .date {
        color: var(--gray4);
    }
`

const Article = props => {
    const { title, link, date } = props
    return <div css={articleStyle}><a href={link}>
        <div className='hed'>{title}</div>
        <div className='date'>{dateFormat(new Date(date))}</div>
    </a>
    </div>
}
