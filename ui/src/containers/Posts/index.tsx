import * as React from 'react';
import find from 'lodash/find'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import Post from 'components/Post'

import postData from 'data/posts.json'


const Posts: React.SFC<{ id: number }> = ({ id }) => {
  const post = find(postData, { id })
  return (
    <section>
      <div className={styles.back}>
        <Link to="/">{'< Back to forum'}</Link>
      </div>

      <div className={styles.left}>
        {post
          ? <Post post={post}/>
          : 'This post does not exist!'
        }
      </div>
    </section>

  )
}

export default Posts
