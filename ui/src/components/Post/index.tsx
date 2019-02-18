import * as React from 'react';
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
  <article className={styles.post}>
    <div className={styles.main}>
      {!!post.author &&
        <Link to={`/users/${post.author.username}`} className={styles.panel}>
          <aside className={styles.panelContainer}>
            <div className={styles.avatar} style={{ backgroundImage: `url(${post.author.avatarUrl})` }} />
            <div className={styles.userInfo}>
              <div className={styles.username}>{post.author.username}</div>
              {post.author.postStats &&
                <div className={styles.totalPosts}><strong>Posts:</strong> {post.author.postStats.totalCount}</div>
              }
            </div>
          </aside>
        </Link>
      }


      <p className={styles.content}>
        <ParsedText content={post.content} />
      </p>

    </div>
    <div className={styles.footer}>
      <div className={styles.postedAt}>
        <time>Posted at: {new Date(post.createdAt).toISOString()}</time>
        <span><Link to={`/posts/${post.id}`}>Post #{post.id}</Link></span>
      </div>
      {!!post.thread && (
        <div className={styles.threadLink}>
          In thread: <Link to={`/threads/${post.thread.id}`}>{post.thread.title}</Link>
        </div>
      )}
    </div>
  </article>
)

export default Post
