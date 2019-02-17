import * as React from 'react';
import { Connect, UrqlProps, query } from 'urql'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import match, { DataProps } from '../../utils/match'
import useResponsive from '../../utils/useResponsive'

import ParsedText from '../../components/ParsedText'
import AdContainer from '../AdContainer'


import { RouteProps } from 'react-router-dom'



const threadQuery = query(`{
  currentUser {
    id
  }
  threads: threadsList (orderBy: [LATEST_POST_TIME_DESC]) {
    id
    title
    latestPostTime
    postStats: posts {
      totalCount
    }
    posts: postsList (first: 1, orderBy: [CREATED_AT_DESC]) {
      author {
        username
      }
    }
  }
}`)

type Thread = {
  id: string,
  title: string,
  latestPostTime: string,
  posts: Array<{ author: { username: string } }>
  postStats: {
    totalCount: number
  }
}
type ThreadQuery = {
  currentUser?: { id: string }
  threads: Array<Thread>
}

const ThreadPost = ({ thread }: { thread: Thread }) => {
  const userName = thread.posts[0] && thread.posts[0].author.username
  const title = thread.title.length > 297
    ? thread.title.substring(0, 297) + '...'
    : thread.title
  return (
    <article key={thread.id} className={styles.threadPost}>
      <Link to={`/threads/${thread.id}`}>{title}</Link>
      <div className={styles.info}><strong>LAST POST:</strong> <time>[{thread.latestPostTime}]</time></div>
      <div className={styles.info}><strong>by: </strong>
        <Link to={`/users/${userName}`}>{userName}</Link>
      </div>
      <div className={styles.info}><strong>POSTS:</strong> {thread.postStats.totalCount}</div>
    </article>
  )
}

const Forum: React.SFC<{}> = () => {
  const { isMobile, isDesktop } = useResponsive(540)
  const showAd = (i: number) => isMobile && !((i + 1) % 6)


  return (
    <section className={styles.forum}>
      <section className={styles.left}>
        <Connect query={threadQuery}>
          {match<ThreadQuery>({
            error: ({ error }) => <div>Something went wrong: {JSON.stringify(error)}</div>,

            loading: () => <div>loading...</div>,

            data: ({ data }) => (
              <>
                <div className={styles.header}>
                  <h1>Forum</h1>
                  <Link to={data.currentUser ? `/threads/new` : `/signup`}>
                    Start A Thread!
                  </Link>
                </div>
                {data.threads.map((thread, i) =>
                  <React.Fragment key={thread.id}>
                    {showAd(i) && <div className={styles.adContainer}><AdContainer n={1} /></div>}
                    <ThreadPost thread={thread} />
                  </React.Fragment>
                )}
              </>
            )
          })}
        </Connect>
      </section>
      {isDesktop && <AdContainer />}
    </section>

  )
}

export default Forum
