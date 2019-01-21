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
    return <Link to={`/users/${userId}`}>{fragment}</Link>

  } else if (isHashtag(fragment)) {
    const hashtag = cleanFragment(fragment, /^#/)
    return <Link to={`/hashtag/${hashtag}`}>{fragment}</Link>

  } else if (isPostRef(fragment)) {
    const postId = cleanFragment(fragment, /^\/posts\//)
    return <Link to={`/posts/${postId}`}>{fragment}</Link>

  } else if (isThreadRef(fragment)) {
    const threadId = cleanFragment(fragment, /^\/threads\//)
    return <Link to={`/threads/${threadId}`}>{fragment}</Link>

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
