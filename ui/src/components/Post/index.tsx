import * as React from 'react';
import { Connect } from 'urql'
import { Link } from 'react-router-dom'

import ParsedText from '../ParsedText'
import styles from './styles.module.scss';


export type PostType = {
  id: string,
  createdAt: string,
  content: string,
  author?: {
    id: string,
    username: string
    avatarUrl?: string
  },
  thread?: {
    id: string,
    title: string
  }
}

type Props = {
  post: PostType
}

const Post: React.SFC<Props> = ({ post }) => (
  <div className={styles.container}>
    <div className={styles.main}>
      {!!post.author &&
        <div className={styles.panel}>
          <Link to={`/users/${post.author.username}`}>
            <div className={styles.avatar} style={{ backgroundImage: `url(${post.author.avatarUrl})` }} />
            <span className={styles.username}>{post.author.username}</span>
          </Link>
        </div>
      }
      <div className={styles.content}>
        <p>
          <ParsedText content={post.content} />
        </p>
      </div>
    </div>
    <div className={styles.postedAt}>
      <div>Posted at: {post.createdAt}</div>
      {!!post.thread && (
        <div className={styles.threadLink}>
          In thread: <Link to={`/threads/${post.thread.id}`}>{post.thread.title}</Link>
        </div>
      )}
    </div>
  </div>
)

export default Post
