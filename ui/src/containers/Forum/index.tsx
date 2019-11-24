import * as React from 'react';
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import useResponsive from 'utils/useResponsive'
import profanityFilter from 'utils/profanityFilter'
import partition from 'lodash/partition'

import AdContainer, { useAds } from '../AdContainer'

import threadData from 'data/threads.json'


type Thread = {
  id: number,
  title: string,
  hidden: boolean
  latestPostTime: string,
  posts: Array<{ author: { username: string } }>
  postStats: {
    totalCount: number
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

const stickiedThreads = [1]

const Forum: React.SFC<{}> = () => {
  const { isMobile, isDesktop } = useResponsive(540)

  const { ads, fetchingAds } = useAds(13)
  const showMobileAd = (i: number) => {
    const adFreq = 4
    if (!isMobile) return false
    if ((i + 1) % adFreq) return false

    const adIx = (((i + 1) / adFreq) - 1) % ads.length

    return (
      <div className={styles.adContainer}>
        <AdContainer ads={[ads[adIx]]} fetching={fetchingAds} />
      </div>
    )
  }

  const partitioned = partition(threadData, thread => stickiedThreads.includes(thread.id))



  return (
    <section className={styles.forum}>
      <section className={styles.left}>
        {/*data.currentUser &&
          <div className={styles.quickLinks}>
            <strong>quick links:</strong>{' '}
            <Link to="/messages">Messages</Link>{', '}
            <Link to="/profile">Update Profile</Link>{', '}
            <Link to="/stats">Stats</Link>
          </div>
        */}
        <div className={styles.quickLinks}>
          <Link to="/stats">Stats</Link>
          <Link to="/threads/new" className={styles.startThread}>
            Start A Thread!
          </Link>
        </div>
        <header className={styles.header}>
          <h1>Forum</h1>
        </header>
        <div style={{ border: '1px dashed', padding: '3px', paddingBottom: 0, marginBottom: '10px'}}>
          <ThreadPost thread={partitioned[0][0]} />
        </div>
        {partitioned[1].length && partitioned[1].map((thread, i) =>
          <React.Fragment key={thread.id}>
            {showMobileAd(i)}
            {!thread.hidden &&
              <ThreadPost thread={thread} />
            }
          </React.Fragment>
        )}
      </section>
      {isDesktop && <AdContainer ads={ads} fetching={fetchingAds}/>}
    </section>

  )
}

export default Forum
