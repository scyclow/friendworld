import * as React from 'react'
import { replace } from 'lodash'
import { Link } from 'react-router-dom'
import {
  isExternalLink,
  isImage,
  isHashtag,
  isUsername,
  isPostRef,
  isThreadRef,
  cleanFragment,
} from '../utils/parsers'

type Fragment = string | React.ReactNode;

const last = (arr: Array<Fragment>): Fragment => arr[arr.length - 1]


const parseFragment = (fragment: string): Fragment => {
  if (isImage(fragment)) {
    return <img src={fragment} style={{ maxWidth: '100%', maxHeight: 300 }}/>

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

export default ({ content }: Props) => (
  <>
    {parser(content)}
  </>
)
