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
    postStats?: {
      totalCount: number
    }
  } | null,
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
        <Link to={`/users/${post.author.username}`} className={styles.panel}>
          <div className={styles.panelContainer}>
            <div className={styles.avatar} style={{ backgroundImage: `url(${post.author.avatarUrl})` }} />
            <div className={styles.userInfo}>
              <div className={styles.username}>{post.author.username}</div>
              {post.author.postStats &&
                <div className={styles.totalPosts}><strong>Posts:</strong> {post.author.postStats.totalCount}</div>
              }
            </div>
          </div>
        </Link>
      }


      <p className={styles.content}>
        <ParsedText content={post.content} />
      </p>

    </div>
    <div className={styles.footer}>
      <div className={styles.postedAt}>
        <span>Posted at: {new Date(post.createdAt).toISOString()}</span>
        <span><Link to={`/posts/${post.id}`}>Post #{post.id}</Link></span>
      </div>
      {!!post.thread && (
        <div className={styles.threadLink}>
          In thread: <Link to={`/threads/${post.thread.id}`}>{post.thread.title}</Link>
        </div>
      )}
    </div>
  </div>
)

export default Post
