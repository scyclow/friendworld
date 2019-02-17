import * as React from 'react';
import { Connect, UrqlProps, query, mutation } from 'urql'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import match from '../../utils/match'
import Post, { PostType } from '../../components/Post'


import { RouteChildrenProps } from 'react-router'

type PostQuery = {
  post?: PostType
}

const postQuery = `
query postById ($id: Int!){
  post: postById (id: $id) {
    id
    createdAt
    content
    author {
      id
      username
      avatarUrl
      postStats: authoredPosts {
        totalCount
      }
    }
    thread {
      id
      title
    }
  }
}`


const Posts: React.SFC<{ id: number }> = ({ id }) => {
  return (
    <section>
      <div className={styles.back}>
        <Link to="/">{'< Back to forum'}</Link>
      </div>

      <div className={styles.left}>
        <Connect query={query(postQuery, { id })}>
          {match<PostQuery>({
            error: ({ error }) => <div>Something went wrong: {JSON.stringify(error)}</div>,

            loading: () => <div>loading...</div>,

            data: ({ data: { post } }) => post ? (

                <Post post={post}/>

            ) : 'This post does not exist!'
          })}
        </Connect>
      </div>
    </section>

  )
}

export default Posts

