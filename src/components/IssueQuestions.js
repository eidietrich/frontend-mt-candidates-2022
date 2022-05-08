import React from 'react'
import { css } from '@emotion/react'

const style = css`
    
`

const IssueQuestions = (props) => {
    const { content, candidateName } = props
    return <div css={style}>
        {
            content.map((d, i) => <Question key={String(i)} question={d.question} answer={d.answer} candidateName={candidateName} />)
        }
    </div>
}

export default IssueQuestions

const questionStyle = css`
    border-left: 5px solid var(--tan2);
    
    .question {
        font-weight: bold;
        border: 1px solid var(--tan2);
        border-left: none;
        background: var(--tan1);
        padding: 0.5em;
        font-size: 16px;
    }

    .answer {
        margin: 1em;
        font-size: 0.8em;

        .name {
            font-size: 1rem;
            /* font-weight: bold; */
            text-transform: uppercase;
            color: var(--tan5);
        }
    }
`

const TextBlock = (props) => {
    // renders an array of paragraphs (i.e. from ArchieML) as a text block 
    const { paragraphs } = props
    return paragraphs.map((d, i) =>
        <p key={String(i)} dangerouslySetInnerHTML={{ __html: d.value }}></p>
    )
}

const Question = props => {
    const { question, answer, candidateName } = props

    return <div css={questionStyle}>
        <div className="question">{question}</div>
        <div className="answer">
            <div className="name">{candidateName}:</div>
            <TextBlock paragraphs={answer} />
        </div>
    </div>
}

