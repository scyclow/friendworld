import * as React from 'react';
import { Connect, UrqlProps, query } from 'urql'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import match from '../../utils/match'
import Post from '../../components/Post'

import { RouteChildrenProps } from 'react-router'



const threadQuery = `
query threadById ($id: Int!){
  thread: threadById (id: $id) {
    id
    title
    posts: postsList {
      id
      content
      createdAt
      author {
        id
        username
        avatarUrl
      }
    }
  }
}`

type Post = {
  id: string
  createdAt: string
  content: string
  author: {
    id: string
    username: string
    avatarUrl?: string
  }
}

type ThreadQuery = {
  thread: {
    id: string
    title: string
    posts: Array<Post>
  }
}

// const ThreadPost = ({ thread }: { thread: Thread }) => (
  // <div key={thread.id} className={styles.threadPost}>
  //   <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
  //   <div className={styles.timestamp}><strong>LAST POST:</strong> [{thread.latestPostTime}]</div>
  // </div>
// )

const Threads: React.SFC<{ id: number }> = ({ id }) => {

  return (
    <div>
      <div className={styles.back}>
        <Link to="/forum">{'< Back to forum'}</Link>
      </div>

      <div className={styles.left}>
        <Connect query={query(threadQuery, { id })}>
          {match<ThreadQuery>({
            error: ({ error }) => <div>Something went wrong: {JSON.stringify(error)}</div>,

            loading: () => <div>loading...</div>,

            data: ({ data: { thread } }) => (
              <div className={styles.container}>
                <h2 className={styles.threadTitle}>{thread.title}</h2>
                <div>
                  {thread.posts.map(post =>
                    <React.Fragment key={post.id}>
                      <Post post={post} />
                    </React.Fragment>
                  )}
                </div>
              </div>
            )
          })}
        </Connect>
      </div>
    </div>

  )
}

export default Threads


// const Thread: React.SFC<Props> = ({ id }) => <div>this is thread: {id}</div>

