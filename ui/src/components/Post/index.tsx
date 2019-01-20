import * as React from 'react';
import { Connect } from 'urql'
import ParsedText from '../ParsedText'


import styles from './styles.module.scss';




export type PostType = {
  id: string,
  createdAt: string,
  content: string,
  author: {
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
    {!!post.thread && (
      <div className={styles.header}>
        {post.thread.title}
      </div>
    )}
    <div className={styles.main}>
      <div className={styles.panel}>
        <div className={styles.avatar} />
        {post.author.username}
      </div>
      <p className={styles.content}>
        <ParsedText content={post.content} />
      </p>
    </div>
    <div className={styles.postedAt}>Posted at: {post.createdAt}</div>
  </div>
)

export default Post
