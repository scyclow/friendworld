import * as React from 'react';
import { useQuery } from 'urql'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import useResponsive from '../../utils/useResponsive'
import profanityFilter from '../../utils/profanityFilter'

import DisplayError from '../../components/DisplayError'
import Loading from '../../components/Loading'
import AdContainer from '../AdContainer'


const threadQuery = `{
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
}`

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
  threads: Array<Thread>
  currentUser: null | {
    id: string
  }
}

const ThreadPost = ({ thread }: { thread: Thread }) => {
  const userName = thread.posts[0] && thread.posts[0].author.username
  const title = profanityFilter(
    thread.title.length > 297
      ? thread.title.substring(0, 297) + '...'
      : thread.title
  )

  return (
    <article key={thread.id} className={styles.threadPost}>
      <Link className={styles.postLink} to={`/threads/${thread.id}`}>{title}</Link>
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
  const [{ fetching, error, data }] = useQuery<ThreadQuery>({ query: threadQuery })
  const showAd = (i: number) => isMobile && !((i + 1) % 6)

  return (
    <section className={styles.forum}>
      <section className={styles.left}>
        {fetching && <Loading />}
        {error && <DisplayError error={error} />}
        {data && (
          <>
            {data.currentUser &&
              <div className={styles.quickLinks}>
                <strong>quick links:</strong>{' '}
                <Link to="/messages">Messages</Link>{', '}
                <Link to="/profile">Update Profile</Link>{', '}
                <Link to="/stats">Stats</Link>
              </div>
            }
            <header className={styles.header}>
              <h1>Forum</h1>
              <Link to="/threads/new" className={styles.startThread}>
                Start A Thread!
              </Link>
            </header>
            {data.threads.map((thread, i) =>
              <React.Fragment key={thread.id}>
                {showAd(i) && <div className={styles.adContainer}><AdContainer n={1} /></div>}
                <ThreadPost thread={thread} />
              </React.Fragment>
            )}
          </>
        )}
      </section>
      {isDesktop && <AdContainer n={3}/>}
    </section>

  )
}

export default Forum
