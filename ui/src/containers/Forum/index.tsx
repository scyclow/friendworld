import * as React from 'react';
import { Connect, UrqlProps, query } from 'urql'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import match, { DataProps } from '../../utils/match'

import { RouteProps } from 'react-router-dom'



const threadQuery = query(`{
  threads: threadsList (orderBy: [LATEST_POST_TIME_DESC]) {
    id
    title
    latestPostTime
    posts: postsList (first: 1) {
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
}
type ThreadQuery = {
  threads: Array<Thread>
}

const ThreadPost = ({ thread }: { thread: Thread }) => (
  <div key={thread.id} className={styles.threadPost}>
    <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
    <div className={styles.timestamp}><strong>LAST POST:</strong> [{thread.latestPostTime}]</div>
  </div>
)

const Forum: React.SFC<{}> = () => {

  return (
    <Connect query={threadQuery}>
      {match<ThreadQuery>({
        error: ({ error }) => <div>Something went wrong: {JSON.stringify(error)}</div>,

        loading: () => <div>loading...</div>,

        data: ({ data }) => (
          <div className={styles.container}>
            <div className={styles.header}>
              <h2>Forum</h2>
              <Link to={`/threads/newThread`}>Start A Thread!</Link>
            </div>
            {data.threads.map(thread =>
              <ThreadPost thread={thread} />
            )}
          </div>
        )
      })}
    </Connect>

  )
}

export default Forum
