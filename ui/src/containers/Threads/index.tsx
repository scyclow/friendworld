import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import find from 'lodash/find'
import flatMap from 'lodash/flatMap'
import styles from './styles.module.scss'
import AdContainer, { useAds } from '../AdContainer'
import Post from 'components/Post'
import useResponsive from 'utils/useResponsive'
import profanityFilter from 'utils/profanityFilter'

import threadData from 'data/threads.json'
import postData from 'data/posts.json'

const AddPost = () => {
  return (
    <Link to="/signup">
      <h2 className={styles.signup}>Create An Account To Join The Conversation!</h2>
    </Link>
  )
}

const stickiedThreads = [1]
const Threads: React.SFC<{ id: number }> = ({ id }) => {
  const { isMobile, isDesktop } = useResponsive(820)
  const thread = find(threadData, { id })
  const posts = postData.filter(post => post.thread.id === id && !post.hidden)

  const tags = (
    !stickiedThreads.includes(id) && thread
      ? flatMap(posts, p => JSON.parse(p.tags))
      : []
  )
  const { ads, fetchingAds } = useAds(4, { tags })

  const showMobileAd = (i: number) => {
    if (!isMobile) return false
    if ((i + 1) % 4) return false

    const adIx = (((i + 1) / 4) - 1) % ads.length

    return (
      <div className={styles.ad}>
        <AdContainer ads={[ads[adIx]]} fetching={fetchingAds} />
      </div>
    )
  }

  return (
    <section>
      <div className={styles.back}>
        <Link to="/">{'< Back to forum'}</Link>
      </div>

      <div className={styles.threadContainer}>
        <div className={styles.left}>
          {thread ? (
              <div className={styles.container}>
                <header className={styles.threadTitle}>
                  <h2 >{profanityFilter(thread.title)}</h2>
                </header>
                <div>
                  <Link to={`/threads/${thread.id}`}>
                    <div className={styles.threadLink}>
                      /threads/{thread.id}
                    </div>
                  </Link>
                  <>
                    {posts.map((post, i) =>
                      <Fragment key={post.id}>
                        {showMobileAd(i)}
                        <Post post={post} />
                      </Fragment>
                    )}
                  </>
                  <AddPost />
                </div>
              </div>
            ) : 'This thread does not exist!'
          }
        </div>

        {isDesktop && (
          <div className={styles.adContainer}>
            <AdContainer ads={ads} fetching={fetchingAds} />
          </div>
        )}
      </div>
    </section>
  )
}

export default Threads

