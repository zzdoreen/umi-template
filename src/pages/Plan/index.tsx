import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { data } from './data'
import './index.less'

export default function Plan() {
    const [markdownText, setMarkdownText] = useState('');

    useEffect(() => {
        setMarkdownText(data)
    }, [data])

    return <ReactMarkdown className='markdown-container'>{markdownText}</ReactMarkdown>
}