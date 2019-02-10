import * as React from 'react'
import replace from 'lodash/replace'
import { Link } from 'react-router-dom'
import {
  isExternalLink,
  isImage,
  isHashtag,
  isUsername,
  isPostRef,
  isThreadRef,
  hasNewline,
  cleanFragment,
} from '../utils/parsers'
import Img from './Img'

type Fragment = string | React.ReactNode;

const last = (arr: Array<Fragment>): Fragment => arr[arr.length - 1]

const imgStyle = {
  maxHeight: 300,
}
const parseFragment = (fragment: string): Fragment => {
  if (isImage(fragment)) {
    return <Img url={fragment} style={imgStyle} />

  } else if (isExternalLink(fragment)) {
    return <a href={fragment} target="_blank" rel="noopener noreferrer">{fragment}</a>

  } else if (isUsername(fragment)) {
    const userId = cleanFragment(fragment, /^@/)
    const dirt = fragment.replace(userId, '').replace(/^@/, '')
    return <><Link to={`/users/${userId}`}>@{userId}</Link>{dirt}</>

  } else if (isHashtag(fragment)) {
    const hashtag = cleanFragment(fragment, /^#/)
    const dirt = fragment.replace(hashtag, '').replace(/^#/, '')
    return <><Link to={`/hashtag/${hashtag}`}>#{hashtag}</Link>{dirt}</>

  } else if (isPostRef(fragment)) {
    const postId = cleanFragment(fragment, /^\/posts\//)
    const dirt = fragment.replace(postId, '').replace(/^\/posts\//, '')
    return <><Link to={`/posts/${postId}`}>/posts/{postId}</Link>{dirt}</>

  } else if (isThreadRef(fragment)) {
    const threadId = cleanFragment(fragment, /^\/threads\//)
    const dirt = fragment.replace(threadId, '').replace(/^\/threads\//, '')
    return <><Link to={`/threads/${threadId}`}>/threads/{threadId}</Link>{dirt}</>

  } else if (hasNewline(fragment)) {
    // @ts-ignore -- doing some weird shit here
    return fragment.split('\n').reduce((out, str, i) => (
      !!out[0] ? [
        ...out,
        <br key={i/2}/>,
        <React.Fragment key={i+1}>{str}</React.Fragment>
      ] : [
        ...out,
        <React.Fragment key={i+1.1}>{str}</React.Fragment>
      ]
    ), [])

  } else {
    return fragment
  }
}


const combineFragments = (fragments: Array<Fragment>, f: string): Array<Fragment> => {
  const fragment = parseFragment(f);

  if (!fragments.length) {
    return [fragment]
  }

  const lastFragment = last(fragments)

  if (typeof lastFragment === 'string' && typeof fragment === 'string') {
    return [...fragments.slice(0, -1), lastFragment + ' ' + fragment]

  } else if (typeof lastFragment === 'string') {
    return [...fragments.slice(0, -1), lastFragment + ' ', fragment]

  } else {
    return [...fragments, ' ', fragment]
  }
}

type Props = { content: string };

const parser = (content: string) => content
  .split(' ')
  .reduce(combineFragments, [])
  .map((f, i) => <React.Fragment key={i}>{f}</React.Fragment>)

export default function ParsedText({ content }: Props) {
  return (
    <>
      {parser(content)}
    </>
  )
}
